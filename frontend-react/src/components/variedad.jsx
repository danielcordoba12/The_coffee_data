import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";



const Variedad = () => {
    const [variedades, setvariedades] = useState([]);
    const [selectedVarId, setSelectedVarId] = useState(null);
    const [modalVar, setModalVar] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);

    const nombre = useRef();
    const fecha_creacion = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarvariedades = async () => {
            try {
                const response = await Api.get('variedad/listar');
                setvariedades(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarvariedades();
    }, []);

    const openModal = async (varId) => {
        setSelectedVarId(varId);
        try {
            const response = await Api.get(`/variedad/buscar/${varId}`);
            setModalVar(response.data);
        } catch (error) {
            console.error('Error buscando el variedad', error);
        }
    };
    const closeModal = () => {
        setSelectedVarId(null);
        setModalVar(null);
    };

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/variedad/actualizar/${selectedVarId}`, modalVar);
            Sweet.actualizacionExitosa();
            closeModal();
            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("variedad/listar");
            setvariedades(response.data);
        } catch (error) {
            console.error("Error editando el variedad: ", error);
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
            await Api.post("variedad/registrar", data, headers);
            Sweet.registroExitoso();
            closeRegistrarModal();
            // Recargar la lista de fincas después del registro
            const response = await Api.get("variedad/listar");
            setvariedades(response.data);
        } catch (error) {
            console.error("Error al registrar el variedad:", error);
        }
    };



    return (<>

        {modalVar && <div className="overlay" onClick={closeModal}></div>}
        {isRegistrarModalOpen && (
            <div className="overlay" onClick={closeRegistrarModal}></div>
        )}


        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  variedades</h1>

            <button to="/variedad/registrar" className="btn-registrar-lote" onClick={openRegistrarModal}>
                Registrar variedades
            </button>

            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Fecha Creación</th>
                        <th>Nombre</th>
                        <th>opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {variedades.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{task.fecha_creacion}</td>
                            <td>{task.nombre}</td>
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
        </div >

        {modalVar && (
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Variedad</h1>
                <div className="max-w-xs">
                    <input
                        className="input-field"
                        type="date" placeholder="fecha_creacion"
                        value={modalVar.fecha_creacion}
                        onChange={(e) => setModalVar({ ...modalVar, fecha_creacion: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="nombre"
                        value={modalVar.nombre}
                        onChange={(e) => setModalVar({ ...modalVar, nombre: e.target.value })}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleEditUser1}
                    >
                        Actualizar
                    </button>
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
                    Registrar Variedad
                </h1>

                <form
                    className="contenido-regi"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegistrar({
                            nombre: nombre.current.value,
                            fecha_creacion: fecha_creacion.current.value,
                        });
                    }}
                    method="post"
                >

                    <div className="div-input">
                        <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                        <label for="nombre">Nombre</label>
                    </div>

                    <div className="div-input">
                        <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
                    </div>
                    
                    <button className="btn-register-lote"
                        type="submit">Registrar Variedad</button>
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

export default Variedad