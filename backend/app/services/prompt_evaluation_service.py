from datetime import datetime
from bson import ObjectId

from app.models.prompt_evaluation import PromptEvaluation
from app.repositories.prompt_evaluation_repository import (
    PromptEvaluationRepository,
)
from app.repositories.prompt_repository import PromptRepository
from app.utils.mongo import serialize_mongo


class PromptEvaluationService:

    @staticmethod
    async def create_evaluation(
        prompt_id: str,
        evaluation_data,
        current_user,
    ):
        prompt = await PromptRepository.get_prompt_by_id(prompt_id)

        if not prompt:
            raise ValueError("Prompt not found")

        evaluation = PromptEvaluation(
            prompt_id=prompt_id,
            project_id=str(prompt["project_id"]),
            owner_id=str(current_user["_id"]),
            quality_score=evaluation_data.quality_score,
            clarity_score=evaluation_data.clarity_score,
            readability_score=evaluation_data.readability_score,
            estimated_tokens=evaluation_data.estimated_tokens,
            estimated_cost=evaluation_data.estimated_cost,
            created_at=datetime.utcnow(),
        )

        return await PromptEvaluationRepository.create_evaluation(
            {
                "prompt_id": ObjectId(prompt_id),
                "project_id": ObjectId(prompt["project_id"]),
                "owner_id": current_user["_id"],
                "quality_score": evaluation.quality_score,
                "clarity_score": evaluation.clarity_score,
                "readability_score": evaluation.readability_score,
                "estimated_tokens": evaluation.estimated_tokens,
                "estimated_cost": evaluation.estimated_cost,
                "created_at": evaluation.created_at,
            }
        )

    @staticmethod
    async def get_evaluations(prompt_id: str):
        evaluations = await PromptEvaluationRepository.get_evaluations(
            prompt_id
        )
        return serialize_mongo(evaluations)

    @staticmethod
    async def get_evaluation(evaluation_id: str):
        evaluation = (
            await PromptEvaluationRepository.get_evaluation_by_id(
                evaluation_id
            )
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