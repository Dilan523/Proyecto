# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

# Usuario para lectura
class UsuarioOut(BaseModel):
    id: int
    nombre: str
    apellidos: str
    correo: EmailStr
    foto: Optional[str]
    rol_id: int

    class Config:
        orm_mode = True

# Usuario para registro
class UsuarioRegister(BaseModel):
    nombre_usuario: str
    apellido_usuario: str
    correo_usuario: EmailStr
    contrasena_usuario: str
    rol_id: int = 1
    foto_usuario: Optional[str]

# Usuario para login
class UsuarioLogin(BaseModel):
    correo_usuario: EmailStr
    contrasena_usuario: str

# Respuesta del login
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    usuario: UsuarioOut
