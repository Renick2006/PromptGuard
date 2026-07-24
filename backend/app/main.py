from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import logger
from app.db.mongodb import mongodb


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"{settings.APP_NAME} is starting...")

    await mongodb.connect()

    yield

    await mongodb.disconnect()

    logger.info(f"{settings.APP_NAME} has stopped.")


app = FastAPI(
    title=settings.APP_NAME,
    description="CI/CD platform for LLM evaluation, prompt testing, and observability.",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)