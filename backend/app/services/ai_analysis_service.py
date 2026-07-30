import json

from app.schemas.ai_analysis import AIAnalysisResponse
from app.services.groq_service import GroqService


class AIAnalysisService:
    @staticmethod
    async def analyze_prompt(prompt: str) -> AIAnalysisResponse:
        groq_service = GroqService()

        response = await groq_service.analyze_prompt(prompt)

        # Parse JSON returned by Groq
        data = json.loads(response)

        return AIAnalysisResponse(**data)