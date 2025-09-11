import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s5 from "../../assets/Img/s5.png";
import "./rec_contra.css";

export default function RecuperarContraseña() {
  return (
    <div className="page">
      {/* Título */}
      <h1 className="title">Recuperar Contraseña</h1>
      {/* Contenedor principal */}
      <div className="form-container">
        {/* Adornos en cada esquina */}
        <img src={s1} alt="Adorno superior izquierdo" className="adorno adorno-top-left" />
        <img src={s2} alt="Adorno superior derecho" className="adorno adorno-top-right" />
        <img src={s5} alt="Adorno inferior izquierdo" className="adorno adorno-bottom-left" />
        <img src={s5} alt="Adorno inferior derecho" className="adorno adorno-bottom-right" />

        {/* Formulario */}
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="example@domain.com" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="********" />

          <button className="log" type="submit">
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
