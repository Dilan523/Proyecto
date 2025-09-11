import "./login.css";
import s1 from "../../assets/Img/S1.png";
import s5 from "../../assets/Img/s5.png";
import s4 from "../../assets/Img/s4.png";
import s3 from "../../assets/Img/S3.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-page-container">
      {/* Caja del login */}
      <div className="login-content">
        <div className="login-card">
            <h1 className="login-title">Inicio de Sesión</h1>
            <p className="login-subtitle">
              Ingresa tus credenciales para acceder
            </p>

          <form className="login-form">
            {/* Correo */}
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              required
            />

            {/* Contraseña */}
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
            />

            {/* Recuperar */}
            <div className="forgot-container">
              <Link to="/rec_contra" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón */}
            <button type="submit" className="login-btn">
              Acceso
            </button>

            {/* Registro */}
            <p className="register-text">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="register-link">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
      <img src={s1} alt="Decoraciones" className="decor-rigth" />
      <img src={s3} alt="Decoraciones" className="decor-arriba" />
      <img src={s5} alt="Decoraciones" className="dere-arriba" />
      <img src={s4} alt="Decoraciones" className="decor-left" />
    </div>
  );
}
