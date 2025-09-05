import { Link } from "react-router-dom";
import "./perfil.css"


const Perfil: React.FC = () => {
  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <img src="https://i.pravatar.cc/100" alt="logo" />
          <Link to="/">
          <span className="logo-text">SN-52</span>
          </Link>
        </div>
        <nav>
          <Link to="/register" className="nav-btn">
            Registrarse
          </Link>
          <Link to="/login" className="nav-btn">
            Iniciar Sesión
          </Link>
        </nav>
      </header>

     <img alt="decoración 1" className="decoracion decoracion-left" />
     <img alt="decoración 2" className="decoracion decoracion-right" />
     <img alt="decoración 3" className="decoracion decoracion-bottom" />


      {/* PERFIL */}
      <section className="profile">
        <div className="profile-img">
          <img src="https://i.pravatar.cc/200" alt="perfil" />
        </div>
        <button className="btn-change">Cambiar Foto</button>
      </section>

      {/* FORMULARIO */}
      <section className="contact">
        <form>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" placeholder="Nombre" required />

          <label htmlFor="apellidos">Apellidos</label>
          <input id="apellidos" type="text" placeholder="Apellidos" required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Email" required />

          <button type="submit" className="form-btn">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default Perfil;