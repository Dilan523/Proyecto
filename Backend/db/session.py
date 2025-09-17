from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db.database import Base

engine = create_engine("sqlite:///./test.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Este es get_db
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
