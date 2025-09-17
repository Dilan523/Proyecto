import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import type { User } from "../../context/UserContext";
import "./login.css";
import s1 from "../../assets/Img/S1.png";
import s5 from "../../assets/Img/s5.png";
import s4 from "../../assets/Img/S4.png";
import s3 from "../../assets/Img/S3.png";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Usamos FormData porque el backend usa Form(...)
    const formData = new FormData();
    formData.append("correo_usuario", correo);
    formData.append("contrasena_usuario", contrasena);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "Credenciales inválidas");
        return;
      }

      const data = await response.json();

      // Guardamos el usuario en contexto
      const usuarioBackend = data.usuario;
      const user: User = {
        id: usuarioBackend.id.toString(),
        nombre: usuarioBackend.nombre,
        apellidos: usuarioBackend.apellidos,
        email: usuarioBackend.correo,
        foto: usuarioBackend.foto,
        rol: usuarioBackend.rol_id === 1 ? "lector" : usuarioBackend.rol_id === 2 ? "editor" : "escritor",
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir según rol (opcional)
      if (user.rol === "lector") navigate("/");
      else if (user.rol === "editor") navigate("/home-editor");
      else navigate("/home-escritor");

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-content">
        <div className="login-card">
          <h1 className="login-title">Inicio de Sesión</h1>
          <p className="login-subtitle">
            Ingresa tus credenciales para acceder
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="login-btn">
              Acceso
            </button>

            <p className="register-text">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="register-link">
                Regístrate aquí
              </a>
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
