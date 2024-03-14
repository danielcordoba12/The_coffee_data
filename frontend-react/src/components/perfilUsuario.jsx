import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";
import Swal from 'sweetalert2';

const UserProfile = (user) => {
  const [userInfo, setUserInfo] = useState({
    displayName: user.user.nombre,
    apellido: user.user.apellido,
    telefono: user.user.telefono,
    email: user.user.email,
    rol: user.user.rol,
    password: '',
    newPassword: '',
    confirmPassword: '',
    photo: null,
    additionalInfo: 'Información adicional del usuario'
  });

  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => navigate('/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleNavigate();
    console.log("Cerrando sesión...");
  };

  const handleSaveInfo = () => {
    console.log("Información guardada:", userInfo);
    setEditingInfo(false);
    Swal.fire({
      icon: 'success',
      title: '¡Información Guardada!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleSavePassword = () => {
    if (userInfo.newPassword === userInfo.confirmPassword) {
      const hashedPassword = bcrypt.hashSync(userInfo.newPassword, 10);
      console.log("Contraseña guardada:", hashedPassword);
      setEditingPassword(false);
      Swal.fire({
        icon: 'success',
        title: '¡Contraseña Guardada!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Las contraseñas no coinciden',
      });
    }
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
                className="form-control"
                value={userInfo.displayName}
                onChange={(e) => setUserInfo({ ...userInfo, displayName: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                value={userInfo.apellido}
                onChange={(e) => setUserInfo({ ...userInfo, apellido: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={userInfo.telefono}
                onChange={(e) => setUserInfo({ ...userInfo, telefono: e.target.value })}
                disabled={!editingInfo}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
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
                    className="form-control"
                    value={userInfo.newPassword}
                    onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
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
