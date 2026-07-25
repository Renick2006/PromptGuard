from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
)

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class AuthService:

    @staticmethod
    async def register(user_data: UserCreate):
        """
        Register a new user.
        """

        # Check if email already exists
        existing_email = await UserRepository.get_by_email(
            user_data.email
        )

        if existing_email:
            raise ValueError("Email already registered.")

        # Check if username already exists
        existing_username = await UserRepository.get_by_username(
            user_data.username
        )

        if existing_username:
            raise ValueError("Username already exists.")

        # Prepare user document
        new_user = {
            "username": user_data.username,
            "email": user_data.email,
            "password": hash_password(user_data.password),
        }

        # Save user
        user_id = await UserRepository.create_user(new_user)

        return {
            "message": "User registered successfully.",
            "user_id": user_id,
        }

    @staticmethod
    async def login(email: str, password: str):
        """
        Authenticate user and return JWT tokens.
        """

        user = await UserRepository.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password.")

        if not verify_password(
            password,
            user["password"],
        ):
            raise ValueError("Invalid email or password.")

        access_token = create_access_token(
            str(user["_id"])
        )

        refresh_token = create_refresh_token(
            str(user["_id"])
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }