import { useState } from "react";
import "./perfil.css";
import perfilDefault from "../../assets/Img/perfil.jpg";
import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s3 from "../../assets/Img/S3.png";

const Perfil: React.FC = () => {
  const [foto, setFoto] = useState<string | null>(perfilDefault);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      {/* Contenedor principal */}
      <div className="perfil-container">
        <div className="perfil-header">
          <h2 className="titulo">Perfil de Usuario</h2>
          <p>Actualiza tu foto de perfil y detalles personales.</p>
        </div>

        <div className="perfil-content">
          {/* Foto dinámica */}
          <div className="foto-container">
            <label htmlFor="fotoInput" className="upload-box">
              {foto ? (
                <img src={foto} alt="perfil" className="perfil" />
              ) : (
                <div className="placeholder">
                  <span className="icono">📷</span>
                </div>
              )}
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

          {/* Formulario */}
          <section className="formulario">
            <form>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" placeholder="Usuario" required />

              <label htmlFor="apellidos">Apellidos</label>
              <input id="apellidos" type="text" placeholder="Ejemplo" required />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="usuario@ejemplo.com" required />

              <button type="submit" className="form-btn">
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>
            {/* decoraciones */}
      <img src={s1} alt="Decoración" className="decor-left" />
      <img src={s2} alt="decoración 2" className="decor-right" />
      <img src={s3} alt="decoración 3" className="decor-bottom" />
    </div>
  );
};

export default Perfil;
