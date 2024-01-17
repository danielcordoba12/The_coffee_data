// FincaView.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";
import "../style/fincas.css";

const FincaView = () => {
    const [fincas, setFincas] = useState([]);
    const [selectedFincaId, setSelectedFincaId] = useState(null);
    const [modalFinca, setModalFinca] = useState(null);

    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get("finca/listar");
                setFincas(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        buscarFincas();
    }, []);

    const openModal = async (fincaId) => {
        setSelectedFincaId(fincaId);
        try {
            const response = await Api.get(`/finca/buscar/${fincaId}`);
            setModalFinca(response.data[0]);
        } catch (error) {
            console.error('Error buscando el Finca', error);
        }
    };

    const closeModal = () => {
        setSelectedFincaId(null);
        setModalFinca(null);
    };

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/finca/actualizar/${selectedFincaId}`, modalFinca);
            closeModal();
            // Recargar la lista de fincas después de la actualización
            const response = await Api.get("finca/listar");
            setFincas(response.data);
        } catch (error) {
            console.error("Error editando el Finca: ", error);
        }
    };

    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/finca/desactivar/${selectedFincaId}`, modalFinca);
            closeModal();
            // Recargar la lista de fincas después de la desactivación
            const response = await Api.get("finca/listar");
            setFincas(response.data);
        } catch (error) {
            console.error("Error desactivando el Finca: ", error);
        }
    };

    const handleEditUser3 = async () => {
        try {
            await Api.patch(`/finca/activar/${selectedFincaId}`, modalFinca);
            closeModal();
            // Recargar la lista de fincas después de la activación
            const response = await Api.get("finca/listar");
            setFincas(response.data);
        } catch (error) {
            console.error("Error activando el Finca: ", error);
        }
    };

    return (
        <>
            {modalFinca && <div className="overlay"></div>}
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu"> Listado de Fincas</h1>
                {/* Botón para registrar finca */}
                <Link to="/finca/registrar" className="btn-registrar">
                    Registrar Finca
                </Link>
                <table className="tableprincipal">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>id</th>
                            <th>Fecha Creación</th>
                            <th>Nombre</th>
                            <th>Longitud</th>
                            <th>Latitud</th>
                            <th>usuario</th>
                            <th>municipio</th>
                            <th>Estado</th>
                            <th>Nombre Vereda</th>
                            <th>opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fincas.map((task) => (
                            <tr key={task.id} className="border-t">
                                <td>{task.id}</td>
                                <td>{task.fecha_creacion}</td>
                                <td>{task.nombre}</td>
                                <td>{task.longitud}</td>
                                <td>{task.latitud}</td>
                                <td>{task.nombre_usuario}</td>
                                <td>{task.nombre_municipio}</td>
                                <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                <td>{task.noombre_vereda}</td>
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


            {modalFinca && (

                <div className="tabla3">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Finca</h1>
                    <div className="max-w-xs">
                        <input
                            className="input-field"
                            type="date"
                            placeholder="fecha_creacion"
                            value={modalFinca.fecha_creacion}
                            onChange={(e) => setModalFinca({ ...modalFinca, fecha_creacion: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="nombre"
                            value={modalFinca.nombre}
                            onChange={(e) => setModalFinca({ ...modalFinca, nombre: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="longitud"
                            value={modalFinca.longitud}
                            onChange={(e) => setModalFinca({ ...modalFinca, longitud: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="latitud"
                            value={modalFinca.latitud}
                            onChange={(e) => setModalFinca({ ...modalFinca, latitud: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="number"
                            placeholder="usuarios_id"
                            value={modalFinca.usuarios_id}
                            onChange={(e) => setModalFinca({ ...modalFinca, usuarios_id: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="number"
                            placeholder="municipios_id"
                            value={modalFinca.municipios_id}
                            onChange={(e) => setModalFinca({ ...modalFinca, municipios_id: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="noombre_vereda"
                            value={modalFinca.noombre_vereda}
                            onChange={(e) => setModalFinca({ ...modalFinca, noombre_vereda: e.target.value })}
                        />
                        <button
                            className="btn-primary"
                            onClick={handleEditUser1}
                        >
                            Actualizar
                        </button>
                        {modalFinca.estado === 1 ? (
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
        </>
    );
};

export default FincaView;
