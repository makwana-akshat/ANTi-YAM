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
