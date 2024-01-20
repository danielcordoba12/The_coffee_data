import React, { useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/lotes.css";
import Sweet from "../helpers/Sweet";


const lote = () => {
  const [lotes, setLotes] = useState([]);
  const [selectedLoteId, setSelectedLoteId] = useState(null);
  const [modalLote, setModalLote] = useState(null);
  const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);


  const fecha_creacion = useRef();
  const nombre = useRef();
  const latitud = useRef();
  const longitud = useRef();
  const fincas_id = useRef();

  const navigate = useNavigate()

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
        Sweet.actualizacionExitosa();
        closeModal();
        // Recargar la lista de lotes después de la actualización
        const response = await Api.get("lote/listar");
        setLotes(response.data);
      } catch (error) {
        console.error("Error editando el Lote: ", error);
      }
  };

  const handleEditUser2 = async () => {
    const result = await Sweet.confimarDeshabilitar({
    });
    if (result.isConfirmed) {
    try {
      await Api.patch(`/lote/desactivar/${selectedLoteId}`, modalLote);
      closeModal();
      // Recargar la lista de lotes después de la desactivación
      const response = await Api.get("lote/listar");
      setLotes(response.data);
    } catch (error) {
      console.error("Error desactivando el Lote: ", error);
    }
  }
  };

  const handleEditUser3 = async () => {
    const result = await Sweet.confimarHabilitar({});
    if (result.isConfirmed) {
      try {
        await Api.patch(`/lote/activar/${selectedLoteId}`, modalLote);
        closeModal();
        // Recargar la lista de lotes después de la activación
        const response = await Api.get("lote/listar");
        setLotes(response.data);
      } catch (error) {
        console.error("Error activando el Lote: ", error);
      }
    }
  };

  const openRegistrarModal = () => {
    setRegistrarModalOpen(true);
  };

  const closeRegistrarModal = () => {
    setRegistrarModalOpen(false);
  };

  const handleRegistrar = async (data) => {
    const headers = {
      headers: {
        token: "xd",
      },
    };

    try {
      await Api.post("lote/registrar", data, headers);
      Sweet.registroExitoso();
      closeRegistrarModal();
      // Recargar la lista de fincas después del registro
      const response = await Api.get("lote/listar");
      setLotes(response.data);
    } catch (error) {
      console.error("Error al registrar el lote:", error);
    }
  };
  return (
    <>

      {modalLote && <div className="overlay" onClick={closeModal}></div>}
      {isRegistrarModalOpen && (
        <div className="overlay" onClick={closeRegistrarModal}></div>
      )}

      <img src="../../public/img/fondo.png" alt="" className="fondo2" />
      <div className="tablalistar">
        <h1 className="titu"> Listado de Lotes</h1>
        
        <button to="/lote/registrar" className="btn-registrar-lote" onClick={openRegistrarModal}>
          Registrar Lote
        </button>

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
            <button
              className="close-modal-btn"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {isRegistrarModalOpen && (
        <div className="overlay" onClick={closeRegistrarModal}></div>
      )}
      {isRegistrarModalOpen && (
        <div className="tabla2">
          <h1 className="text-center font-bold underline text-3xl p-3 m-2">
            Registrar Lote
          </h1>

          <form
            className="contenido-regi"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistrar({
                fecha_creacion: fecha_creacion.current.value,
                nombre: nombre.current.value,
                latitud: latitud.current.value,
                longitud: longitud.current.value,
                fincas_id: fincas_id.current.value,
              });
            }}
            method="post"
          >

            <div className="div-input">
              <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />

            </div>

            <div className="div-input">
              <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
              <label for="nombre">Nombre</label>
            </div>
            <div className="div-input">
              <input type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
              <label for="latitud">Latitud</label>
            </div>
            <div className="div-input">
              <input type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
              <label for="longitud">Longitud</label>
            </div>
            <div className="div-input">
              <input type="number" id="fincas_id " name="fincas_id " ref={fincas_id} placeholder="" />
              <label for="fincas_id ">finca</label>
            </div>
            <button className="btn-register-lote"
              type="submit">Registrar lote</button>
            <button
              className="close-modal-btn"
              onClick={closeRegistrarModal}
            >
              Cerrar
            </button>
          </form>
        </div>
      )}


    </>
  );
};

export default lote