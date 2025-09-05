import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      {/* Header */}
      <header className="header">
        <div className="profile">
          <img src="../../public/ftopf.jpg" alt="Perfil" className="profile-img" />
            <Link to="/">
          <span className="profile-name">SN-52</span>
            </Link>
        </div>
        <div className="header-buttons">
            <Link to="/register">
          <button className="btn" id="btnRegistro">REGISTRARSE</button>
            </Link>
          <button className="btn">INICIAR SESIÓN</button>
        </div>
      </header>

      {/* Main */}
      <main>
        <h1 className="main-title">INICIO SESIÓN</h1>
        <div className="login-box">
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
            <Link to="/rec_contra">
            <a href="/rec_contraseña/contraseña.html" className="forgot-link">RECUPERAR CONTRASEÑA</a>
            </Link>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* Imágenes decorativas */}
        <img src="../assets/Img/S1.png" alt="Decoración" className="decor-left" />
        <img src="../assets/Img/S2.png" alt="Decoración" className="decor-right" />
      </main>
    </div>
  );
}
