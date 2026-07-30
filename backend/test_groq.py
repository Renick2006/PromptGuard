import asyncio

from app.services.groq_service import GroqService


async def main():
    service = GroqService()

    result = await service.analyze_prompt(
        "Write a Python program to print Hello World."
    )

    print(result)


asyncio.run(main())