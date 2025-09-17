from fastapi import APIRouter, Depends
from sqlalchemy.orm import session  
from models.categoria import Categoria
from dtos.categoria_dto import CategoriaDTO
from db.session import SessionLocal
#objeto que contiene este grupo de rutas
# obtener el objeto sesión de la base de datos
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
            db.close()

router = APIRouter( prefix="/categorias" )
#crear cada ruta 
@router.get('/')
def listar_categorias():
    return "Bienvenido a la API de Categorías"

#ruta parametrizada
@router.get('/{id}')
def listar_por_id(id: int):
    return f"Categoría con ID: {id}"

#ruta post
@router.post('/')
def crear_categoria(nueva_categoria: CategoriaDTO,
                    db: session = Depends(get_session)):
    nc = Categoria(
        nombre = nueva_categoria.nombre)
    db.add(nc)
    db.commit()
    db.refresh(nc)
    return nc

#ruta put
@router.put('/{id}')
def actualizar_categoria(id: int):
    return f"Categoría con ID: {id} actualizada con éxito"

#ruta delete
@router.delete('/{id}')
def eliminar_categoria(id: int):
    return f"Categoría con ID: {id} eliminada con éxito"