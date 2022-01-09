from flask import Blueprint
from .models import Result, Cursor
import json
from service import get_current_page_data
import requests
from mongoengine.queryset.visitor import Q

api_bp = Blueprint('api', __name__)

# manual serializations look kind of ugly but apparently flask as a micro-framework doesn't offer anything fancier out of the box 

# gets all cursors
@api_bp.route("/api/cursors", methods=["GET"])
def get_all_cursors():
    cursors = [c.cursor for c in Cursor.objects]
    return json.dumps(cursors)


# gets all unique playernames
@api_bp.route("/api/playernames", methods=["GET"])
def get_playernames():
    unique_names = [name for name  in Result.objects().distinct(field = "playerA.name")] #assuming every palyer appears atleast once as playerA 
    return json.dumps(unique_names)


# gets all games played by the player (feels illegal to treat the name as an id) 
@api_bp.route("/api/players/<name>", methods=["GET"])
def get_player_games(name):
    name = name.replace("_", " ").title()
    query_result = Result.objects(Q(playerA__name = name) | Q(playerB__name = name))

    def parse(result):
        val = json.loads(result.to_json())
        del val["_id"]
        return val
        
    player_results = [parse(x) for x in query_result]
    player_results_first_page = get_current_page_data(name)

    return json.dumps(player_results + player_results_first_page)


# stores all the data from the bad-api (starting from second page) to db, stops when encountering cursor associated with the page which data is already in the db
@api_bp.route("/api/syncdb", methods=["GET"])
def sync_db_with_bad_api():
    base_url = "https://bad-api-assignment.reaktor.com"

    current_cursor = requests.get(base_url + "/rps/history").json()["cursor"]
    cursors_in_db = [c.cursor for c in Cursor.objects]

    while current_cursor not in cursors_in_db: 
        json_res = requests.get(base_url + current_cursor).json()
        results = json_res["data"]

        results_instances = [Result(**result) for result in results]

        try:
            Result.objects.insert(results_instances, load_bulk=False)
            Cursor(cursor = current_cursor).save()
            print(f"Saved data successfully from page ${current_cursor}")
            current_cursor = json_res["cursor"]
        except Exception as e:
            print(e)
            break

    return {"message": "Sync successful"}

