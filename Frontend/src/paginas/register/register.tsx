import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Camera, Upload, Eye, EyeOff, Lock } from "lucide-react";
import "./register.css";
import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s4 from "../../assets/Img/S4.png";
import s5 from "../../assets/Img/S5.png";

// API call con fetch
const apiRegister = async (formData: FormData) => {
  const res = await fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(errorData.message || "Error en el registro");
  }

  return res.json();
};

interface ProfilePictureProps {
  profileImage: string | null;
  onImageClick: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profileImage, onImageClick }) => (
  <div className="form-profile-pic-container">
    <div className="profile-pic-wrapper" onClick={onImageClick}>
      {profileImage ? (
        <img src={profileImage} alt="Foto de perfil" className="form-profile-pic" />
      ) : (
        <div className="profile-pic-placeholder">
          <Camera size={32} color="#66d1cd" />
        </div>
      )}
      <div className="profile-pic-overlay">
        <Upload size={16} />
      </div>
    </div>
    <button type="button" className="btn-cambiar-foto" onClick={onImageClick}>
      <Camera size={16} /> Elegir Foto de Perfil
    </button>
  </div>
);

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label, icon, type, id, name, value, onChange,
  placeholder, error, showPassword, onTogglePassword
}) => (
  <div className="form-group">
    <label htmlFor={id}>{icon} {label}</label>
    {type === 'password' ? (
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "error" : ""}
          required
        />
        <button type="button" className="password-toggle" onClick={onTogglePassword}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "error" : ""}
        required
      />
    )}
    {error && <span className="error-message">{error}</span>}
  </div>
);

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", correo: "", contrasena: "", confirmContrasena: ""
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageClick = () => fileInputRef.current?.click();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) return alert("Máximo 5MB permitido");
      if (!file.type.startsWith('image/')) return alert("Archivo no válido");
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) newErrors.correo = "El email es requerido";
    else if (!emailRegex.test(formData.correo)) newErrors.correo = "Ingresa un email válido";
    if (!formData.contrasena) newErrors.contrasena = "La contraseña es requerida";
    else if (formData.contrasena.length < 6) newErrors.contrasena = "Mínimo 6 caracteres";
    if (!formData.confirmContrasena) newErrors.confirmContrasena = "Confirma tu contraseña";
    else if (formData.contrasena !== formData.confirmContrasena) newErrors.confirmContrasena = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("nombre_usuario", formData.nombre);
      formPayload.append("apellido_usuario", formData.apellido);
      formPayload.append("correo_usuario", formData.correo);
      formPayload.append("contrasena_usuario", formData.contrasena);
      formPayload.append("rol_id", "1");
      if (imageFile) formPayload.append("foto_usuario", imageFile);

      const data = await apiRegister(formPayload);

      alert(`¡Registro exitoso! Usuario ID: ${data.usuario_id}`);
      setFormData({ nombre: "", apellido: "", correo: "", contrasena: "", confirmContrasena: "" });
      setProfileImage(null);
      setImageFile(null);
      setErrors({});
    } catch (error: any) {
      console.error(error);
      setErrors(prev => ({ ...prev, form: error.message || "Error desconocido" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img src={s4} alt="Decoración" className="decor dere-arriba" />
      <img src={s1} alt="Decoración" className="decor decor-left" />
      <h1 className="titulo">FORMULARIO DE REGISTRO</h1>
      <div className="formulario-container">
        <form className="formulario" onSubmit={handleSubmit}>
          <ProfilePicture profileImage={profileImage} onImageClick={handleImageClick} />
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />

          <div className="form-grid">
            <FormField label="Nombre *" icon={<User size={16}/>} type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Ingresa tu nombre" error={errors.nombre} />
            <FormField label="Apellido *" icon={<User size={16}/>} type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Ingresa tu apellido" error={errors.apellido} />
          </div>

          <FormField label="Correo Electrónico *" icon={<Mail size={16}/>} type="email" id="correo" name="correo" value={formData.correo} onChange={handleInputChange} placeholder="ejemplo@correo.com" error={errors.correo} />

          <FormField label="Contraseña *" icon={<Lock size={16}/>} type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleInputChange} placeholder="Mínimo 6 caracteres" error={errors.contrasena} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />

          <FormField label="Confirmar Contraseña *" icon={<Lock size={16}/>} type="password" id="confirmContrasena" name="confirmContrasena" value={formData.confirmContrasena} onChange={handleInputChange} placeholder="Repite tu contraseña" error={errors.confirmContrasena} showPassword={showConfirmPassword} onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />

          {errors.form && <div className="form-error">{errors.form}</div>}

          <div className="form-footer">
            <button type="submit" className="btn-enviar" disabled={isLoading}>
              {isLoading ? (<><div className="spinner"></div> Registrando...</>) : "Crear Cuenta"}
            </button>
            <p className="login-link">¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          </div>
        </form>
      </div>
      <img src={s2} alt="Decoración" className="decor decor-right" />
      <img src={s5} alt="Decoración" className="decor decor-arriba" />
    </div>
  );
};

export default Registro;
