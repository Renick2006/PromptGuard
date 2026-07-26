from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class PromptCreate(BaseModel):
    project_id: str
    title: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1)
    description: Optional[str] = None


class PromptUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    content: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = None


class PromptResponse(BaseModel):
    id: str
    project_id: str
    owner_id: str

    title: str
    content: str
    description: Optional[str]

    version: int

    created_at: datetime
    updated_at: datetime