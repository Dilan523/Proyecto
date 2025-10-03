import React, { useState, useEffect, useContext } from "react";
import "./perfil.css";
import perfilDefault from "../../assets/Img/perfil.jpg";
import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s3 from "../../assets/Img/S3.png";
import { UserContext } from "../../context/UserContextValue";

const Perfil: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [foto, setFoto] = useState<string>(perfilDefault);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setApellidos(user.apellidos || "");
      setEmail(user.email || "");
      if (user.foto) setFoto(`http://localhost:8000/uploads/${user.foto}`);
    }
  }, [user]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("nombre_usuario", nombre);
    formData.append("apellido_usuario", apellidos);
    formData.append("correo_usuario", email);
    if (fotoFile) formData.append("foto_usuario", fotoFile);

    try {
      const res = await fetch(`http://localhost:8000/auth/update/${user.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      const data = await res.json();

      // Actualizamos contexto y localStorage
      const updatedUser = {
        ...user,
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.correo,
        foto: data.foto,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Perfil actualizado con éxito ✅");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar perfil ❌");
    }
  };

  return (
    <div className="app">
      <div className="perfil-container">
        <div className="perfil-header">
          <h2 className="titulo">Perfil de Usuario</h2>
          <p>Actualiza tu foto de perfil y detalles personales.</p>
        </div>

        <div className="perfil-content">
          <div className="foto-container">
            <label htmlFor="fotoInput" className="upload-box">
              <img src={foto} alt="perfil" className="perfil" />
              <div className="hover-overlay"><span>📤 Subir</span></div>
            </label>
            <input
              id="fotoInput"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ display: "none" }}
            />
          </div>

          <section className="formulario">
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Usuario"
                required
              />

              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                value={apellidos}
                onChange={e => setApellidos(e.target.value)}
                placeholder="Ejemplo"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                required
              />

              <button type="submit" className="form-btn">
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>

      <img src={s1} alt="Decoración" className="perfil-decor-top-left" />
      <img src={s2} alt="decoración 2" className="perfil-decor-top-right" />
      <img src={s3} alt="decoración 3" className="perfil-decor-bottom-left" />
    </div>
  );
};

export default Perfil;
