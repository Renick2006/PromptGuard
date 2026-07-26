from app.repositories.prompt_version_repository import PromptVersionRepository
from app.utils.mongo import serialize_mongo


class PromptVersionService:

    @staticmethod
    async def create_version(prompt: dict):
        version_data = {
            "prompt_id": prompt["_id"],
            "project_id": prompt["project_id"],
            "owner_id": prompt["owner_id"],
            "version": prompt["version"],
            "title": prompt["title"],
            "content": prompt["content"],
            "description": prompt.get("description"),
            "created_at": prompt["created_at"],
        }

        return await PromptVersionRepository.create_version(version_data)

    @staticmethod
    async def get_versions(prompt_id: str):
        versions = await PromptVersionRepository.get_versions(prompt_id)
        return serialize_mongo(versions)

    @staticmethod
    async def get_version(prompt_id: str, version: int):
        version_data = await PromptVersionRepository.get_version(
            prompt_id,
            version,
        )

        if not version_data:
            return None

        return serialize_mongo(version_data)

    @staticmethod
    async def delete_versions(prompt_id: str):
        await PromptVersionRepository.delete_versions(prompt_id)