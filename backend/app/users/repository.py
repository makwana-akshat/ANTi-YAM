from typing import Optional, Dict, Any
from datetime import datetime, timezone
from app.database.supabase import get_supabase_client
from loguru import logger

class UsersRepository:
    def __init__(self):
        self.client = get_supabase_client()
        self.table = self.client.table("users")

    def find_by_clerk_id(self, clerk_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = self.table.select("*").eq("clerk_id", clerk_id).execute()
            data = response.data
            return data[0] if data else None
        except Exception as e:
            logger.error(f"Error finding user by clerk_id {clerk_id}: {e}")
            return None

    def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        try:
            response = self.table.insert(user_data).execute()
            data = response.data
            return data[0] if data else None
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return None

    def update_user(self, clerk_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        try:
            update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
            response = self.table.update(update_data).eq("clerk_id", clerk_id).execute()
            data = response.data
            return data[0] if data else None
        except Exception as e:
            logger.error(f"Error updating user {clerk_id}: {e}")
            return None

    def update_last_login(self, clerk_id: str) -> None:
        try:
            now = datetime.now(timezone.utc).isoformat()
            self.table.update({"last_login": now, "updated_at": now}).eq("clerk_id", clerk_id).execute()
        except Exception as e:
            logger.error(f"Error updating last_login for {clerk_id}: {e}")

    def soft_delete(self, clerk_id: str) -> bool:
        try:
            now = datetime.now(timezone.utc).isoformat()
            self.table.update({
                "is_active": False, 
                "updated_at": now
            }).eq("clerk_id", clerk_id).execute()
            return True
        except Exception as e:
            logger.error(f"Error soft deleting user {clerk_id}: {e}")
            return False
