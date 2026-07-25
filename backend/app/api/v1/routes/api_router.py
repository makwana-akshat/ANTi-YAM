from fastapi import APIRouter
api_router = APIRouter()
from .auth import auth
api_router.include_router(auth.router, prefix='/auth', tags=['auth'])
from .users import users
api_router.include_router(users.router, prefix='/users', tags=['users'])
from .chat import chat
api_router.include_router(chat.router, prefix='/chat', tags=['chat'])
from .health import health
api_router.include_router(health.router, prefix='/health', tags=['health'])
from .reports import reports
api_router.include_router(reports.router, prefix='/reports', tags=['reports'])
from .medications import medications
api_router.include_router(medications.router, prefix='/medications', tags=['medications'])
from .dashboard import dashboard
api_router.include_router(dashboard.router, prefix='/dashboard', tags=['dashboard'])

