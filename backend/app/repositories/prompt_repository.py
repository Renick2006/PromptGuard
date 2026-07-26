from bson import ObjectId

from app.db.collections import prompts_collection


class PromptRepository:

    @staticmethod
    async def create_prompt(prompt: dict):
        result = await prompts_collection().insert_one(prompt)
        return str(result.inserted_id)

    @staticmethod
    async def get_prompts_by_project(project_id: str):
        return await prompts_collection().find(
            {"project_id": ObjectId(project_id)}
        ).to_list(length=None)

    @staticmethod
    async def get_prompt_by_id(prompt_id: str):
        return await prompts_collection().find_one(
            {"_id": ObjectId(prompt_id)}
        )

    @staticmethod
    async def update_prompt(prompt_id: str, update_data: dict):
        await prompts_collection().update_one(
            {"_id": ObjectId(prompt_id)},
            {"$set": update_data},
        )

    @staticmethod
    async def delete_prompt(prompt_id: str):
        await prompts_collection().delete_one(
            {"_id": ObjectId(prompt_id)}
        )