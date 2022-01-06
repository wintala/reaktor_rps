import requests

base_url = "https://bad-api-assignment.reaktor.com"


def get_current_page_data(name):
    data = requests.get(base_url + "/rps/history").json()["data"]
    return [result for result in data if result["playerA"]["name"] == name or result["playerB"]["name"] == name]