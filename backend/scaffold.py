import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')

files = {
    # Main App
    "app/main.py": """
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from .config.config import settings
from .api.routes.api_router import api_router
from .middleware.logging import RequestLoggingMiddleware
from .middleware.errors import global_exception_handler

app = FastAPI(
    title="SwasthAI API",
    version="1.0.0",
    description="Production-quality AI Healthcare Web Application Backend",
    debug=settings.DEBUG
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware
app.add_middleware(RequestLoggingMiddleware)
app.add_exception_handler(Exception, global_exception_handler)

# Routers
app.include_router(api_router, prefix="/api/v1")

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "environment": settings.ENVIRONMENT}

@app.get("/version", tags=["System"])
async def get_version():
    return {"version": app.version}

@app.get("/", tags=["System"])
async def root():
    return {"message": "Welcome to SwasthAI API"}

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up SwasthAI API...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down SwasthAI API...")
""",

    # Config
    "app/config/__init__.py": "",
    "app/config/config.py": """
from .settings import Settings

settings = Settings()
""",
    "app/config/settings.py": """
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = None
    
    # Clerk Auth
    CLERK_SECRET_KEY: str
    CLERK_PUBLISHABLE_KEY: str
    CLERK_JWT_ISSUER: str
    
    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen3:4b"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
""",

    # Database
    "app/database/__init__.py": "",
    "app/database/connection.py": """
# SQLAlchemy connection setup placeholder
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker
# from app.config.config import settings

# engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG)
# async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
""",
    "app/database/supabase.py": """
# Supabase client initialization placeholder
from supabase import create_client, Client
from app.config.config import settings

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
""",

    # Core
    "app/core/__init__.py": "",
    "app/core/logging.py": """
import sys
from loguru import logger

# Configure loguru logger
logger.remove()
logger.add(sys.stderr, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>")
""",

    # Middleware
    "app/middleware/__init__.py": "",
    "app/middleware/auth.py": """
# Authentication Middleware Placeholder
""",
    "app/middleware/errors.py": """
from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger

async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal Server Error"}
    )
""",
    "app/middleware/logging.py": """
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from loguru import logger
import time

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
        return response
""",
    "app/middleware/rate_limit.py": """
# Rate Limiting Middleware Placeholder
""",

    # Schemas
    "app/schemas/__init__.py": "",
    "app/schemas/base.py": """
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
""",

    # Utils
    "app/utils/__init__.py": "",
    "app/utils/constants.py": """
# System Constants
""",
    "app/utils/helpers.py": """
# Helper functions
""",
    "app/utils/exceptions.py": """
# Custom Exceptions
""",
    "app/utils/response.py": """
# Response formatting utilities
""",
    "app/utils/validators.py": """
# Reusable Pydantic validators
""",

    # API Main Router
    "app/api/__init__.py": "",
    "app/api/dependencies/__init__.py": "",
    "app/api/routes/__init__.py": "",
    "app/api/routes/api_router.py": """
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
"""
}

# Module Scaffolding
modules = ["auth", "users", "health", "ai", "triage", "analytics", "reports", "hospitals", "dashboard", "notifications"]

for module in modules:
    files[f"app/{module}/__init__.py"] = ""
    files[f"app/{module}/routes.py"] = f"""
from fastapi import APIRouter
from app.schemas.base import SuccessResponse

router = APIRouter()

@router.get("/")
async def get_{module}():
    return SuccessResponse(data="{module} placeholder")
"""
    files[f"app/{module}/services.py"] = f"# Business logic for {module}\n"
    files[f"app/{module}/schemas.py"] = f"# Pydantic schemas for {module}\n"
    files[f"app/{module}/models.py"] = f"# SQLAlchemy models for {module}\n"

for path, content in files.items():
    write_file(path, content)

print("Scaffolding complete.")
