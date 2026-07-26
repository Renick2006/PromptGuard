from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PromptVersionResponse(BaseModel):
    id: str
    prompt_id: str
    project_id: str
    owner_id: str

    version: int

    title: str
    content: str
    description: Optional[str] = None

    created_at: datetime