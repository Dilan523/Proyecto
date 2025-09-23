# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import Base, engine
from routes.usuarios_controller import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SN-52 Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"mensaje": "Backend SN-52 corriendo correctamente"}
