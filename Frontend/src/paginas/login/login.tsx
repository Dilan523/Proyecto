// src/paginas/login/login.tsx
import "./login.css";
import s1 from "../../assets/Img/S1.png";
import s5 from "../../assets/Img/s5.png";
import s4 from "../../assets/Img/s4.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="page-login">
      <div className="login-wrap">
        {/* título arriba */}
        <header className="login-header">
          <h1 className="login-title">INICIO SESIÓN</h1>
        </header>

        {/* fila: imagen izquierda | formulario | imagen derecha */}
        <section className="login-row">
          <div className="decor-column left">
            <img src={s5} alt="" className="decor-img decor-img-1" />
            <img src={s4} alt="" className="decor-img decor-img-1" />
          </div>

          <div className="login-box">
            <form className="login-form">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" required />

              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" required />

              <Link to="/rec_contra" className="forgot-link">
                RECUPERAR CONTRASEÑA
              </Link>

              <button type="submit" className="login-btn">
                Acceso
              </button>
            </form>
          </div>

          <div className="decor-column right">
            <img src={s1} alt="" className="decor-img decor-img-3" />
          </div>
        </section>
      </div>
    </div>
  );
}
