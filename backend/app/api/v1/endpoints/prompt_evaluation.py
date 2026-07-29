from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user
from app.schemas.prompt_evaluation import PromptEvaluationCreate
from app.services.prompt_evaluation_service import PromptEvaluationService
from app.services.prompt_service import PromptService

router = APIRouter(
    prefix="/prompt-evaluations",
    tags=["Prompt Evaluations"],
)


@router.post(
    "/{prompt_id}",
    status_code=status.HTTP_201_CREATED,
)
async def create_evaluation(
    prompt_id: str,
    evaluation: PromptEvaluationCreate,
    current_user=Depends(get_current_user),
):
    prompt = await PromptService.get_prompt(prompt_id)

    if not prompt:
        raise HTTPException(
            status_code=404,
            detail="Prompt not found.",
        )

    if str(prompt["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=403,
            detail="You do not own this prompt.",
        )

    evaluation_id = await PromptEvaluationService.create_evaluation(
        prompt_id,
        evaluation,
        current_user,
    )

    return {
        "message": "Evaluation created successfully.",
        "evaluation_id": evaluation_id,
    }


@router.get("/{prompt_id}")
async def get_evaluations(
    prompt_id: str,
    current_user=Depends(get_current_user),
):
    prompt = await PromptService.get_prompt(prompt_id)

    if not prompt:
        raise HTTPException(
            status_code=404,
            detail="Prompt not found.",
        )

    if str(prompt["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=403,
            detail="You do not own this prompt.",
        )

    return await PromptEvaluationService.get_evaluations(
        prompt_id
    )


@router.get("/evaluation/{evaluation_id}")
async def get_evaluation(
    evaluation_id: str,
    current_user=Depends(get_current_user),
):
    evaluation = await PromptEvaluationService.get_evaluation(
        evaluation_id
    )

    if not evaluation:
        raise HTTPException(
            status_code=404,
            detail="Evaluation not found.",
        )

    if str(evaluation["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=403,
            detail="You do not own this evaluation.",
        )

    return evaluation


@router.delete("/evaluation/{evaluation_id}")
async def delete_evaluation(
    evaluation_id: str,
    current_user=Depends(get_current_user),
):
    evaluation = await PromptEvaluationService.get_evaluation(
        evaluation_id
    )

    if not evaluation:
        raise HTTPException(
            status_code=404,
            detail="Evaluation not found.",
        )

    if str(evaluation["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=403,
            detail="You do not own this evaluation.",
        )

    await PromptEvaluationService.delete_evaluation(
        evaluation_id
    )

    return {
        "message": "Evaluation deleted successfully."
    }