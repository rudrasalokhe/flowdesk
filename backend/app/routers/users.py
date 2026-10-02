from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User 


router = APIRouter()

@router.get('/')
def get_users(db:Session = Depends(get_db)):
    result = db.query(User).all()
    return {"users": result} 