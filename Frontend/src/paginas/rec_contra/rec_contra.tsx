import { Link } from "react-router-dom";
import s1 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S1.png";
import s6 from "/Users/dilan/SN-52/Frontend/src/assets/Img/s6.png";
import fondo from "/Users/dilan/SN-52/Frontend/src/assets/Img/fondo.avif";
import "./rec_contra.css"; // tu archivo de estilos

export default function RecuperarContraseña() {
  return (
    <div>

      {/* Fondo */}
      <div
        className="background"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      {/* Título */}
      <h1 className="titulo">RECUPERAR CONTRASEÑA</h1>

      {/* Formulario */}
      <div className="form-container">
        {/* Adorno superior */}
        <img src={s1} alt="Adorno Superior" className="adorno adorno-top" />

        <form className="login-form">
          <label htmlFor="email">Email </label>
          <input type="email" id="email" placeholder="example@domain.com" />

          <label htmlFor="password">Password </label>
          <input type="password" id="password" placeholder="********" />

          <button className="log" type="submit">
            <span>Login</span>
          </button>
        </form>

        {/* Adorno inferior */}
        <img src={s6} alt="Adorno Inferior" className="adorno adorno-bottom" />
      </div>
    </div>
  );
}