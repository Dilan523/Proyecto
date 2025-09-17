// src/Layout/PublicLayout.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./layout.css";
import perfilDefault from "../assets/Img/perfil.jpg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function PublicLayout() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="public-layout">
      <header>
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/perfil">
              <img
                src={user?.foto || perfilDefault}
                alt="Perfil"
                className="navbar-perfil"
              />
            </Link>
            <Link to="/">
              <span>SN-52</span>
            </Link>
          </div>
          <div className="navbar-actions">
            {user ? (
              <button onClick={handleLogout} className="btn">
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="btn">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn">
                  Registrarse
                </Link>
              </>
            )}
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
