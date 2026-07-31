from app.repositories.prompt_repository import PromptRepository
from app.services.groq_service import GroqService


class PlaygroundService:
    @staticmethod
    async def generate_response(
        prompt_id: str,
        user_input: str,
    ):
        # Fetch the saved prompt
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            raise ValueError("Prompt not found")

        # Reuse the existing GroqService
        groq = GroqService()

        response = await groq.generate_response(
            prompt=prompt["content"],
            user_input=user_input,
        )

        return {
            "response": response
        }