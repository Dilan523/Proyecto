from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db import get_db
from models.usuario import Usuario
from security.auth import verificar_contrasena, encriptar_contrasena, crear_token

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"]
)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.correo_usuario == form_data.username).first()

    if not usuario or not verificar_contrasena(form_data.password, usuario.contrasena_usuario):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")

    token_data = {"sub": usuario.id_usuario, "rol": usuario.rol_id}
    access_token = crear_token(token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "rol": usuario.rol.nombre
    }

@router.post("/register")
def registrar_usuario(nombre: str, apellido: str, correo: str, contrasena: str, db: Session = Depends(get_db)):
    # Verificar si el correo ya existe
    usuario_existente = db.query(Usuario).filter(Usuario.correo_usuario == correo).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    # Encriptar la contraseña
    hashed_pass = encriptar_contrasena(contrasena)

    # Crear el nuevo usuario con rol lector (id=1 por defecto)
    nuevo_usuario = Usuario(
        nombre_usuario=nombre,
        apellido_usuario=apellido,
        correo_usuario=correo,
        contrasena_usuario=hashed_pass,
        rol_id=1  # 👈 rol fijo para registros públicos
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"mensaje": "Usuario registrado exitosamente", "id": nuevo_usuario.id_usuario}
