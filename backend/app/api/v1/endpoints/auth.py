from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED
)
async def register(user: UserCreate):
    """
    Register a new user.
    """
    try:
        result = await AuthService.register(user)
        return result

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login")
async def login(user: UserLogin):
    """
    Login user and return JWT tokens.
    """
    try:
        result = await AuthService.login(user)
        return result

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.get("/")
async def auth_root():
    return {
        "message": "Authentication service is ready."
    }