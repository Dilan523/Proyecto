import s1 from "../../assets/Img/S1.png";
import s4 from "../../assets/Img/s4.png";
import "./rec_contra.css";

export default function RecuperarContraseña() {
  return (
    <div className="page">
      {/* Título */}
      <h1 className="tittle">RECUPERAR CONTRASEÑA</h1>

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
