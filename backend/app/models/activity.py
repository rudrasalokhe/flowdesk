from pygments.token import String
from sqlalchemy import ForeignKey
from sqlalchemy import Integer, Float, Column, Double 
from app.database import Base
class LeadActivity(Base):
    __tablename__ = "lead_activity"
    id = Column(Integer, primary_key=True)
    lead_id = Column(Integer, ForeignKey("leads.id"))
    title = Column(String)
    details = Column(String)
    actor = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)