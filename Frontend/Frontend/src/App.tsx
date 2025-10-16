import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home";
import Login from "./paginas/login/login";
import Registro from "./paginas/register/register";
import RecuperarContraseña from "./paginas/rec_contra/rec_contra";
import Perfil from "./paginas/Perfil/perfil";
import CrearArt from "./paginas/crearArt/CrearArt";
import Deportes from "./paginas/Deportes/deportes";
import Cultura from "./paginas/Cultura/cultura";
import Artes from "./paginas/Artes/Artes"
import PublicLayout from "./Layout/PublicLayout";
import AuthLayout from "./Layout/AuthLayout";
import { AlertProvider } from "./context/AlertContext";
import Alert from "./components/Alert";

export default function App() {
  return (
    <AlertProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="deportes" element={<Deportes />} />
          <Route path="arte" element={<Artes />} />
          <Route path="cultura" element={<Cultura />} />
          <Route path="bienestar" element={<h1>Bienestar</h1>} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registro />} />
          <Route path="rec_contra" element={<RecuperarContraseña />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="crearArt" element={<CrearArt />} />
        </Route>
      </Routes>
      <Alert />
    </AlertProvider>
  );
}
