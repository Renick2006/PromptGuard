from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.services.prompt_service import PromptService
from app.services.prompt_version_service import PromptVersionService

router = APIRouter(
    prefix="/prompt-versions",
    tags=["Prompt Versions"],
)


@router.get("/{prompt_id}")
async def get_versions(
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

    return await PromptVersionService.get_versions(prompt_id)


@router.get("/{prompt_id}/{version}")
async def get_version(
    prompt_id: str,
    version: int,
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

    result = await PromptVersionService.get_version(
        prompt_id,
        version,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Version not found.",
        )

    return result