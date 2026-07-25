from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.dependencies import get_current_user
from app.schemas.user import UserCreate
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
async def register(user: UserCreate):
    """
    Register a new user.
    """
    try:
        return await AuthService.register(user)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """
    Login user and return JWT tokens.
    """
    try:
        return await AuthService.login(
            form_data.username,   # Email entered in Swagger
            form_data.password,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


@router.get("/me")
async def get_profile(
    current_user=Depends(get_current_user),
):
    """
    Return the currently authenticated user.
    """
    return {
        "id": str(current_user["_id"]),
        "username": current_user["username"],
        "email": current_user["email"],
    }


@router.get("/")
async def auth_root():
    """
    Authentication health check.
    """
    return {
        "message": "Authentication service is ready."
    }