from fastapi import APIRouter

from app.core.config import settings
from app.core.logging import logger

router = APIRouter()


@router.get("/", tags=["Root"])
async def root():
    logger.info("Root endpoint accessed")

    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "status": "running",
    }

