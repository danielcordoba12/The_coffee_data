import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";
import Swal from 'sweetalert2';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    apellido: '',
    telefono: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    photo: ''
  });
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  // Función para cargar los datos del usuario al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Lógica para obtener los datos del usuario desde el servidor
      // Simulación de datos de usuario
      const userData = {
        displayName: 'Daniel  ',
        apellido: 'Cordoba',
        telefono: '3123123',
        email: 'dcordobaruizv@gmail.com',
        photo: 'url_de_la_foto' // La URL de la foto del usuario
      };
      setUserInfo(userData);
    } else {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      navigate('/');
    }
  }, [navigate]);

  const handleNavigate = () => navigate('/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleNavigate();
    console.log("Cerrando sesión...");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo({
        ...userInfo,
        photo: URL.createObjectURL(file)
      });
    }
  };

  const handleSaveInfo = () => {
    if (!userInfo.displayName || !userInfo.apellido || !userInfo.telefono || !userInfo.email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Lógica para enviar los datos actualizados del usuario al servidor
    console.log("Guardando información del usuario:", userInfo);
    // Simulación de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Datos actualizados!',
      text: 'Los datos del usuario se han actualizado correctamente.',
    });
    setEditingInfo(false);
  };

  const handleSavePassword = () => {
    if (!userInfo.newPassword || !userInfo.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa ambos campos de contraseña.',
      });
      return;
    }

    // Lógica para enviar la nueva contraseña al servidor
    console.log("Guardando nueva contraseña:", userInfo.newPassword);
    // Simulación de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Contraseña actualizada!',
      text: 'La contraseña se ha actualizado correctamente.',
    });
    setEditingPassword(false);
  };

  return (
    <section className="vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="mb-3">
                {userInfo.photo ? (
                  <img src={userInfo.photo} alt="Perfil" className="rounded-circle profile-picture" />
                ) : (
                  <div className="upload-icon">
                    <label htmlFor="photo-upload" className="upload-label">
                      <i className="fas fa-camera"></i>
                    </label>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              <h2 className="card-title mb-0">Perfil de Usuario</h2>
              <p className="text-muted">{userInfo.rol}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.displayName}
                onChange={(e) => setUserInfo({ ...userInfo, displayName: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.apellido}
                onChange={(e) => setUserInfo({ ...userInfo, apellido: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control form-empty"
                value={userInfo.telefono}
                onChange={(e) => setUserInfo({ ...userInfo, telefono: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control form-empty"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            {editingPassword && (
              <>
                <div className="mb-3">
                  <label className="form-label">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-empty"
                    value={userInfo.newPassword}
                    onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-empty"
                    value={userInfo.confirmPassword}
                    onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              {editingInfo ? (
                <button className="btn btn-primary me-2" onClick={handleSaveInfo}>
                  Guardar Información
                </button>
              ) : (
                <button className="btn btn-outline-primary me-2" onClick={() => setEditingInfo(true)}>
                  Editar Información
                </button>
              )}
              {editingPassword ? (
                <button className="btn btn-primary me-2" onClick={handleSavePassword}>
                  Guardar Contraseña
                </button>
              ) : (
                <button className="btn btn-outline-primary me-2" onClick={() => setEditingPassword(true)}>
                  Cambiar Contraseña
                </button>
              )}
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

export default UserProfile;
