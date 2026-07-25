
from sqlalchemy import Column, Integer, String
from .base import Base

class HealthLog(Base):
    __tablename__ = 'health_logs'
    id = Column(Integer, primary_key=True, index=True)

