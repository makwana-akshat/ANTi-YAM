from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from app.auth.services import AuthenticationService
from loguru import logger

# Paths that do not require authentication
PUBLIC_PATHS = ["/health", "/version", "/", "/docs", "/openapi.json"]

class AuthenticationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Allow CORS preflight requests to pass through
        if request.method == "OPTIONS":
            return await call_next(request)

        # Allow public paths
        if request.url.path in PUBLIC_PATHS or request.url.path.startswith("/api/v1/public"):
            return await call_next(request)
            
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={"success": False, "error": "Missing or malformed Authorization header. Expected 'Bearer <token>'"}
            )
            
        token = auth_header.split(" ")[1]
        auth_service = AuthenticationService()
        
        try:
            claims = auth_service.verify_jwt(token)
            request.state.user = claims
        except HTTPException as he:
            logger.warning(f"Auth rejection: {he.detail}")
            return JSONResponse(
                status_code=he.status_code,
                content={"success": False, "error": he.detail}
            )
        except Exception as e:
            logger.error(f"Unexpected auth error in middleware: {e}")
            return JSONResponse(
                status_code=401,
                content={"success": False, "error": "Invalid or expired token"}
            )
            
        response = await call_next(request)
        return response
