from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ======================
    # Application
    # ======================
    APP_NAME: str = "PromptGuard"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # ======================
    # API
    # ======================
    API_V1_PREFIX: str = "/api/v1"

    # ======================
    # Security
    # ======================
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    # ======================
    # MongoDB
    # ======================
    MONGODB_URI: str
    MONGODB_DATABASE: str

    # ======================
    # Redis
    # ======================
    REDIS_URL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()