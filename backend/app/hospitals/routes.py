from fastapi import APIRouter
from app.schemas.base import SuccessResponse

router = APIRouter()

@router.get("/")
async def get_hospitals():
    return SuccessResponse(data="hospitals placeholder")
