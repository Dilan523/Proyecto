import { Link } from "react-router-dom";
import { useEffect } from "react";
import perfil from "/Users/dilan/SN-52/Frontend/src/assets/Img/perfil.jpg";
import s1 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S1.png";
import s2 from "/Users/dilan/SN-52/Frontend/src/assets/Img/S2.png";
import "./register.css";

export default function Registro() {

  useEffect(() => {
    // Al entrar a la página, sube automáticamente al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Si quieres que baje hasta el formulario, usa:
    // const form = document.querySelector(".formulario");
    // form?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>

      <h1 className="titulo">FORMULARIO DE REGISTRO</h1>

      <main className="main-content">
        <img src={s1} alt="Decoración" className="decor decor-left" />

        <form className="formulario">
          <div className="form-profile-pic-container">
            <img src={perfil} alt="Foto de perfil" className="form-profile-pic" />
            <button type="button" className="btn-cambiar-foto">
              ELEGIR FOTO DE PERFIL
            </button>
          </div>

          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />

          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" name="apellido" placeholder="Apellido" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" required />

          <button type="submit" className="btn-enviar">Enviar</button>
        </form>

        <img src={s2} alt="Decoración" className="decor decor-right" />
      </main>
    </div>
  );
}