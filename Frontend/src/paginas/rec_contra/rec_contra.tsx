import { Link } from "react-router-dom";
import s1 from "../../assets/Img/S1.png";
import s4 from "../../assets/Img/s4.png";
import fondo from "../../assets/Img/fondo.avif";
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
        <img src={s4} alt="Adorno Inferior" className="adorno adorno-bottom" />
      </div>
    </div>
  );
}