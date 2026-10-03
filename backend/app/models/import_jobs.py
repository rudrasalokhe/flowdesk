from pygments.token import String
from ast import Str
from sqlalchemy import Integer, Float, Column
from app.database import Base
class ImportJob(Base):
    __tablename__ = "import_jobs"
    id = Column(Integer, primary_key=True)
    filename = Column(String)
    status = Column(String)
    total_rows = Column(Integer)
    processed_rows = Column(Integer)
    failed_rows = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    imported_rows = Column(Integer)