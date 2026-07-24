from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ConnectionFailure

from app.core.config import settings
from app.core.logging import logger


class MongoDB:
    def __init__(self):
        self.client: AsyncIOMotorClient | None = None
        self.database: AsyncIOMotorDatabase | None = None

    async def connect(self):
        """Connect to MongoDB Atlas."""
        try:
            logger.info("Connecting to MongoDB Atlas...")

            self.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=5000,
            )

            # Verify the connection
            await self.client.admin.command("ping")

            # Select the database
            self.database = self.client[settings.MONGODB_DATABASE]

            logger.success("Connected to MongoDB Atlas.")

        except ConnectionFailure as e:
            logger.error(f"MongoDB connection failed: {e}")
            raise

    async def disconnect(self):
        """Close MongoDB connection."""
        if self.client:
            logger.info("Closing MongoDB connection...")
            self.client.close()
            logger.success("MongoDB connection closed.")

    @property
    def db(self) -> AsyncIOMotorDatabase:
        """
        Returns the active MongoDB database instance.
        Usage:
            mongodb.db["users"]
        """
        if self.database is None:
            raise RuntimeError("MongoDB is not connected.")
        return self.database


# Singleton instance used throughout the application
mongodb = MongoDB()