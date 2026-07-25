
from sqlalchemy import Column, Integer, String
from .base import Base

class Symptom(Base):
    __tablename__ = 'symptoms'
    id = Column(Integer, primary_key=True, index=True)

