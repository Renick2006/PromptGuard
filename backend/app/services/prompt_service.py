from bson import ObjectId
from datetime import datetime

from app.repositories.prompt_repository import PromptRepository


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
        return await PromptRepository.get_prompts_by_project(project_id)

    @staticmethod
    async def get_prompt(prompt_id: str):
        return await PromptRepository.get_prompt_by_id(prompt_id)

    @staticmethod
    async def update_prompt(
        prompt_id: str,
        update_data,
    ):
        data = update_data.model_dump(exclude_unset=True)

        await PromptRepository.update_prompt(
            prompt_id,
            data,
        )

    @staticmethod
    async def delete_prompt(prompt_id: str):
        await PromptRepository.delete_prompt(prompt_id)