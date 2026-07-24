from fastapi import APIRouter

from app.core.logging import logger

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health():
    logger.info("Health endpoint accessed")

    return {
        "status": "healthy"
    }