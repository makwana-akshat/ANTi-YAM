from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app

client = TestClient(app)

def test_missing_auth_header():
    # Should be caught by AuthenticationMiddleware
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401
    assert "Expected 'Bearer" in response.json()["error"]
    print("[PASS] Missing auth header rejected successfully (401)")

@patch("app.middleware.auth.AuthenticationService")
def test_sync_new_user(mock_auth_service_class):
    # Mock the auth service to bypass real JWT decode and Supabase calls
    mock_service = MagicMock()
    mock_auth_service_class.return_value = mock_service
    
    # Mock verify_jwt to return fake claims
    fake_claims = {"sub": "user_123", "email": "test@example.com"}
    mock_service.verify_jwt.return_value = fake_claims
    
    # Mock sync_user to return a SyncResponse dictionary-like object
    from app.auth.schemas import SyncResponse
    import uuid
    from datetime import datetime, timezone
    
    sync_resp = SyncResponse(
        id=uuid.uuid4(),
        clerk_id="user_123",
        email="test@example.com",
        is_active=True,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        is_new_user=True
    )
    mock_service.sync_user.return_value = sync_resp

    # We must patch the service instantiated in the route as well
    with patch("app.auth.routes.AuthenticationService") as route_mock_service_class:
        route_mock_service_class.return_value = mock_service
        # Make the request with a dummy token and payload
        response = client.post(
            "/api/v1/auth/sync", 
            headers={"Authorization": "Bearer dummy_token"},
            json={
                "email": "test@example.com",
                "full_name": "Test User"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["data"]["clerk_id"] == "user_123"
        assert data["data"]["is_new_user"] is True
        print("[PASS] /api/v1/auth/sync works with mock JWT and returns new user")

@patch("app.middleware.auth.AuthenticationService")
def test_protected_route_enforcement(mock_auth_service_class):
    mock_service = MagicMock()
    mock_auth_service_class.return_value = mock_service
    mock_service.verify_jwt.return_value = {"sub": "user_123"}
    
    # Simulate get_current_user throwing 403 because user isn't synced
    from fastapi import HTTPException
    
    # We actually need to patch the route's AuthenticationService as well
    # Let's use the app dependency override or just mock it directly.
    # Since routes instantiate AuthenticationService directly, we patch it globally:
    with patch("app.auth.routes.AuthenticationService") as route_mock_service_class:
        route_service = MagicMock()
        route_mock_service_class.return_value = route_service
        route_service.get_current_user.side_effect = HTTPException(status_code=403, detail="User not synchronized. Please call /sync first.")
        
        response = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer dummy_token"})
        assert response.status_code == 403
        assert "User not synchronized" in response.text
        print("[PASS] /api/v1/auth/me enforces database sync check successfully (403)")

if __name__ == "__main__":
    test_missing_auth_header()
    test_sync_new_user()
    test_protected_route_enforcement()
    print("\nAll auth verification tests passed!")
