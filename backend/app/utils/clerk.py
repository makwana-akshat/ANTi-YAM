import httpx
from cachetools import cached, TTLCache
from app.config.config import settings
from loguru import logger

# Cache JWKS for 1 hour to prevent hitting the Clerk API on every request
jwks_cache = TTLCache(maxsize=1, ttl=3600)

@cached(cache=jwks_cache)
def get_jwks() -> dict:
    """
    Fetches the JSON Web Key Set (JWKS) from Clerk synchronously (to be used with PyJWT).
    Uses caching to avoid rate limits and latency.
    """
    url = f"{settings.CLERK_JWT_ISSUER.rstrip('/')}/.well-known/jwks.json"
    logger.debug(f"Fetching JWKS from {url}")
    try:
        response = httpx.get(url, timeout=10.0)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Failed to fetch JWKS from {url}: {e}")
        raise
