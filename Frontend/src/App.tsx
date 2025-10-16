import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home";
import Login from "./paginas/login/login";
import Registro from "./paginas/register/register";
import RecuperarContraseña from "./paginas/rec_contra/rec_contra";
import Perfil from "./paginas/Perfil/perfil";
import CrearArt from "./paginas/crearArt/CrearArt";
import Deportes from "./paginas/Deportes/deportes";
import Cultura from "./paginas/Cultura/Cultura"
import Artes from "./paginas/Artes/Artes"
import Bienestar from "./paginas/Bienestar/Bienestar"
import PublicLayout from "./Layout/PublicLayout";
import AuthLayout from "./Layout/AuthLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="deportes" element={<Deportes />} />
        <Route path="arte" element={<Artes />} />
        <Route path="cultura" element={<Cultura />} />
        <Route path="bienestar" element={<Bienestar />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registro />} />
        <Route path="rec_contra" element={<RecuperarContraseña />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="crearArt" element={<CrearArt />} />
      </Route>
    </Routes>
  );
}
