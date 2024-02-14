import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/fincas.css";
import Sweet from "../helpers/Sweet";
import $ from "jquery";


const FincaView = () => {
    const [fincas, setFincas] = useState([]);
    const [idFinca, setIdFinca] = useState([]);
    const [modalFinca, setModalFinca] = useState(null);
    const [SelectedFincaId, setSelectedFincaId] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [selectedLoteId, setSelectedLoteId] = useState(null);
    const [modalLote, setModalLote] = useState(null);
    const [lotes, setLotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [municipios, setMunicipios] = useState([]);
    const [isLotesModalOpen, setLotesModalOpen] = useState(false);
    const [selectedFincaLotes, setSelectedFincaLotes] = useState(null);
    const [modalLotes, setModalLotes] = useState({});
    const [isLoadingLotes, setLoadingLotes] = useState(false);
    const [fincaId, setFincaId] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);


    const fincas_id = useRef();
    const nombre = useRef();
    const longitud = useRef();
    const latitud = useRef();
    const n_plantas = useRef();

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


    useEffect(() => {
        $("body").on("click", ".td-id", function () {
            alert("xd")
        })
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                setUsuario(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        buscarUsuarios();

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
            await Api.put(`/finca/actualizar/${SelectedFincaId}`, modalFinca);
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
                await Api.patch(`/finca/desactivar/${SelectedFincaId}`, modalFinca);
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
                await Api.patch(`/finca/activar/${SelectedFincaId}`, modalFinca);
                closeEditarModal();
                // Recargar la lista de fincas después de la activación
                const response = await Api.get("finca/listar");
                setFincas(response.data);
            } catch (error) {
                console.error("Error activando el Finca: ", error);
            }
        }
    };

    // editar el lote

    const loteEditUser1 = async () => {
        try {
            await Api.put(`/lote/actualizar/${selectedLoteId}`, modalLote);
            Sweet.actualizacionExitosa();
            openLotesModal(fincaId)
            closeModal();
            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("lote/listar");
            setLotes(response.data);
        } catch (error) {
            console.error("Error editando el Lote: ", error);
        }
    };

    const loteEditUser2 = async () => {
        const result = await Sweet.confimarDeshabilitar({
        });
        if (result.isConfirmed) {
            try {
                await Api.patch(`/lote/desactivar/${selectedLoteId}`, modalLote);
                openLotesModal(fincaId)
                closeModal();
                // Recargar la lista de lotes después de la desactivación
                const response = await Api.get("lote/listar");
                setLotes(response.data);
            } catch (error) {
                console.error("Error desactivando el Lote: ", error);
            }
        }
    };

    const loteEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/lote/activar/${selectedLoteId}`, modalLote);
                openLotesModal(fincaId)
                closeModal();
                // Recargar la lista de lotes después de la activación
                const response = await Api.get("lote/listar");
                setLotes(response.data);
            } catch (error) {
                console.error("Error activando el Lote: ", error);
            }
        }
    };

    useEffect(() => {
        let inputRegister = document.querySelectorAll(".input-register");
        let h6Error = document.querySelectorAll(".h6-error");

        for (let x = 0; x < inputRegister.length; x++) {
            inputRegister[x].addEventListener("change", function () {
                let h6Error = document.querySelectorAll(".h6-error");

                if (h6Error[x]) {
                    h6Error[x].style.display = "none"
                }
            })
            inputRegister[x].addEventListener("input", function () {
                let h6Error = document.querySelectorAll(".h6-error");

                if (h6Error[x]) {
                    h6Error[x].style.display = "none"
                }
            })
        }

    }, [isRegistrarModalOpen])

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const openLotesModal = async (fincaId) => {
        setSelectedFincaLotes(fincaId);
        setLotesModalOpen(true);

        try {
            setLoadingLotes(true);
            const response = await Api.get(`/lote/listarPorFinca/${fincaId}`);

            setModalLotes(response.data);
        } catch (error) {
            console.error("Error fetching lotes:", error);
        } finally {
            setLoadingLotes(false);
        }
    };

    /*usuarios filtro*/
    const filtrarOpciones = (event) => {
        setFiltro(event.target.value.toLowerCase());
        setMostrarOpciones(true);
    };
    const handleClickOpcion = (usuario) => {
        // Actualizamos el filtro con el valor seleccionado
        setFiltro(`${usuario.numero_documentos}-${usuario.nombre}`);
        setMostrarOpciones(false);
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
            } else {
                console.log(data.data)
                /* Sweet.registroExitoso();
                closeRegistrarModal(); */
                // Recargar la lista de fincas después del registro
                const response = await Api.get("lote/listar");
                setLotes(response.data);
                location.href = "/finca"
            }




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
                        <path className="st0" fill="#ffffff" d="M54.8,51.4L38.7,35.3c2.6-3.1,4.2-7.1,4.2-11.5C42.9,14,34.9,6,25.1,6C15.2,6,7.2,14,7.2,23.8
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
                                    <td className="td-id">{task.id}</td>
                                    <td>{task.fecha_creacion}</td>
                                    <td>{task.nombre}</td>
                                    <td>{task.longitud}</td>
                                    <td>{task.latitud}</td>
                                    <td>{task.nombre_usuario}</td>
                                    <td>{task.nombre_municipio}</td>
                                    <td>{task.estado === 1 ? "Activo" : "Desactivado"}</td>
                                    <td>{task.noombre_vereda}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn-primary"
                                                onClick={() => openEditarModal(task.id)}
                                            >
                                                Modificar
                                            </button>
                                            <div className="btn-secondary">
                                                Lotes
                                                <div className="btn-subgroup up">
                                                    <button
                                                        type="button"
                                                        className="btn-ver"
                                                        onClick={() => { setFincaId(task.id); openLotesModal(task.id) }}
                                                    >
                                                        Ver Lotes
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn-ver"
                                                        onClick={() => { setIdFinca(task.id); openRegistrarModal() }}
                                                    >
                                                        Registrar Lote
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
            {isLotesModalOpen && (
                <div className="modal modal-ver-lotes" tabIndex="-1" role="dialog" style={{ display: isLotesModalOpen ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-contents">
                            <div className="modal-header">
                                <h5 className="modal-title">Lotes de la Finca</h5>
                                <button type="button" className="close" onClick={() => setLotesModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Finca</th>
                                            <th>Latitud</th>
                                            <th>Longitud</th>
                                            <th>N° Plantas</th>
                                            <th>Variedad</th>
                                            <th>Estado</th>
                                            <th>modificar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {Object.keys(modalLotes).length > 0 ?
                                            modalLotes.map((lote) => {
                                                console.log(lote)
                                                return <tr key={lote.id}>
                                                    <td>{lote.nombre}</td>
                                                    <td>{lote.nombre_finca}</td>
                                                    <td>{lote.latitud}</td>
                                                    <td>{lote.longitud}</td>
                                                    <td>{lote.n_plantas}</td>
                                                    <td>{lote.nombre_variedad ? lote.nombre_variedad : <span className="span-no-registra"> No registra</span>}</td>
                                                    <td>{lote.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                                    <td><button
                                                        type="button"
                                                        className="btn-primary"
                                                        onClick={() => openModal(lote.id)}
                                                    >
                                                        Modificar
                                                    </button></td>

                                                </tr>
                                            })
                                            : <tr>
                                                <td className="text-center p-5" colSpan={1000000}>No hay nada para mostrar</td>
                                            </tr>}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setLotesModalOpen(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



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
                            type="text"
                            placeholder="usuarios_id"
                            value={filtro}
                            onChange={filtrarOpciones}
                            autoComplete="off"
                        />
                        <div className="div-usuario">
                            <label htmlFor="usuarios_id" className='usuario-label'>Usuario</label>
                            {mostrarOpciones && (
                                <div className="custom-dropdown">
                                    {usuario.map((usuario) => (
                                        (usuario.numero_documentos.toLowerCase().includes(filtro) ||
                                            usuario.nombre.toLowerCase().includes(filtro)) && (
                                            <div
                                                key={usuario.id}
                                                className="custom-dropdown-option"
                                                onClick={() => handleClickOpcion(usuario)}
                                            >

                                                {`${usuario.numero_documentos}-${usuario.nombre}`}
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="div-input">
                            <select

                                className="input-register"
                                id="municipios_id"
                                name="municipios_id"
                                value={modalFinca.municipios_id}
                                onChange={(e) => {
                                    console.log("Municipio seleccionado:", e.target.value);
                                    setModalFinca({
                                        ...modalFinca,
                                        municipios_id: e.target.value,
                                    });
                                }}
                            >
                                <option value="" disabled>Seleccione un municipio</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.id} value={municipio.id}>
                                        {municipio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                n_plantas: n_plantas.current.value,
                            });
                        }}
                        method="post"
                    >


                        <div className="div-input">
                            <input className="input-register" type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="div-input">
                            <input className="input-register" type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
                            <label htmlFor="latitud">Latitud</label>
                        </div>
                        <div className="div-input">
                            <input className="input-register" type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
                            <label htmlFor="longitud">Longitud</label>
                        </div>
                        <div className="div-input">
                            <input className="input-register" type="number" id="n_plantas" name="n_plantas" ref={n_plantas} placeholder="" />
                            <label htmlFor="longitud">n_plantas</label>
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

            {modalLote && (
                <div className="tabla3">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
                    <div className="max-w-xs">

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
                            placeholder="n_plantas"
                            value={modalLote.n_plantas}
                            onChange={(e) =>
                                setModalLote({ ...modalLote, n_plantas: e.target.value })
                            }
                        />
                        <input
                            className="input-field"
                            type="hidden"
                            placeholder="fincas_id"
                            value={modalLote.fincas_id}
                            onChange={(e) => setModalLote({ ...modalLote, fincas_id: e.target.value })}
                        />
                        <button
                            className="btn-primary"
                            onClick={loteEditUser1}
                        >
                            Actualizar
                        </button>
                        {modalLote.estado === 1 ? (
                            <button
                                className="btn-secondary"
                                onClick={loteEditUser2}
                            >
                                Desactivar
                            </button>
                        ) : (
                            <button
                                className="btn-tertiary"
                                onClick={loteEditUser3}
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
