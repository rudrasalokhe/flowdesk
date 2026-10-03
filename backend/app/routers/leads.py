from fastapi import HTTPException
from fastapi import status
from app.schemas.leads import LeadRespose
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from app.database import get_db
from app.models.leads import Leads
from app.schemas.leads import LeadCreate

router = APIRouter()

@router.get("/")
def getleads(db:Session = Depends(get_db)):
    result = db.query(Leads).all()
    return result

@router.post('/', response_model=LeadRespose, status_code=status.HTTP_201_CREATED)
def createlead(lead: LeadCreate, db: Session = Depends(get_db)):
    new_lead = Leads(**lead.model_dump())
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead 

@router.get("/{id}", response_model=LeadRespose)
def get_lead_by_id(id: int, db:Session = Depends(get_db)):
    lead = db.query(Leads).filter(Leads.id == id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Lead with id {id} not found"
        )
    return lead
