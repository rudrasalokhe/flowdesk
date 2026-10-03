from datetime import datetime
from sqlalchemy import Integer, Float, Column, String, DateTime
from app.database import Base

class ImportJob(Base):
    __tablename__ = "import_jobs"
    id = Column(Integer, primary_key=True)
    filename = Column(String)
    status = Column(String, default="PROCESSING")
    total_rows = Column(Integer, default=0)
    processed_rows = Column(Integer, default=0)
    failed_rows = Column(Integer, default=0)
    imported_rows = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)