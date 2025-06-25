import os
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Note: I am cleaning up the imports slightly for clarity
from sqlmodel import Field, Session, SQLModel, create_engine, select
from dotenv import load_dotenv

# This is the real fix. We define the table name as a class variable.
class Project(SQLModel, table=True):
    __tablename__ = "projects"  # <-- THE REAL FIX IS HERE

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    repo_url: Optional[str] = None
    live_url: Optional[str] = None


# --- SETUP AND CONFIGURATION ---
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")
DB_PORT = os.getenv("DB_PORT") 

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

engine = create_engine(DATABASE_URL)


# --- APP and MIDDLEWARE ---
app = FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API ENDPOINTS ---
@app.get("/")
def read_root():
    return {"Status": "Backend is running!"}


@app.get("/api/projects", response_model=List[Project])
def get_projects():
    with Session(engine) as session:
        # This line will now correctly generate the SQL: "SELECT ... FROM projects"
        projects = session.exec(select(Project)).all()
        return projects