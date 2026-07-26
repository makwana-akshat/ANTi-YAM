from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, Any

T = TypeVar("T")

class SuccessResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[Any] = None

class Pagination(BaseModel):
    total: int
    page: int
    size: int
    pages: int

class HealthCheckResponse(BaseModel):
    status: str
    environment: str
