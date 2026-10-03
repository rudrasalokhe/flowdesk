from typing import Optional 
from pydantic import BaseModel

class LeadCreate(BaseModel):
    name: str
    company: str
    email: str
    phone : Optional[str] = None
    source : Optional[str] = "Website"
    score : Optional[int] = 50
    priority : Optional[str]="Medium"
    status : Optional[str] = "New"
    industry : Optional[str] = None
    company_size : Optional[str] = None
    message : Optional[str] = None

class LeadRespose(LeadCreate):
    id:int 
    class config: 
        from_attributes = True
    