from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ConnectionFailure

from app.core.config import settings
from app.core.logging import logger


class MongoDB:
    def __init__(self):
        self.client: AsyncIOMotorClient | None = None
        self.database: AsyncIOMotorDatabase | None = None

    async def connect(self):
        try:
            logger.info("Connecting to MongoDB Atlas...")

            self.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=5000,
            )

            await self.client.admin.command("ping")

            self.database = self.client[settings.MONGODB_DATABASE]

            logger.success("Connected to MongoDB Atlas.")

        except ConnectionFailure as e:
            logger.error(f"MongoDB connection failed: {e}")
            raise

    async def disconnect(self):
        if self.client:
            logger.info("Closing MongoDB connection...")
            self.client.close()
            logger.success("MongoDB connection closed.")


mongodb = MongoDB()