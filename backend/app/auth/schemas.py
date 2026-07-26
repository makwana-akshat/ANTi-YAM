from pydantic import BaseModel
from app.users.schemas import UserResponse

class SyncResponse(UserResponse):
    is_new_user: bool

class LogoutResponse(BaseModel):
    success: bool = True
