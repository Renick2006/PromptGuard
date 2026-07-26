from bson import ObjectId

from app.db.collections import prompt_versions_collection


class PromptVersionRepository:

    @staticmethod
    async def create_version(version_data: dict):
        result = await prompt_versions_collection().insert_one(version_data)
        return str(result.inserted_id)

    @staticmethod
    async def get_versions(prompt_id: str):
        versions = await prompt_versions_collection().find(
            {"prompt_id": ObjectId(prompt_id)}
        ).sort("version", 1).to_list(length=None)

        return versions

    @staticmethod
    async def get_version(prompt_id: str, version: int):
        return await prompt_versions_collection().find_one(
            {
                "prompt_id": ObjectId(prompt_id),
                "version": version
            }
        )