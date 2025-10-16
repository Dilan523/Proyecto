from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CategoriaDTO(BaseModel):
    nombre: str
    fecha_creacion: Optional[datetime] = None
    estado: Optional[bool] = True