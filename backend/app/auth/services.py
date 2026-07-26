import jwt
from typing import Dict, Any, Tuple
from jwt.algorithms import RSAAlgorithm
from loguru import logger
from fastapi import HTTPException, status
from app.utils.clerk import get_jwks
from app.config.config import settings
from app.users.repository import UsersRepository
from app.users.schemas import UserUpdateRequest
from app.auth.schemas import SyncResponse
from app.users.schemas import UserResponse

class AuthenticationService:
    def __init__(self):
        self.user_repo = UsersRepository()

    def verify_jwt(self, token: str) -> Dict[str, Any]:
        """Verifies a Clerk JWT using the JWKS public keys and returns the decoded claims."""
        try:
            jwks = get_jwks()
            
            # Get the key ID (kid) from the token header without verifying yet
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
            if not kid:
                raise HTTPException(status_code=401, detail="Invalid token header. No 'kid' found.")
            
            # Find the matching key in JWKS
            rsa_key = {}
            for key in jwks.get("keys", []):
                if key["kid"] == kid:
                    rsa_key = {
                        "kty": key["kty"],
                        "kid": key["kid"],
                        "use": key["use"],
                        "n": key["n"],
                        "e": key["e"]
                    }
                    break
            
            if not rsa_key:
                raise HTTPException(status_code=401, detail="Public key not found in JWKS.")
            
            public_key = RSAAlgorithm.from_jwk(rsa_key)
            
            # Verify the token
            decoded = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                issuer=settings.CLERK_JWT_ISSUER
            )
            return decoded
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired.")
        except jwt.PyJWTError as e:
            logger.error(f"JWT Verification failed: {e}")
            raise HTTPException(status_code=401, detail="Invalid authentication token.")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Unexpected error in verify_jwt: {e}")
            raise HTTPException(status_code=500, detail="Internal server error during authentication.")

    def extract_claims(self, claims: Dict[str, Any], body: Any = None) -> Dict[str, Any]:
        """Extracts standard user fields from Clerk's raw JWT claims or the provided request body."""
        clerk_id = claims.get("sub")
        
        email = body.email if body else claims.get("email")
        if not email and claims.get("email_addresses"):
            email = claims.get("email_addresses")[0]
            
        full_name = body.full_name if body else claims.get("name")
        if not full_name and claims.get("given_name"):
            given = claims.get("given_name", "")
            family = claims.get("family_name", "")
            full_name = f"{given} {family}".strip()
            
        return {
            "clerk_id": clerk_id,
            "email": email,
            "full_name": full_name or None,
            "avatar_url": body.avatar_url if body else claims.get("picture"),
            "phone_number": body.phone_number if body else claims.get("phone_number")
        }

    def sync_user(self, claims: Dict[str, Any], body: Any = None) -> SyncResponse:
        """Synchronizes the JWT claims with the database (insert or update)."""
        extracted = self.extract_claims(claims, body)
        clerk_id = extracted.get("clerk_id")
        
        if not clerk_id or not extracted.get("email"):
            raise HTTPException(status_code=400, detail="Missing required 'clerk_id' or 'email'. Ensure frontend sends the email.")
            
        existing_user = self.user_repo.find_by_clerk_id(clerk_id)
        
        if existing_user:
            # Update user info (including last_login)
            self.user_repo.update_last_login(clerk_id)
            updated_user = self.user_repo.update_user(clerk_id, {
                "email": extracted["email"],
                "full_name": extracted["full_name"],
                "avatar_url": extracted["avatar_url"],
                "phone_number": extracted["phone_number"]
            })
            if not updated_user:
                raise HTTPException(status_code=500, detail="Failed to update existing user.")
            
            logger.info(f"Synchronized existing user: {clerk_id}")
            return SyncResponse(**updated_user, is_new_user=False)
        else:
            # Insert new user
            new_user = self.user_repo.create_user(extracted)
            if not new_user:
                raise HTTPException(status_code=500, detail="Failed to create new user.")
            
            # Set last login initially
            self.user_repo.update_last_login(clerk_id)
            new_user = self.user_repo.find_by_clerk_id(clerk_id)
            
            logger.info(f"Created new user via sync: {clerk_id}")
            return SyncResponse(**new_user, is_new_user=True)
            
    def get_current_user(self, clerk_id: str) -> UserResponse:
        """Fetches the synced user profile."""
        user = self.user_repo.find_by_clerk_id(clerk_id)
        if not user:
            raise HTTPException(status_code=403, detail="User not synchronized. Please call /sync first.")
        if not user.get("is_active"):
            raise HTTPException(status_code=403, detail="User account is deactivated.")
        return UserResponse(**user)
        
    def update_profile(self, clerk_id: str, update_data: UserUpdateRequest) -> UserResponse:
        updated_user = self.user_repo.update_user(clerk_id, update_data.model_dump(exclude_unset=True))
        if not updated_user:
            raise HTTPException(status_code=500, detail="Failed to update profile.")
        logger.info(f"Profile updated for user: {clerk_id}")
        return UserResponse(**updated_user)
        
    def delete_account(self, clerk_id: str) -> bool:
        success = self.user_repo.soft_delete(clerk_id)
        if success:
            logger.info(f"Account soft-deleted for user: {clerk_id}")
        return success
