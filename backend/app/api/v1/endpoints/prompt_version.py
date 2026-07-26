from fastapi import APIRouter, HTTPException

from app.services.prompt_version_service import PromptVersionService

router = APIRouter(
    prefix="/prompt-versions",
    tags=["Prompt Versions"],
)


@router.get("/{prompt_id}")
async def get_versions(prompt_id: str):
    return await PromptVersionService.get_versions(prompt_id)


@router.get("/{prompt_id}/{version}")
async def get_version(prompt_id: str, version: int):
    result = await PromptVersionService.get_version(
        prompt_id,
        version,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Version not found",
        )

    return result