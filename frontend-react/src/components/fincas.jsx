import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/fincas.css";
import Sweet from "../helpers/Sweet";

const FincaView = () => {
    const [fincas, setFincas] = useState([]);
    const [idFinca, setIdFinca] = useState([]);
    const [modalFinca, setModalFinca] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [lotes, setLotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [municipios, setMunicipios] = useState([]);

    const fincas_id = useRef();
    const nombre = useRef();
    const longitud = useRef();
    const latitud = useRef();
    const usuarios_id = useRef();
    const municipios_id = useRef();
    const noombre_vereda = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
                console.log("Municipios cargados:", response.data);
            } catch (error) {
                console.error("Error fetching municipios:", error);
            }
        };
        fetchMunicipios();
    }, []);


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

    const openEditarModal = async (fincaId) => {
        setSelectedFincaId(fincaId);
        try {
            const response = await Api.get(`/finca/buscar/${fincaId}`);
            setModalFinca(response.data[0]);
        } catch (error) {
            console.error("Error buscando el Finca", error);
        }
    };

    const closeEditarModal = () => {
        setSelectedFincaId(null);
        setModalFinca(null);
    };

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/finca/actualizar/${selectedFincaId}`, modalFinca);
            Sweet.actualizacionExitosa();
            closeEditarModal();
            // Recargar la lista de fincas después de la actualización
            const response = await Api.get("finca/listar");
            setFincas(response.data);
        } catch (error) {
            console.error("Error editando el Finca: ", error);
        }
    };

    const handleEditUser2 = async () => {
        const result = await Sweet.confimarDeshabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/finca/desactivar/${selectedFincaId}`, modalFinca);
                closeEditarModal();
                // Recargar la lista de fincas después de la desactivación
                const response = await Api.get("finca/listar");
                setFincas(response.data);
            } catch (error) {
                console.error("Error desactivando el Finca: ", error);
            }
        }
    };

    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/finca/activar/${selectedFincaId}`, modalFinca);
                closeEditarModal();
                // Recargar la lista de fincas después de la activación
                const response = await Api.get("finca/listar");
                setFincas(response.data);
            } catch (error) {
                console.error("Error activando el Finca: ", error);
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
        // Obtener el ID del usuario actualmente autenticado o ajustar según tu lógica


        const LoteData = {
            ...data
        };

        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            const data = await Api.post("lote/registrar", LoteData, headers);
            if (data.data.status == false) {
                let keys = Object.keys(data.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(data.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = data.data.errors[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            }
            console.log(data.data)
            /* Sweet.registroExitoso();
            closeRegistrarModal(); */
            // Recargar la lista de fincas después del registro
            const response = await Api.get("lote/listar");
            setLotes(response.data);
            location.href = "/lote"


        } catch (error) {
            console.error("Error al registrar la finca:", error);
        }
    };

    return (
        <>
            {modalFinca && <div className="overlay" onClick={closeEditarModal}></div>}
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}

            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu"> Listado de Fincas</h1>
                <br />
                <br />

                <div className="search-container">

                    {/* icono de buscar */}
                    <svg x="0px" y="0px" viewBox="0 0 60 60" width="26" height="26" >
                        <path class="st0" fill="#ffffff" d="M54.8,51.4L38.7,35.3c2.6-3.1,4.2-7.1,4.2-11.5C42.9,14,34.9,6,25.1,6C15.2,6,7.2,14,7.2,23.8
                c0,9.8,8,17.8,17.8,17.8c4.4,0,8.4-1.6,11.5-4.2l16.1,16.1L54.8,51.4z M10.2,23.8C10.2,15.6,16.9,9,25.1,
                9c8.2,0,14.8,6.7,14.8,14.8c0,8.2-6.7,14.8-14.8,14.8C16.9,38.7,10.2,32,10.2,23.8z">
                        </path>
                    </svg>


                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
                

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
                        {fincas
                            .filter((task) =>
                                task.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((task) => (
                                <tr key={task.id} className="border-t">
                                    <td>{task.id}</td>
                                    <td>{task.fecha_creacion}</td>
                                    <td>{task.nombre}</td>
                                    <td>{task.longitud}</td>
                                    <td>{task.latitud}</td>
                                    <td>{task.nombre_usuario}</td>
                                    <td>{task.nombre_municipio}</td>
                                    <td>{task.estado === 1 ? "Activo" : "Desactivado"}</td>
                                    <td>{task.noombre_vereda}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() => openEditarModal(task.id)}
                                        >
                                            Modificar
                                        </button>
                                        <button className="btn-registrar" onClick={() => { setIdFinca(task.id); openRegistrarModal() }}>
                                            Registrar Lote
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {modalFinca && (
                <div className="tabla3">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                        Editar Finca
                    </h1>
                    <div className="max-w-xs">
                        <input
                            className="input-field"
                            type="date"
                            placeholder="fecha_creacion"
                            value={modalFinca.fecha_creacion}
                            onChange={(e) =>
                                setModalFinca({
                                    ...modalFinca,
                                    fecha_creacion: e.target.value,
                                })
                            }
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="nombre"
                            value={modalFinca.nombre}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, nombre: e.target.value })
                            }
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="longitud"
                            value={modalFinca.longitud}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, longitud: e.target.value })
                            }
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="latitud"
                            value={modalFinca.latitud}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, latitud: e.target.value })
                            }
                        />
                        <input
                            className="input-field"
                            type="number"
                            placeholder="usuarios_id"
                            value={modalFinca.usuarios_id}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, usuarios_id: e.target.value })
                            }
                        />
                        <input
                            className="input-field"
                            type="number"
                            placeholder="municipios_id"
                            value={modalFinca.municipios_id}
                            onChange={(e) =>
                                setModalFinca({
                                    ...modalFinca,
                                    municipios_id: e.target.value,
                                })
                            }
                        />
                        <input
                            className="input-field"
                            type="text"
                            placeholder="noombre_vereda"
                            value={modalFinca.noombre_vereda}
                            onChange={(e) =>
                                setModalFinca({
                                    ...modalFinca,
                                    noombre_vereda: e.target.value,
                                })
                            }
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
                        Registrar Lote
                    </h1>

                    <form
                        className="contenido-regi"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrar({
                                nombre: nombre.current.value,
                                latitud: latitud.current.value,
                                longitud: longitud.current.value,
                                fincas_id: fincas_id.current.value,
                            });
                        }}
                        method="post"
                    >


                        <div className="div-input">
                            <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="div-input">
                            <input type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
                            <label htmlFor="latitud">Latitud</label>
                        </div>
                        <div className="div-input">
                            <input type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
                            <label htmlFor="longitud">Longitud</label>
                        </div>
                        <input value={idFinca} type="hidden" id="fincas_id " name="fincas_id " ref={fincas_id} placeholder="" />

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

export default FincaView;
