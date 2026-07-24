from app.db.mongodb import mongodb


def users_collection():
    return mongodb.database["users"]