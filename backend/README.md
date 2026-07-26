# SwasthAI Backend

Production-quality AI Healthcare Web Application Backend.

## Architecture
Modular clean architecture designed for future scaling. 
Features are logically separated into domains (`app/auth`, `app/users`, etc.) while shared utilities, schemas, and models live in the central `app/` folders.

## Folder Structure
- `app/api`: Main API routers and global dependencies.
- `app/<module>`: Feature-specific business logic and routers.
- `app/core`: Application-wide core configs like centralized logging.
- `app/database`: Database connection logic.

## How to Run
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `.\venv\Scripts\Activate.ps1` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and fill in secrets.
5. Run server: `uvicorn app.main:app --reload`
