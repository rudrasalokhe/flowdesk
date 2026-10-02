from dns import message
from sqlalchemy import Integer, Float, String , Column
from app.database import Base


class Leads(Base):
    __tablename__ ="leads"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    company = Column(String)
    email = Column(String)
    phone = Column(String)
    source = Column(String)
    score = Column(String)
    priority = Column(String)
    status = Column(String)
    assigned_to = Column(String)
    industry  = Column(String)
    message = Column(String)
    company_size = Column(String)
    created_at = Column(String)