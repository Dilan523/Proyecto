import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const iconosRedes = {
    logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  };

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  const location = useLocation();

// Rutas donde quieres ocultar header y navbar
  const rutasSinHeader = ["/login", "/register"];
  const ocultarHeader = rutasSinHeader.includes(location.pathname);


  return (
  <>
    {!ocultarHeader && (
      <header>
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src={iconosRedes.logo} alt="Perfil" />
            <span>SN-52</span>
          </div>

          <div className="navbar-actions">
            <Link to="/register">
              <button className="btn">REGISTRARSE</button>
            </Link>
            <Link to="/login">
              <button className="btn">INICIAR SESIÓN</button>
            </Link>

            <button
              className="menu-toggle"
              aria-label="Abrir menú"
              onClick={alternarMenu}
            >
              ☰
            </button>
          </div>
        </div>
        <nav className={`navbar-bottom ${menuAbierto ? "show" : ""}`}>
          <Link to="/deportes">DEPORTES</Link>
          <Link to="/artes">ARTE</Link>
          <Link to="/cultura">CULTURA</Link>
          <Link to="/bienestar">BIENESTAR</Link>
          <Link to="/reportes">REPORTES</Link>
        </nav>
      </header>
    )}

    {/* Aquí se renderizan las páginas */}
    <main>
      <Outlet />
    </main>
  </>
);
};

export default Layout;