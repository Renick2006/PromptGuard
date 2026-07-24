from bson import ObjectId

from app.db.collections import users_collection


class UserRepository:

    @staticmethod
    async def create_user(user: dict):
        result = await users_collection().insert_one(user)
        return str(result.inserted_id)

    @staticmethod
    async def get_by_email(email: str):
        return await users_collection().find_one(
            {"email": email}
        )

    @staticmethod
    async def get_by_username(username: str):
        return await users_collection().find_one(
            {"username": username}
        )

    @staticmethod
    async def get_by_id(user_id: str):
        return await users_collection().find_one(
            {"_id": ObjectId(user_id)}
        )

    @staticmethod
    async def update_user(user_id: str, update_data: dict):
        await users_collection().update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data},
        )

    @staticmethod
    async def delete_user(user_id: str):
        await users_collection().delete_one(
            {"_id": ObjectId(user_id)}
        )