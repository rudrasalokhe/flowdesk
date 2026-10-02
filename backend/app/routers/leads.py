from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from app.database import get_db
from app.models.leads import Leads

router = APIRouter()

@router.get("/")
def getleads(db:Session = Depends(get_db)):
    result = db.query(Leads).all()
    return{ "leads" : result}
