import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('John Doe');
  const [editingName, setEditingName] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  }

  const handleLogout = () => {
      // Limpia el token de autenticación del almacenamiento local
      localStorage.removeItem('token');
      // Redirecciona al componente de inicio de sesión
      handleNavigate();
    console.log("Cerrar sesión...");
  };

  const handleSaveName = () => {
    // Aquí puedes agregar la lógica para guardar el nombre editado
    console.log("Nombre guardado:", displayName);
    setEditingName(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Perfil de Usuario</h2>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            {editingName ? (
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                />
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={handleSaveName}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <span>{displayName}</span>
                <button 
                  className="btn btn-link ms-2" 
                  onClick={() => setEditingName(true)}
                >
                  Editar
                </button>
              </div>
            )}
          </div>
          <button className="btn btn-primary me-2" onClick={() => { handleLogout();  }}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
