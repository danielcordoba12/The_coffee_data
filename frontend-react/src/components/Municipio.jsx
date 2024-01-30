import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import '../style/municipio.css';
import Sweet from "../helpers/Sweet";

const Municipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipioId, setSelectedMunicipioId] = useState(null);
    const [modalMunicipio, setModalMunicipio] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);

    const fecha_creacion = useRef();
    const nombre = useRef();
    const departamentos_id = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        buscarMunicipios();
    }, []);

    const openEditarModal = async (municipioId) => {
        setSelectedMunicipioId(municipioId);
        try {
            const response = await Api.get(`/municipio/buscar/${municipioId}`);
            setModalMunicipio(response.data);
        } catch (error) {
            console.error("Error buscando el municipio", error);
        }
    };

    const closeEditarModal = () => {
        setSelectedMunicipioId(null);
        setModalMunicipio(null);
    };

    const handleEditUser = async () => {
        try {
            await Api.put(`/municipio/Actualizar/${selectedMunicipioId}`, modalMunicipio);
            Sweet.actualizacionExitosa();
            closeEditarModal();

            const response = await Api.get("municipio/listar");
            setMunicipios(response.data);
        } catch (error) {
            console.error("Error editando el municipio: ", error);
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
            await Api.post("municipio/registrar", data, headers);
            Sweet.registroExitoso();
            closeRegistrarModal();
            const response = await Api.get("municipio/listar");
            setMunicipios(response.data);
        } catch (error) {
            console.error("Error al registrar el municipio:", error);
        }
    };

    return (
        <>
            {modalMunicipio && <div className="overlay" onClick={closeEditarModal}></div>}
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}

            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu"> Listado de Municipios</h1>
                <br />
                <button className="btn-registrar" onClick={openRegistrarModal}>
                    Registrar Municipio
                </button>
                <table className="tableprincipal">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>id</th>
                            <th>Fecha Creación</th>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {municipios.map((task) => (
                            <tr key={task.id} className="border-t">
                                <td>{task.id}</td>
                                <td>{task.fecha_creacion}</td>
                                <td>{task.nombre}</td>
                                <td>{task.nombre_departamento}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-primary"
                                        onClick={() => {
                                            openEditarModal(task.id);
                                            
                                        }}
                                    >
                                        Modificar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalMunicipio && (
                <div className="tabla3">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                        Editar Municipio
                    </h1>
                    <div className="max-w-xs">
                        <input
                            className="input-field"
                            type="date"
                            placeholder="fecha_creacion"
                            value={modalMunicipio.fecha_creacion}
                            onChange={(e) =>
                                setModalMunicipio({
                                    ...modalMunicipio,
                                    fecha_creacion: e.target.value,
                                })
                            }
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="nombre"
                            value={modalMunicipio.nombre}
                            onChange={(e) =>
                                setModalMunicipio({
                                    ...modalMunicipio,
                                    nombre: e.target.value
                                })
                            }
                        />

                        <input
                            className="input-field"
                            type="number"
                            placeholder="departamentos_id"
                            value={modalMunicipio.departamentos_id}
                            onChange={(e) =>
                                setModalMunicipio({
                                    ...modalMunicipio,
                                    departamentos_id: e.target.value,
                                })
                            }
                        />
                        <button
                            className="btn-primary"
                            onClick={handleEditUser}
                        >
                            Actualizar
                        </button>
                        <button
                            className="close-modal-btn"
                            onClick={closeEditarModal}
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
                        Registrar Municipio
                    </h1>
                    <form
                        className="contenido-regi"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrar({
                                fecha_creacion: fecha_creacion.current.value,
                                nombre: nombre.current.value,
                                departamentos_id: departamentos_id.current.value,
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
                            <input type="number" id="departamentos_id" name="departamentos_id" ref={departamentos_id} placeholder="" />
                            <label for="departamentos_id">Departamento</label>
                        </div>
                        <button
                            className="btn-blue"
                            type="submit"
                        >
                            Registrar municipio
                        </button>
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

export default Municipio;
