from sqlalchemy import String, Integer, Float, Column
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    role = Column(String)
    team = Column(String)
    workload = Column(String)
    conversion_rate = Column(Float)
    status = Column(String)