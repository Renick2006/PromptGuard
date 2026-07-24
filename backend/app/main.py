from fastapi import FastAPI

from app.core.config import settings
from app.core.logging import logger

app = FastAPI(
    title=settings.APP_NAME,
    description="CI/CD platform for LLM evaluation, prompt testing, and observability.",
    version=settings.APP_VERSION,
)


@app.on_event("startup")
async def startup():
    logger.info(f"{settings.APP_NAME} is starting...")


@app.on_event("shutdown")
async def shutdown():
    logger.info(f"{settings.APP_NAME} is shutting down...")


@app.get("/")
async def root():
    logger.info("Root endpoint accessed")

    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "status": "running",
    }


@app.get("/health")
async def health():
    logger.info("Health endpoint accessed")

    return {
        "status": "healthy"
    }