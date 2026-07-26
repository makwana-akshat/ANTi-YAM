from fastapi import APIRouter
from app.schemas.base import SuccessResponse

router = APIRouter()

@router.get("/")
async def get_dashboard():
    return SuccessResponse(data="dashboard placeholder")
