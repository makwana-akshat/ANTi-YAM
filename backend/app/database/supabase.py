# Supabase client initialization placeholder
from supabase import create_client, Client
from app.config.config import settings

def get_supabase_client() -> Client:
    # Use the service role key for backend operations to bypass RLS
    key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY
    return create_client(settings.SUPABASE_URL, key)
