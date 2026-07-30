from datetime import datetime

from bson import ObjectId

from app.models.prompt_evaluation import PromptEvaluation
from app.repositories.prompt_evaluation_repository import (
    PromptEvaluationRepository,
)
from app.repositories.prompt_repository import PromptRepository
from app.services.ai_analysis_service import AIAnalysisService
from app.utils.mongo import serialize_mongo


class PromptEvaluationService:

    @staticmethod
    async def create_evaluation(
        prompt_id: str,
        current_user,
    ):
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            raise ValueError("Prompt not found")

        analysis = await AIAnalysisService.analyze_prompt(
            prompt["content"]
        )

        evaluation = PromptEvaluation(
            prompt_id=prompt_id,
            project_id=str(prompt["project_id"]),
            owner_id=str(current_user["_id"]),
            quality_score=analysis.quality_score,
            clarity_score=analysis.clarity_score,
            readability_score=analysis.readability_score,
            estimated_tokens=analysis.estimated_tokens,
            estimated_cost=analysis.estimated_cost,
            strengths=analysis.strengths,
            weaknesses=analysis.weaknesses,
            improved_prompt=analysis.improved_prompt,
            created_at=datetime.utcnow(),
        )

        evaluation_data = {
            "prompt_id": ObjectId(prompt_id),
            "project_id": ObjectId(prompt["project_id"]),
            "owner_id": current_user["_id"],
            "quality_score": analysis.quality_score,
            "clarity_score": analysis.clarity_score,
            "readability_score": analysis.readability_score,
            "estimated_tokens": analysis.estimated_tokens,
            "estimated_cost": analysis.estimated_cost,
            "strengths": analysis.strengths,
            "weaknesses": analysis.weaknesses,
            "improved_prompt": analysis.improved_prompt,
            "created_at": evaluation.created_at,
        }

        evaluation_id = await PromptEvaluationRepository.create_evaluation(
            evaluation_data
        )

        return evaluation_id

    @staticmethod
    async def get_evaluations(prompt_id: str):
        evaluations = await PromptEvaluationRepository.get_evaluations(
            prompt_id
        )
        return serialize_mongo(evaluations)

    @staticmethod
    async def get_evaluation(evaluation_id: str):
        evaluation = await PromptEvaluationRepository.get_evaluation_by_id(
            evaluation_id
        )

        if not evaluation:
            return None

        return serialize_mongo(evaluation)

    @staticmethod
    async def delete_evaluation(evaluation_id: str):
        await PromptEvaluationRepository.delete_evaluation(
            evaluation_id
        )

    @staticmethod
    async def delete_evaluations(prompt_id: str):
        await PromptEvaluationRepository.delete_evaluations(
            prompt_id
        )