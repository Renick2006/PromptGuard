from datetime import datetime

from pydantic import BaseModel


class PromptEvaluation(BaseModel):
    prompt_id: str
    project_id: str
    owner_id: str

    quality_score: int
    clarity_score: int
    readability_score: int

    estimated_tokens: int
    estimated_cost: float

    created_at: datetime