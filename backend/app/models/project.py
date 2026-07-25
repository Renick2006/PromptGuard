from pydantic import BaseModel
from datetime import datetime


class Project(BaseModel):
    owner_id: str
    name: str
    description: str
    created_at: datetime
    updated_at: datetime