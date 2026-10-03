from app import database
from click import DateTime
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import Integer, Float, Column
from app.database import Base
class Notification(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(String)
    is_read = Column(Boolean)
    created_at = Column(DateTime, default=DateTime.utcnow())
    