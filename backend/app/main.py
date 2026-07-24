from fastapi import FastAPI

from app.api.v1.router import api_router
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


app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)