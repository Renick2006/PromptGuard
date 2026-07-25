from bson import ObjectId

from app.db.collections import projects_collection


class ProjectRepository:

    @staticmethod
    async def create_project(project: dict):
        result = await projects_collection().insert_one(project)
        return str(result.inserted_id)

    @staticmethod
    async def get_projects_by_owner(owner_id: str):
        return await projects_collection().find(
            {"owner_id": owner_id}
        ).to_list(length=None)

    @staticmethod
    async def get_project_by_id(project_id: str):
        return await projects_collection().find_one(
            {"_id": ObjectId(project_id)}
        )

    @staticmethod
    async def update_project(project_id: str, update_data: dict):
        await projects_collection().update_one(
            {"_id": ObjectId(project_id)},
            {"$set": update_data},
        )

    @staticmethod
    async def delete_project(project_id: str):
        await projects_collection().delete_one(
            {"_id": ObjectId(project_id)}
        )