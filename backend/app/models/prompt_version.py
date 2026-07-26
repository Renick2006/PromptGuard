from datetime import datetime
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class PromptVersion(BaseModel):
    prompt_id: ObjectId
    project_id: ObjectId
    owner_id: ObjectId

    version: int

    title: str
    content: str
    description: Optional[str] = None

    created_at: datetime = Field(default_factory=datetime.utcnow)