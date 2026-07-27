# ANTi-YAM

ANTi-YAM is a modern, production-quality AI Healthcare Web Application. It features a robust FastAPI backend connected to a Supabase PostgreSQL database, and a React frontend utilizing Clerk for secure user authentication and synchronization.

## Project Structure

This repository is structured into distinct frontend and backend directories:

- **`frontend/`**: The React web application.
  - Built with React, TypeScript, and Vite.
  - Uses TailwindCSS for styling and UI components.
  - Integrates Clerk for authentication (`<ClerkProvider>`, `useAuth`, `useUser`).
- **`backend/`**: The FastAPI server.
  - Built with FastAPI and Python 3.
  - Uses `supabase-py` for database interactions.
  - Custom Authentication Middleware intercepts Clerk JWTs to verify users securely.
  - Follows a Clean Architecture pattern (`routes` -> `services` -> `repository` -> `schemas`).


## Features (Implemented & Upcoming)

### Implemented

1. **Secure Authentication & User Sync**
   - Users can securely sign up and log in via Clerk.
   - Upon successful login, the frontend silently synchronizes the user's details with the backend via the `/api/v1/auth/sync` endpoint.
   - The backend creates or updates a synchronized user record in the Supabase `users` table.

2. **Health Profile Management**
   - Authenticated users can create and manage their Health Profile (Age, Height, Weight, Blood Group, etc.).
   - Employs strict Pydantic validation and 1:1 relationship constraints (`UNIQUE(user_id)`).
   - Utilizes JSONB columns for flexible data like known conditions, allergies, and emergency contacts.
   - Profile data is inherently mapped to the user's JWT claim to prevent IDOR vulnerabilities.
   
3. **AI Health Companion**
   - Personalized AI chat assistant for health-related queries using LLMs.
4. **AI Triage System**
   - Preliminary symptom assessment, diagnosis suggestions, and urgency evaluation.
5. **Medical Reports Parsing**
   - OCR and AI extraction of structured data from uploaded medical documents and lab results.
6. **Analytics & Dashboards**
   - Visualizations of health metrics and biometric trends over time.
7. **Hospital & Clinic Locator**
   - Location-based recommendations for nearby medical facilities.
8. **Notifications System**
   - Real-time alerts for medication reminders, appointments, and system updates.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.10 or higher recommended)
- Supabase account (for PostgreSQL database)
- Clerk account (for authentication keys)

## Getting Started

### 1. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `backend/.env`:
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The backend will be available at `http://127.0.0.1:8000`.*

### 2. Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `frontend/.env.local`:
   - `VITE_CLERK_PUBLISHABLE_KEY`
4. Run the React development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`.*

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, TypeScript, Clerk
- **Backend**: FastAPI, Python, Pydantic, Loguru
- **Database**: Supabase (PostgreSQL)
- **Testing**: Pytest, FastAPI TestClient
