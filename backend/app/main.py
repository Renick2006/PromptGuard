from fastapi import FastAPI

from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="CI/CD platform for LLM evaluation, prompt testing, and observability.",
    version=settings.APP_VERSION,
)


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "status": "running",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }