
from sqlalchemy import Column, Integer, String
from .base import Base

class WeeklyReport(Base):
    __tablename__ = 'weekly_reports'
    id = Column(Integer, primary_key=True, index=True)

