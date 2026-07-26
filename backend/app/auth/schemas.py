from pydantic import BaseModel, EmailStr
from typing import Optional
from app.users.schemas import UserResponse

class SyncRequest(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    phone_number: Optional[str] = None

class SyncResponse(UserResponse):
    is_new_user: bool

class LogoutResponse(BaseModel):
    success: bool = True
