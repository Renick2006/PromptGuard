from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

URI = "mongodb+srv://renickrajesh_db_user:dmL7PXaCpusAIvDh@promptguardcluster.xa6kifn.mongodb.net/?appName=PromptGuardCluster"

async def main():
    client = AsyncIOMotorClient(URI)
    await client.admin.command("ping")
    print("✅ MongoDB Connected")
    client.close()

asyncio.run(main())