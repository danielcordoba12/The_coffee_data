import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    numero_documentos: '',
    telefono: '',
    correo_electronico: '',
    user_password: '',
    tipo_documento: '',
    rol: '',
    cargo: '',
    estado: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const response = await Api.get(`/usuario/buscarusuario/${id}`);
        setUsuario(response.data[0]);
      } catch (error) {
        console.error('Error en buscar ', error);
      }
    };
    buscarUsuario();
  }, [id]);

  const handleEditUsuario = async () => {
    try {
      await Api.put(`/usuario/actualizar/${id}`, usuario);
      navigate("/usuario/listar");
    } catch (error) {
      console.error('Error editando el usuario: ', error);
    }
  };

  const handleDesactivarUsuario = async () => {
    try {
      await Api.patch(`/usuario/desactivar/${id}`, usuario);
      navigate("/usuario/listar");
    } catch (error) {
      console.error('Error desactivando el usuario: ', error);
    }
  };

  const handleActivarUsuario = async () => {
    try {
      await Api.patch(`/usuario/activar/${id}`, usuario);
      navigate("/usuario/listar");
    } catch (error) {
      console.error('Error activando el usuario: ', error);
    }
  };

  const handleInputChange = (e, field) => {
    setUsuario({ ...usuario, [field]: e.target.value });
  };

  return (
    <>
      <img src="../../public/img/fondo.png" alt="" className="fondo2" />
      <div className="tabla3">
        <h1 className="text-center font-bold underline text-3xl p-3 m-2">
          Editar Usuario
        </h1>
        <div className="max-w-xs">
          <input
            className="input-field"
            type="text"
            placeholder="Nombre"
            value={usuario.nombre}
            onChange={(e) => handleInputChange(e, 'nombre')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Apellido"
            value={usuario.apellido}
            onChange={(e) => handleInputChange(e, 'apellido')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Número de Documento"
            value={usuario.numero_documentos}
            onChange={(e) => handleInputChange(e, 'numero_documentos')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Teléfono"
            value={usuario.telefono}
            onChange={(e) => handleInputChange(e, 'telefono')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Correo Electrónico"
            value={usuario.correo_electronico}
            onChange={(e) => handleInputChange(e, 'correo_electronico')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Contraseña"
            value={usuario.user_password}
            onChange={(e) => handleInputChange(e, 'user_password')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Tipo de Documento"
            value={usuario.tipo_documento}
            onChange={(e) => handleInputChange(e, 'tipo_documento')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Rol"
            value={usuario.rol}
            onChange={(e) => handleInputChange(e, 'rol')}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Cargo"
            value={usuario.cargo}
            onChange={(e) => handleInputChange(e, 'cargo')}
          />
          
          <button className="btn-primary" onClick={handleEditUsuario}>
            Actualizar
          </button>
          {usuario.estado === 1 ? (
            <button className="btn-secondary" onClick={handleDesactivarUsuario}>
              Desactivar
            </button>
          ) : (
            <button className="btn-tertiary" onClick={handleActivarUsuario}>
              Activar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EditarUsuario;
