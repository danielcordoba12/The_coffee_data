import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";
import "../style/lotes.css";


const Listarlote = () => {
  const [lotes, setLotes] = useState([]);
  const [selectedLoteId, setSelectedLoteId] = useState(null);
  const [modalLote, setModalLote] = useState(null);

  useEffect(() => {
    const buscarLotes = async () => {
      try {
        const response = await Api.get("lote/listar");
        setLotes(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    buscarLotes();
  }, []);

  const openModal = async (loteId) => {
    setSelectedLoteId(loteId);
    try {
      const response = await Api.get(`/lote/buscar/${loteId}`);
      setModalLote(response.data);
    } catch (error) {
      console.error('Error buscando el Lote', error);
    }
  };

  const closeModal = () => {
    setSelectedLoteId(null);
    setModalLote(null);
  };

  const handleEditUser1 = async () => {
    try {
      await Api.put(`/lote/actualizar/${selectedLoteId}`, modalLote);
      closeModal();
      // Recargar la lista de lotes después de la actualización
      const response = await Api.get("lote/listar");
      setLotes(response.data);
    } catch (error) {
      console.error("Error editando el Lote: ", error);
    }
  };

  const handleEditUser2 = async () => {
    try {
      await Api.patch(`/lote/desactivar/${selectedLoteId}`, modalLote);
      closeModal();
      // Recargar la lista de lotes después de la desactivación
      const response = await Api.get("lote/listar");
      setLotes(response.data);
    } catch (error) {
      console.error("Error desactivando el Lote: ", error);
    }
  };

  const handleEditUser3 = async () => {
    try {
      await Api.patch(`/lote/activar/${selectedLoteId}`, modalLote);
      closeModal();
      // Recargar la lista de lotes después de la activación
      const response = await Api.get("lote/listar");
      setLotes(response.data);
    } catch (error) {
      console.error("Error activando el Lote: ", error);
    }
  };

  return (
    <>
    <Link to="/lote/registrar" className="btn-registrar-lote">
          Registrar Lote
        </Link>
      <img src="../../public/img/fondo.png" alt="" className="fondo2" />
      <div className="tablalistar">
        <h1 className="titu"> Listado de Lotes</h1>
        <table className="tableprincipal">
          <thead>
            <tr className="bg-gray-200">
              <th>id</th>
              <th>Fecha Creación</th>
              <th>Nombre</th>
              <th>Longitud</th>
              <th>Latitud</th>
              <th>Finca</th>
              <th>Estado</th>
              <th>opciones</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((task) => (
              <tr key={task.id} className="border-t">
                <td>{task.id}</td>
                <td>{task.fecha_creacion}</td>
                <td>{task.nombre}</td>
                <td>{task.longitud}</td>
                <td>{task.latitud}</td>
                <td>{task.Nombre_Finca}</td>
                <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => openModal(task.id)}
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      {modalLote && (
        <div className="tabla3">
        <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
        <div className="max-w-xs">
            <input
                className="input-field" type="date" placeholder="fecha_creacion" value={modalLote.fecha_creacion} onChange={(e) => setModalLote({ ...modalLote, fecha_creacion: e.target.value })}
            />
            <input
                className="input-field"
                type="text"
                placeholder="nombre"
                value={modalLote.nombre}
                onChange={(e) => setModalLote({ ...modalLote, nombre: e.target.value })}
            />
            <input
                className="input-field"
                type="text"
                placeholder="longitud"
                value={modalLote.longitud}
                onChange={(e) => setModalLote({ ...modalLote, longitud: e.target.value })}
            />
            <input
                className="input-field"
                type="text"
                placeholder="latitud"
                value={modalLote.latitud}
                onChange={(e) => setModalLote({ ...modalLote, latitud: e.target.value })}
            />
            <input
                className="input-field"
                type="number"
                placeholder="fincas_id"
                value={modalLote.fincas_id}
                onChange={(e) => setModalLote({ ...modalLote, fincas_id: e.target.value })}
            />
            <button
            className="btn-primary"
            onClick={handleEditUser1}
          >
            Actualizar
          </button>
          {modalLote.estado === 1 ? (
            <button
              className="btn-secondary"
              onClick={handleEditUser2}
            >
              Desactivar
            </button>
          ) : (
            <button
              className="btn-tertiary"
              onClick={handleEditUser3}
            >
              Activar
            </button>
          )}
        </div>
    </div>
      )}
    </>
  );
};

export default Listarlote