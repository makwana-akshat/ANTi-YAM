
from sqlalchemy import Column, Integer, String
from .base import Base

class Medication(Base):
    __tablename__ = 'medications'
    id = Column(Integer, primary_key=True, index=True)

