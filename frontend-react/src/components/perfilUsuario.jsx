import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo_electronico: '',
    user_password: '',
    confirmar_contrasena: '',
    tipo_documento: '',
    rol: '',
    cargo: '',
    numero_documentos: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const userData = {
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        telefono: decoded.telefono,
        correo_electronico: decoded.correo_electronico,
        tipo_documento: decoded.tipo_documento,
        rol: decoded.rol,
        cargo: decoded.cargo,
        numero_documentos: decoded.numero_documentos
      };
      setUserInfo(userData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNavigate = () => navigate('/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleNavigate();
    console.log("Cerrando sesión...");
  };

  const validateForm = () => {
    if (userInfo.nombre.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor ingresa un nombre.'
      });
      return false;
    }
    if (userInfo.apellido.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor ingresa un apellido.'
      });
      return false;
    }
    // Añade más validaciones para los otros campos aquí
    return true;
  };

  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  const handleSaveInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleNavigate('/');
        return;
      }
      if (!validateForm()) {
        return;
      }
      if (userInfo.user_password !== userInfo.confirmar_contrasena) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no coinciden.'
        });
        return;
      }

      // Encriptar la contraseña antes de guardarla
      const hashedPassword = await hashPassword(userInfo.user_password);
      const updatedUserInfo = { ...userInfo, user_password: hashedPassword, confirmar_contrasena: hashedPassword };

      const decoded = jwtDecode(token);
      const response = await Api.put(`/usuario/actualizar/${decoded.id}`, updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Datos actualizados!',
          text: 'Los datos del usuario se han actualizado correctamente.'
        }).then(() => {
          // Limpiar el token y redirigir al inicio
          localStorage.removeItem('token');
          handleNavigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un problema al actualizar los datos del usuario.'
        });
      }
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un problema al actualizar los datos del usuario.'
      });
    }
  };

  return (
    <section className="vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title mb-0">Perfil de Usuario</h2>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.nombre}
                onChange={(e) => setUserInfo({ ...userInfo, nombre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.apellido}
                onChange={(e) => setUserInfo({ ...userInfo, apellido: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.telefono}
                onChange={(e) => setUserInfo({ ...userInfo, telefono: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control form-empty"
                value={userInfo.correo_electronico}
                onChange={(e) => setUserInfo({ ...userInfo, correo_electronico: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de Documento</label>
              <input
                type="text"
                className="form-control"
                value={userInfo.tipo_documento}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <input
                type="text"
                className="form-control"
                value={userInfo.rol}
                readOnly
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label">Número de Documentos</label>
              <input
                type="text"
                className="form-control"
                value={userInfo.numero_documentos}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control form-empty"
                value={userInfo.user_password}
                onChange={(e) => setUserInfo({ ...userInfo, user_password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control form-empty"
                value={userInfo.confirmar_contrasena}
                onChange={(e) => setUserInfo({ ...userInfo, confirmar_contrasena: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary me-2" onClick={handleSaveInfo}>
                Guardar Información
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile
