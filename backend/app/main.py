from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models.user import User
from app.models.leads import Leads
from app.routers.users import router  as user_router 
from app.routers.leads import router as leads_router
app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"] )

Base.metadata.create_all(bind=engine)
app.include_router(user_router,prefix="/users")
app.include_router(leads_router, prefix="/leads")
@app.get('/')
def get_all():
    return {"message":"hello"}