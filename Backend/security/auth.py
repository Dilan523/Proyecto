from fastapi import APIRouter, UploadFile, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.usuario import Usuario
from security.auth import encriptar_contrasena

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/register")
async def register(
    nombre_usuario: str = Form(...),
    apellido_usuario: str = Form(...),
    correo_usuario: str = Form(...),
    contrasena_usuario: str = Form(...),
    foto_usuario: UploadFile = None,
    db: Session = Depends(get_db)
):
    # Validar que no exista el correo
    existing_user = db.query(Usuario).filter(Usuario.correo == correo_usuario).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    hashed_password = encriptar_contrasena(contrasena_usuario)

    # Guardar foto si existe
    foto_filename = None
    if foto_usuario:
        foto_filename = f"{correo_usuario}.{foto_usuario.filename.split('.')[-1]}"
        file_path = f"static/fotos/{foto_filename}"
        with open(file_path, "wb") as f:
            content = await foto_usuario.read()
            f.write(content)

    nuevo_usuario = Usuario(
        nombre=nombre_usuario,
        apellido=apellido_usuario,
        correo=correo_usuario,
        contrasena=hashed_password,
        rol_id=1,  # Rol por defecto: lector
        foto=foto_filename
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"usuario_id": nuevo_usuario.id, "mensaje": "Usuario registrado correctamente"}
