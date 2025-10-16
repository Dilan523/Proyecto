from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship


class Categoria(Base):
    __tablename__ = "categorias"
    id_categoria = Column(Integer,
                primary_key=True)
    fecha_creacion = Column(Date)
    estado = Column(Boolean)
    nombre = Column(String(60))
    
    #relacion uno a muchos

    noticias = relationship("Noticia", 
                    back_populates="categoria")
    
class Rol(Base):
    __tablename__ = "roles"
    id_rol = Column(Integer,
                primary_key=True)
    fecha_creacion = Column(Date)
    nombre = Column(String(60))

    # Relación inversa: un rol tiene muchos usuarios
    usuarios = relationship("Usuario", back_populates="rol")

    
class Noticia(Base):
    __tablename__ = "noticias"
    id_noticia = Column(Integer,
                primary_key=True)
    fecha_creacion = Column(Date)
    estado = Column(Boolean)
    titulo = Column(String(60))
    introduccion = Column(String(200))
    contenido = Column(String(2000))
    imagen = Column(String(200))
    
    categoria_id = Column(Integer, ForeignKey("categorias.id_categoria"))
    
    imagenes = relationship("Imagen", back_populates="noticia")  # plural y coincide
    comentarios = relationship("Comentario", back_populates="noticia")
    categoria = relationship("Categoria", back_populates="noticias")

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer,
                        primary_key=True)
    nombre_usuario = Column(String(60))
    apellido_usuario = Column(String(60))
    correo_usuario = Column(String(60))
    contrasena_usuario = Column(String(60))

    comentarios = relationship("Comentario", back_populates="usuario")
    #clave foranea
    rol_id = Column(Integer, 
                    ForeignKey("roles.id_rol"))
    # Relación con SQLAlchemy para acceso sencillo
    rol = relationship("Rol", back_populates="usuarios")

class Comentario(Base):
    __tablename__ = "comentarios"
    id_comentario = Column(Integer, primary_key=True)
    fecha_creacion = Column(Date)
    contenido = Column(String(200))
    
    usuario = relationship("Usuario", back_populates="comentarios")
    # Clave foránea
    noticia_id = Column(Integer,
                        ForeignKey("noticias.id_noticia"))
    # clave foránea
    usuario_id = Column(Integer,
                        ForeignKey("usuarios.id_usuario"))
    
    noticia = relationship("Noticia", back_populates="comentarios")
    
class Imagen(Base):
    __tablename__ = "imagenes"
    id_imagen = Column(Integer, primary_key=True)
    fecha_creacion = Column(Date)
    url = Column(String(200))
    tipo_archivo = Column(String(10))
    
    noticia_id = Column(Integer, ForeignKey("noticias.id_noticia"))  # clave foránea
    noticia = relationship("Noticia", back_populates="imagenes")