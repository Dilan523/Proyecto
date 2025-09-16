// src/layouts/PublicLayout.tsx
import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import perfil from "../assets/Img/perfil.jpg"

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <header>
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/perfil">
            <img src={perfil} alt="Logo" />
            </Link>
            <Link to="/">
            <span>SN-52</span>
            </Link>
          </div>
          <div className="navbar-actions">
            <Link to="/login" className="btn">Iniciar Sesión</Link>
            <Link to="/register" className="btn">Registrarse</Link>
          </div>
        </div>
        <div className="navbar-bottom">
          <Link to="/deportes">Deportes</Link>
          <Link to="/arte">Arte</Link>
          <Link to="/cultura">Cultura</Link>
          <Link to="/bienestar">Bienestar</Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
