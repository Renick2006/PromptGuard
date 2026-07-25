from datetime import datetime

from app.models.project import Project
from app.repositories.project_repository import ProjectRepository


class ProjectService:

    @staticmethod
    async def create_project(project_data, current_user):
        now = datetime.utcnow()

        project = Project(
            owner_id=str(current_user["_id"]),
            name=project_data.name,
            description=project_data.description,
            created_at=now,
            updated_at=now,
        )

        project_id = await ProjectRepository.create_project(
            project.model_dump()
        )

        return project_id

    @staticmethod
    async def get_projects(current_user):
        return await ProjectRepository.get_projects_by_owner(
            str(current_user["_id"])
        )

    @staticmethod
    async def get_project(project_id):
        return await ProjectRepository.get_project_by_id(project_id)

    @staticmethod
    async def update_project(project_id, update_data):
        data = update_data.model_dump(exclude_unset=True)

        if data:
            data["updated_at"] = datetime.utcnow()
            await ProjectRepository.update_project(
                project_id,
                data,
            )

    @staticmethod
    async def delete_project(project_id):
        await ProjectRepository.delete_project(project_id)