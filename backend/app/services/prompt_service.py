from bson import ObjectId
from datetime import datetime

from app.repositories.prompt_repository import PromptRepository
from app.services.prompt_version_service import PromptVersionService


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
        # Fetch the current prompt
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            raise ValueError("Prompt not found")

        # Save the current prompt as a version
        await PromptVersionService.create_version(prompt)

        # Prepare updated fields
        data = update_data.model_dump(exclude_unset=True)

        # Increment version
        data["version"] = prompt["version"] + 1

        # Update timestamp
        data["updated_at"] = datetime.utcnow()

        # Update the live prompt
        await PromptRepository.update_prompt(
            prompt_id,
            data,
        )

    @staticmethod
    async def delete_prompt(prompt_id: str):
        await PromptRepository.delete_prompt(prompt_id)