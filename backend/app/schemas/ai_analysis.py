from typing import List

from pydantic import BaseModel


class AIAnalysisResponse(BaseModel):
    quality_score: int
    clarity_score: int
    readability_score: int

    estimated_tokens: int
    estimated_cost: float

    strengths: List[str]
    weaknesses: List[str]

    improved_prompt: str