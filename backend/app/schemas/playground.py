from pydantic import BaseModel, Field


class PlaygroundRequest(BaseModel):
    user_input: str = Field(
        ...,
        min_length=1,
        max_length=5000,
    )


class PlaygroundResponse(BaseModel):
    response: str