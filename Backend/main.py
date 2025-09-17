# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine
from routes.usuarios_controller import router as auth_router

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SN-52 Backend")

# Configuración de CORS para permitir que tu frontend (Vite/React) haga requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Dirección de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir router de autenticación
app.include_router(auth_router)

# Ruta raíz opcional para verificar que el backend corre
@app.get("/")
def read_root():
    return {"mensaje": "Backend SN-52 corriendo correctamente"}
