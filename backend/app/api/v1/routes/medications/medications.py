
from fastapi import APIRouter
router = APIRouter()

@router.get('/')
async def get_medications():
    return {'message': 'medications endpoint'}

