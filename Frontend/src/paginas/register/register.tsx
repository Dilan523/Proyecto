import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Camera, Upload, Eye, EyeOff, Lock } from "lucide-react";
import "./register.css";
import s1 from "../../assets/Img/S1.png";
import s2 from "../../assets/Img/S2.png";
import s5 from "../../assets/Img/S5.png";
import s4 from "../../assets/Img/S4.png";




interface RegistroProps {
  size?: 'small' | 'medium' | 'large';
}

interface ProfilePictureProps {
  profileImage: string | null;
  onImageClick: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profileImage, onImageClick }) => (
  <div className="form-profile-pic-container">
    <div className="profile-pic-wrapper" onClick={onImageClick}>
      {profileImage ? (
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="form-profile-pic"
        />
      ) : (
        <div className="profile-pic-placeholder">
          <Camera size={32} color="#66d1cd" />
        </div>
      )}
      <div className="profile-pic-overlay">
        <Upload size={16} />
      </div>
    </div>
    <button
      type="button"
      className="btn-cambiar-foto"
      onClick={onImageClick}
    >
      <Camera size={16} />
      Elegir Foto de Perfil
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
  label,
  icon,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  onTogglePassword
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {icon}
      {label}
    </label>
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
        <button
          type="button"
          className="password-toggle"
          onClick={onTogglePassword}
        >
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

const Registro: React.FC<RegistroProps> = ({ size = 'medium' }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy grande. Máximo 5MB permitido.");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Por favor selecciona un archivo de imagen válido.");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validate name
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    // Validate lastname
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Datos del registro:", {
        ...formData,
        profileImage: imageFile
      });
      
      alert("¡Registro exitoso! Bienvenido al periódico SN-52");
      
      // Reset form
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setProfileImage(null);
      setImageFile(null);
      
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error en el registro. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <div>
          <img src={s4} alt="Decoración" className="decor dere-arriba" />
          <img src={s1} alt="Decoración" className="decor decor-left" />
          <h1 className="titulo"> FORMULARIO DE REGISTRO</h1>
          <div className="formulario-container">
            <form className="formulario" onSubmit={handleSubmit}>
              {/* Profile Picture Section */}
              <ProfilePicture profileImage={profileImage} onImageClick={handleImageClick} />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {/* Form Fields */}
              <div className="form-grid">
                <FormField
                  label="Nombre *"
                  icon={<User size={16} />}
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu nombre"
                  error={errors.nombre}
                />

                <FormField
                  label="Apellido *"
                  icon={<User size={16} />}
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu apellido"
                  error={errors.apellido}
                />
              </div>

              <FormField
                label="Correo Electrónico *"
                icon={<Mail size={16} />}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ejemplo@correo.com"
                error={errors.email}
              />

              <FormField
                label="Contraseña *"
                icon={<Lock size={16} />}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                error={errors.password}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <FormField
                label="Confirmar Contraseña *"
                icon={<Lock size={16} />}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Repite tu contraseña"
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <div className="form-footer">
                <button
                  type="submit"
                  className="btn-enviar"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Registrando...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </button>

                <p className="login-link">
                  ¿Ya tienes cuenta?
                  <Link to="/login"> Inicia sesión aquí</Link>
                </p>
              </div>
            </form>
          </div>
          <img src={s2} alt="Decoración" className="decor decor-right" />
          <img src={s5} alt="Decoración" className="decor decor-arriba" />
        </div>
  );
};

export default Registro;