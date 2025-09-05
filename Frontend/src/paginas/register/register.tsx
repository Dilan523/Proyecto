import { Link } from "react-router-dom";
import "./register.css";

export default function Registro() {
  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img src="../../public/ftopf.jpg" alt="Foto de perfil" className="profile-pic" />
            <Link to="/">
          <span className="logo-text">SN-52</span>
            </Link>
        </div>

        <div className="header-buttons">
          {/* Ya estás en Registro, así que este botón puede ser solo decorativo */}
          <button className="btn">REGISTRARSE</button>

          {/* Enlace al Login */}
          <Link to="/login">
            <button className="btn" id="btnInicio">INICIAR SESIÓN</button>
          </Link>
        </div>
      </header>

      <h1 className="titulo">FORMULARIO DE REGISTRO</h1>

      <main className="main-content">
        <img src="/img/s1.png" alt="Decoración" className="decor decor-left" />

        <form className="formulario">
          {/* Imagen central */}
          <div className="form-profile-pic-container">
            <img src="/img/users.png" alt="Foto de perfil" className="form-profile-pic" />
            <button type="button" className="btn-cambiar-foto">
              ELEGIR FOTO DE PERFIL
            </button>
          </div>

          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />

          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" name="apellido" placeholder="Apellido" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" required />

          <button type="submit" className="btn-enviar">Enviar</button>
        </form>

        <img src="/img/s2.png" alt="Decoración" className="decor decor-right" />
      </main>
    </div>
  );
}
