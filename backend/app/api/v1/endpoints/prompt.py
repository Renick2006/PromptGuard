from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user
from app.schemas.prompt import (
    PromptCreate,
    PromptUpdate,
)
from app.services.prompt_service import PromptService
from app.services.project_service import ProjectService
from app.utils.mongo import serialize_mongo

router = APIRouter(
    prefix="/prompts",
    tags=["Prompts"],
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_prompt(
    prompt: PromptCreate,
    current_user=Depends(get_current_user),
):
    project = await ProjectService.get_project(prompt.project_id)

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    if str(project["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )

    prompt_id = await PromptService.create_prompt(
        prompt,
        current_user,
    )

    return {
        "message": "Prompt created successfully.",
        "prompt_id": prompt_id,
    }


@router.get("/project/{project_id}")
async def get_prompts(
    project_id: str,
    current_user=Depends(get_current_user),
):
    project = await ProjectService.get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    if str(project["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )

    prompts = await PromptService.get_prompts(project_id)

    return serialize_mongo(prompts)


@router.get("/{prompt_id}")
async def get_prompt(
    prompt_id: str,
    current_user=Depends(get_current_user),
):
    prompt = await PromptService.get_prompt(prompt_id)

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found.",
        )

    if str(prompt["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )

    return serialize_mongo(prompt)


@router.patch("/{prompt_id}")
async def update_prompt(
    prompt_id: str,
    update_data: PromptUpdate,
    current_user=Depends(get_current_user),
):
    prompt = await PromptService.get_prompt(prompt_id)

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found.",
        )

    if str(prompt["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )

    await PromptService.update_prompt(
        prompt_id,
        update_data,
    )

    return {
        "message": "Prompt updated successfully."
    }


@router.delete("/{prompt_id}")
async def delete_prompt(
    prompt_id: str,
    current_user=Depends(get_current_user),
):
    prompt = await PromptService.get_prompt(prompt_id)

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prompt not found.",
        )

    if str(prompt["owner_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )

    await PromptService.delete_prompt(prompt_id)

    return {
        "message": "Prompt deleted successfully."
    }