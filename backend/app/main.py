from fastapi import FastAPI

app = FastAPI(
    title="PromptGuard API",
    description="CI/CD platform for LLM evaluation, prompt testing, and observability.",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to PromptGuard 🚀",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }