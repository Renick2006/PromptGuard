from app.db.mongodb import mongodb


def users_collection():
    return mongodb.db["users"]


def projects_collection():
    return mongodb.db["projects"]


def prompts_collection():
    return mongodb.db["prompts"]