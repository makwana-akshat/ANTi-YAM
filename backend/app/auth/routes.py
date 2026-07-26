from fastapi import APIRouter, Request, status
from app.auth.schemas import SyncResponse, LogoutResponse
from app.users.schemas import UserResponse, UserUpdateRequest
from app.auth.services import AuthenticationService
from app.schemas.base import SuccessResponse

router = APIRouter()

@router.post("/sync", response_model=SuccessResponse[SyncResponse], summary="Synchronize Clerk user with database")
async def sync_user(request: Request):
    """Called by frontend after login/signup to ensure the user exists in our local database."""
    auth_service = AuthenticationService()
    # request.state.user is attached by the AuthenticationMiddleware
    sync_result = auth_service.sync_user(request.state.user)
    return SuccessResponse(data=sync_result)

@router.get("/me", response_model=SuccessResponse[UserResponse], summary="Get current authenticated user")
async def get_me(request: Request):
    """Returns the internal user profile."""
    auth_service = AuthenticationService()
    clerk_id = request.state.user.get("sub")
    user_profile = auth_service.get_current_user(clerk_id)
    return SuccessResponse(data=user_profile)

@router.patch("/profile", response_model=SuccessResponse[UserResponse], summary="Update user profile")
async def update_profile(request: Request, update_data: UserUpdateRequest):
    """Updates user information like full name, phone number, and avatar url."""
    auth_service = AuthenticationService()
    clerk_id = request.state.user.get("sub")
    # Validate they are synchronized and active first
    auth_service.get_current_user(clerk_id)
    updated_user = auth_service.update_profile(clerk_id, update_data)
    return SuccessResponse(data=updated_user)

@router.post("/logout", response_model=SuccessResponse[LogoutResponse], summary="Log out the user")
async def logout(request: Request):
    """Logout endpoint. Clerk invalidates the session on the frontend, this just returns success."""
    return SuccessResponse(data=LogoutResponse(success=True))

@router.delete("/account", response_model=SuccessResponse[LogoutResponse], summary="Soft delete account")
async def delete_account(request: Request):
    """Soft deletes the user account by setting is_active=False."""
    auth_service = AuthenticationService()
    clerk_id = request.state.user.get("sub")
    auth_service.delete_account(clerk_id)
    return SuccessResponse(data=LogoutResponse(success=True))
