// src/paginas/Perfil/perfil.tsx
import { useState, useEffect, useContext } from "react";
import "./perfil.css";
import perfilDefault from "../../assets/Img/perfil.jpg";
import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s3 from "../../assets/Img/S3.png";
import { UserContext } from "../../context/UserContext";

const Perfil: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [foto, setFoto] = useState<string>(user?.foto || perfilDefault);
  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellidos, setApellidos] = useState(user?.apellidos || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setFoto(user.foto || perfilDefault);
      setNombre(user.nombre);
      setApellidos(user.apellidos || "");
      setEmail(user.email);
    } else {
      setFoto(perfilDefault);
      setNombre("");
      setApellidos("");
      setEmail("");
    }
  }, [user]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const newFoto = reader.result as string;
        setFoto(newFoto);

        if (user) {
          const updatedUser = { ...user, foto: newFoto };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <div className="perfil-container">
        <div className="perfil-header">
          <h2 className="titulo">Perfil de {nombre || "Usuario"}</h2>
          <p>Actualiza tu foto de perfil y detalles personales.</p>
        </div>

        <div className="perfil-content">
          <div className="foto-container">
            <label htmlFor="fotoInput" className="upload-box">
              <img src={foto} alt="perfil" className="perfil" />
              <div className="hover-overlay">
                <span>📤 Subir</span>
              </div>
            </label>
            <input
              id="fotoInput"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ display: "none" }}
            />
            <p className="subtexto">Cambiar Foto</p>
          </div>

          <section className="formulario">
            <form>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" value={nombre} readOnly />

              <label htmlFor="apellidos">Apellidos</label>
              <input id="apellidos" type="text" value={apellidos} readOnly />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} readOnly />

              <button type="submit" className="form-btn">
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>

      <img src={s1} alt="Decoración" className="decor-left" />
      <img src={s2} alt="Decoración" className="decor-right" />
      <img src={s3} alt="Decoración" className="decor-bottom" />
    </div>
  );
};

export default Perfil;
