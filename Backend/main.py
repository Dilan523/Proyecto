# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import Base, engine
from routes.usuarios_controller import router as auth_router

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SN-52 Backend")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Dirección de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir carpeta uploads para fotos
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Incluir router de autenticación
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"mensaje": "Backend SN-52 corriendo correctamente"}
