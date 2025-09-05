import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home";
import Login from "./paginas/login/login";
import Registro from "./paginas/register/register";
import RecuperarContraseña from "./paginas/rec_contra/rec_contra";
import Perfil from "./paginas/Perfil/perfil";
import CrearArt from "./paginas/crearArt/CrearArt";
import Deportes from "./paginas/Deportes/deportes";
import Layout from "./paginas/Layout/layout";
import 'antd/dist/reset.css';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registro />} />
        <Route path="rec_contra" element={<RecuperarContraseña />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="crear-articulo" element={<CrearArt />} />
        <Route path="deportes" element={<Deportes />} />
      </Route>
    </Routes>
  );
}