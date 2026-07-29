from fastapi import APIRouter

from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.project import router as project_router
from app.api.v1.endpoints.prompt import router as prompt_router
from app.api.v1.endpoints.prompt_evaluation import (
    router as prompt_evaluation_router,
)
from app.api.v1.endpoints.prompt_version import (
    router as prompt_version_router,
)
from app.api.v1.endpoints.root import router as root_router

api_router = APIRouter()

api_router.include_router(root_router)
api_router.include_router(health_router)
api_router.include_router(auth_router, tags=["Authentication"])
api_router.include_router(project_router, tags=["Projects"])
api_router.include_router(prompt_router, tags=["Prompts"])
api_router.include_router(prompt_version_router, tags=["Prompt Versions"])
api_router.include_router(
    prompt_evaluation_router,
    tags=["Prompt Evaluations"],
)