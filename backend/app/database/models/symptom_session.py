
from sqlalchemy import Column, Integer, String
from .base import Base

class SymptomSession(Base):
    __tablename__ = 'symptom_sessions'
    id = Column(Integer, primary_key=True, index=True)

