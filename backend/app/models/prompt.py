from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field
from bson import ObjectId


class Prompt(BaseModel):
    project_id: ObjectId
    owner_id: ObjectId

    title: str
    content: str

    description: Optional[str] = None

    version: int = 1

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)