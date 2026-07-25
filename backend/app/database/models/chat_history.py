
from sqlalchemy import Column, Integer, String
from .base import Base

class ChatHistory(Base):
    __tablename__ = 'chat_historys'
    id = Column(Integer, primary_key=True, index=True)

