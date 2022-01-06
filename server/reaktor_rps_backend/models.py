from . import db

class Cursor(db.Document):
    cursor = db.StringField()

class PlayerResult(db.EmbeddedDocument):
    name = db.StringField()
    played = db.StringField()

class Result(db.Document):
    type = db.StringField()
    gameId = db.StringField()
    t = db.IntField()
    playerA = db.EmbeddedDocumentField(PlayerResult)
    playerB = db.EmbeddedDocumentField(PlayerResult)