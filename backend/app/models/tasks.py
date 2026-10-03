from sqlalchemy import DateTime
from app.routers import users
from sqlalchemy import ForeignKey
from app.models import leads
from sqlalchemy.sql.roles import ColumnListRole
from sqlalchemy import Integer, Float, String, Column
from app.database import Base
from datetime import datetime

class Tasks(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    lead_id = Column(Integer, ForeignKey("leads.id"))
    assigned_to_id = Column(Integer, ForeignKey("users.id"))
    due_date = Column(DateTime)
    status = Column(String)
    priority = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)