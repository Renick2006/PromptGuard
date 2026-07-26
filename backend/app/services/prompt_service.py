from bson import ObjectId
from datetime import datetime

from app.repositories.prompt_repository import PromptRepository
from app.services.prompt_version_service import PromptVersionService
from app.utils.mongo import serialize_mongo


class PromptService:

    @staticmethod
    async def create_prompt(
        prompt,
        current_user,
    ):
        prompt_data = {
            "project_id": ObjectId(prompt.project_id),
            "owner_id": current_user["_id"],
            "title": prompt.title,
            "content": prompt.content,
            "description": prompt.description,
            "version": 1,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        return await PromptRepository.create_prompt(prompt_data)

    @staticmethod
    async def get_prompts(project_id: str):
        prompts = await PromptRepository.get_prompts_by_project(project_id)
        return serialize_mongo(prompts)

    @staticmethod
    async def get_prompt(prompt_id: str):
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            return None

        return serialize_mongo(prompt)

    @staticmethod
    async def update_prompt(
        prompt_id: str,
        update_data,
    ):
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            raise ValueError("Prompt not found")

        await PromptVersionService.create_version(prompt)

        data = update_data.model_dump(exclude_unset=True)

        data["version"] = prompt["version"] + 1
        data["updated_at"] = datetime.utcnow()

        await PromptRepository.update_prompt(
            prompt_id,
            data,
        )

    @staticmethod
    async def restore_version(
        prompt_id: str,
        version: int,
    ):
        current_prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not current_prompt:
            raise ValueError("Prompt not found")

        version_data = await PromptVersionService.get_version(
            prompt_id,
            version,
        )

        if not version_data:
            raise ValueError("Version not found")

        await PromptVersionService.create_version(current_prompt)

        update_data = {
            "title": version_data["title"],
            "content": version_data["content"],
            "description": version_data.get("description"),
            "version": current_prompt["version"] + 1,
            "updated_at": datetime.utcnow(),
        }

        await PromptRepository.update_prompt(
            prompt_id,
            update_data,
        )

    @staticmethod
    async def delete_prompt(prompt_id: str):
        # Delete all saved versions first
        await PromptVersionService.delete_versions(prompt_id)

        # Delete the prompt
        await PromptRepository.delete_prompt(prompt_id)