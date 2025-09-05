import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulación de validación
    setTimeout(() => {
      if (!email || !password) {
        setError("Por favor, complete todos los campos");
      } else if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        // Aquí iría la lógica real de autenticación
        alert("¡Inicio de sesión exitoso!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>INICIO SESIÓN</h1>
          {error && <div className="error-message">¡Error! {error}</div>}
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="SN_52@SENA.com"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          
          <div className="login-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Continuar con conversaría
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Login"}
          </button>
        </form>
        
        <div className="login-footer">
          <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
          <a href="/olvide-contrasena">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;