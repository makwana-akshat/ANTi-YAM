from fastapi import APIRouter
from app.auth.routes import router as auth_router
from app.users.routes import router as users_router
from app.health.routes import router as health_router
from app.ai.routes import router as ai_router
from app.triage.routes import router as triage_router
from app.analytics.routes import router as analytics_router
from app.reports.routes import router as reports_router
from app.hospitals.routes import router as hospitals_router
from app.dashboard.routes import router as dashboard_router
from app.notifications.routes import router as notifications_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(users_router, prefix="/users", tags=["Users"])
api_router.include_router(health_router, prefix="/health-profile", tags=["Health Profile"])
api_router.include_router(ai_router, prefix="/chat", tags=["AI Companion"])
api_router.include_router(triage_router, prefix="/triage", tags=["Triage"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(reports_router, prefix="/reports", tags=["Reports"])
api_router.include_router(hospitals_router, prefix="/hospitals", tags=["Hospitals"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(notifications_router, prefix="/notifications", tags=["Notifications"])
