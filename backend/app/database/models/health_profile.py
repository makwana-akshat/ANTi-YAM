
from sqlalchemy import Column, Integer, String
from .base import Base

class HealthProfile(Base):
    __tablename__ = 'health_profiles'
    id = Column(Integer, primary_key=True, index=True)

