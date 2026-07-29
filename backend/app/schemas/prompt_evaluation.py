from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PromptEvaluationCreate(BaseModel):
    quality_score: int
    clarity_score: int
    readability_score: int
    estimated_tokens: int
    estimated_cost: float


class PromptEvaluationResponse(BaseModel):
    id: str

    prompt_id: str
    project_id: str
    owner_id: str

    quality_score: int
    clarity_score: int
    readability_score: int

    estimated_tokens: int
    estimated_cost: float

    created_at: datetime


class PromptEvaluationUpdate(BaseModel):
    quality_score: Optional[int] = None
    clarity_score: Optional[int] = None
    readability_score: Optional[int] = None
    estimated_tokens: Optional[int] = None
    estimated_cost: Optional[float] = None