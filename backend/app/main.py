
from fastapi import FastAPI
from .api.v1.routes.api_router import api_router

app = FastAPI(title='SwasthAI Backend API', version='1.0.0')

app.include_router(api_router, prefix='/api/v1')

@app.get('/')
async def root():
    return {'message': 'Welcome to SwasthAI API'}

