import { Link } from "react-router-dom";
import "./perfil.css"
import perfil from "/Users/dilan/SN-52/Frontend/src/assets/Img/perfil.jpg"
import s1 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S1.png"
import s2 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S2.png"
import s3 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S3.png"


const Perfil: React.FC = () => {
  return (
    <div className="app">    
    <img src={s1} alt="Decoración" className="decoracion decoracion-left" />
    <img src={s2} alt="decoración 2" className="decoracion decoracion-right" />
    <img src={s3} alt="decoración 3" className="decoracion decoracion-bottom" />


      {/* PERFIL */}
      <section className="profile">
        <div className="profile-img">
          <img src={perfil} alt="perfil" className="perfil" />
        </div>
        <button className="btn-change">Cambiar Foto</button>
      </section>

      {/* FORMULARIO */}
      <section className="contact">
        <form>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" placeholder="Nombre" required />

          <label htmlFor="apellidos">Apellidos</label>
          <input id="apellidos" type="text" placeholder="Apellidos" required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Email" required />

          <button type="submit" className="form-btn">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default Perfil;