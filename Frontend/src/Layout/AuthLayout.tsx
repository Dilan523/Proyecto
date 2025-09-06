// src/paginas/Layout/AuthLayout.tsx
import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import perfil from "/Users/dilan/SN-52/Frontend/src/assets/Img/perfil.jpg"

export default function AuthLayout() {
  return (
    <div className="auth-layout">
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
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
