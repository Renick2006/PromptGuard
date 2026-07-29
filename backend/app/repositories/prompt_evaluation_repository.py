from bson import ObjectId

from app.db.collections import prompt_evaluations_collection


class PromptEvaluationRepository:

    @staticmethod
    async def create_evaluation(evaluation_data: dict):
        result = await prompt_evaluations_collection().insert_one(
            evaluation_data
        )
        return str(result.inserted_id)

    @staticmethod
    async def get_evaluations(prompt_id: str):
        return (
            await prompt_evaluations_collection()
            .find({"prompt_id": ObjectId(prompt_id)})
            .sort("created_at", -1)
            .to_list(length=None)
        )

    @staticmethod
    async def get_evaluation_by_id(evaluation_id: str):
        return await prompt_evaluations_collection().find_one(
            {"_id": ObjectId(evaluation_id)}
        )

    @staticmethod
    async def delete_evaluation(evaluation_id: str):
        await prompt_evaluations_collection().delete_one(
            {"_id": ObjectId(evaluation_id)}
        )

    @staticmethod
    async def delete_evaluations(prompt_id: str):
        await prompt_evaluations_collection().delete_many(
            {"prompt_id": ObjectId(prompt_id)}
        )