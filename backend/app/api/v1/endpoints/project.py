from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)
from app.services.project_service import ProjectService

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    current_user=Depends(get_current_user),
):
    project_id = await ProjectService.create_project(
        project,
        current_user,
    )

    return {
        "message": "Project created successfully.",
        "project_id": project_id,
    }


@router.get("/")
async def get_projects(
    current_user=Depends(get_current_user),
):
    projects = await ProjectService.get_projects(current_user)

    for project in projects:
        project["id"] = str(project["_id"])
        del project["_id"]

    return projects


@router.get("/{project_id}")
async def get_project(
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

    project["id"] = str(project["_id"])
    del project["_id"]

    return project


@router.patch("/{project_id}")
async def update_project(
    project_id: str,
    update_data: ProjectUpdate,
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

    await ProjectService.update_project(
        project_id,
        update_data,
    )

    return {
        "message": "Project updated successfully."
    }


@router.delete("/{project_id}")
async def delete_project(
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

    await ProjectService.delete_project(project_id)

    return {
        "message": "Project deleted successfully."
    }