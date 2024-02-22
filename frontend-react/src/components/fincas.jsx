import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/fincas.css";
import Sweet from "../helpers/Sweet";
import $ from "jquery";
import jQuery from "jquery";
import "bootstrap"
import "../../node_modules/datatables.net";
import "../../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css";
import "../../node_modules/datatables.net-dt/css/dataTables.dataTables.css";
import '../../node_modules/datatables.net-responsive';
import '../../node_modules/datatables.net-responsive/js/dataTables.responsive';
import '../../node_modules/datatables.net-responsive-dt';
import '../../node_modules/datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import '../../node_modules/datatables.net-responsive-dt/css/responsive.dataTables.css';
import '../../node_modules/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';


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
           const data = await Api.put(`/finca/actualizar/${SelectedFincaId}`, modalFinca);
            console.log(data, "fincaaa")
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
                Sweet.actualizacionExitosa();
                setModalFinca(false)
                closeModal();
            }

            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("finca/listar");
            setFincas(response.data);
        } catch (error) {
            console.error("Error editando la finca: ", error);
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
            const data = await Api.put(`/lote/actualizar/${selectedLoteId}`, modalLote);
            console.log(data, "loteeeeeeeee")
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
                Sweet.actualizacionExitosa();
                openLotesModal(fincaId)
                closeModal();
            }

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

    const dataTableRef = useRef(null);
    const initializeDataTable = (fincas) => {
        $(document).ready(function () {
            $(dataTableRef.current).DataTable({
                lengthMenu: [5, 10, 20, 30, 40, 50],
                processing: true,
                pageLength: 5,
                language: {
                    processing: "Procesando datos...",
                },
                responsive: true,
            });
        });

        return () => {
            $(dataTableRef.current).DataTable().destroy(true);
        };
    };

    useEffect(() => {
        if (fincas.length > 0) {
            initializeDataTable(fincas);
        }
    }, [fincas]);

    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

            {modalFinca && <div className="overlay" onClick={closeEditarModal}></div>}
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}

            {/* <img src="../../public/img/fondo.png" alt="" className="fondo2" /> */}
            <div className="container-listado">
                <h4 className="titulo-listado"> Listado de Fincas</h4>
                <br />
                <br />


                <div className="container-fluid w-full">


                    <table className="table table-stripped table-bordered border display reponsive nowrap b-4 bg-white" ref={dataTableRef}>

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
                                        <td>{formatDate(task.fecha_creacion)}</td>
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
                                                    className="btn-actu"
                                                    onClick={() =>{setFincaId(task.id); openEditarModal(task.id)}}
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
            </div>
            {isLotesModalOpen && (
                <div className="modal-div-fin">
                    <div className="modal modal-ver-lotes" tabIndex="-1" role="dialog" style={{ display: isLotesModalOpen ? 'block' : 'none' }}>
                        <div className="fondo-over" onClick={() => setLotesModalOpen(false)} ></div>
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
                                                            className="btn-actu"
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
                </div>
            )}



            {modalFinca && (
                <div className="tabla-editar">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                        Editar Finca
                    </h1>
                    <div className="max-w-xs">
                        <input
                            className="input-field"
                            id="fecha_creacion"
                            type="hidden"
                            placeholder="fecha_creacion"
                            value={modalFinca.fecha_creacion}
                            onChange={(e) =>
                                setModalFinca({
                                    ...modalFinca,
                                    fecha_creacion: e.target.value,
                                })
                            }
                        />
                        <div>
                            <label className="labeledit" htmlFor="nombre">Nombre</label>
                        <input
                            className="input-field"
                            id="nombre"
                            type="text"
                            
                            value={modalFinca.nombre}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, nombre: e.target.value })
                            }
                        /></div>
                        <div>
                        <label className="labeledit" htmlFor="longitud">longitud</label> 
                        <input
                            className="input-field"
                            label="longitud"
                            id="longitud"
                            type="text"
                            
                            value={modalFinca.longitud}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, longitud: e.target.value })
                            }
                        /></div>
                        <div>
                        <label className="labeledit" htmlFor="latitud">latitud</label> 
                        <input
                            className="input-field"
                            id="latitud"
                            type="text"
                            
                            value={modalFinca.latitud}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, latitud: e.target.value })
                            }
                        /></div>
                        <div>
                            
                        <input
                            className="input-field"
                            id="usuarios_id"
                            type="hidden"
                            placeholder="usuarios_id "
                            value={modalFinca.usuarios_id}
                            onChange={(e) =>
                                setModalFinca({ ...modalFinca, usuarios_id: e.target.value })
                            }
                        /></div>
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
                            <div>
                            <label className="labeledit" htmlFor="noombre_vereda">vereda</label> 
                        <input
                            className="input-field"
                            id="noombre_vereda"
                            type="text"
                            
                            value={modalFinca.noombre_vereda}
                            onChange={(e) =>
                                setModalFinca({
                                    ...modalFinca,
                                    noombre_vereda: e.target.value,
                                })
                            }
                        /></div>
                        <button
                            className="btn-actu"
                            onClick={handleEditUser1}
                        >
                            Actualizar
                        </button>
                        {modalFinca.estado === 1 ? (
                            <button
                                className="btn-desactivar-finca"
                                onClick={handleEditUser2}
                            >
                                Desactivar
                            </button>
                        ) : (
                            <button
                                className="btn-activar-finca"
                                onClick={handleEditUser3}
                            >
                                Activar
                            </button>
                        )}
                        <button
                            className="close-modal"
                            onClick={closeEditarModal}
                        >
                            x
                        </button>
                    </div>
                </div>
            )}

            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}
            {isRegistrarModalOpen && (
                <div className="tabla-regis">
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

                        <div className="input-container">
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

                            <button className="btn-actu"
                                type="submit">Registrar lote</button>
                            <button
                                className="close-modal"
                                onClick={closeRegistrarModal}
                            >
                                x
                            </button>
                        </div>
                    </form>
                </div>

            )}

            {modalLote && (
                <div className="div-modal-edit" >
                    <div className="overlay" onClick={closeModal} ></div>
                    <div className="tabla-editar">

                        <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
                        <div className="max-w-xs">
                            <div>
                                <input
                                    className="input-field"
                                    id="nombre"
                                    type="text"
                                    placeholder="nombre"
                                    value={modalLote.nombre}
                                    onChange={(e) => setModalLote({ ...modalLote, nombre: e.target.value })}
                                />
                            </div>
                            <div>
                            <input
                                className="input-field"
                                id="longitud"
                                type="text"
                                placeholder="longitud"
                                value={modalLote.longitud}
                                onChange={(e) => setModalLote({ ...modalLote, longitud: e.target.value })}
                            />
                            </div>
                            <div>
                            <input
                                className="input-field"
                                id="latitud"
                                type="text"
                                placeholder="latitud"
                                value={modalLote.latitud}
                                onChange={(e) => setModalLote({ ...modalLote, latitud: e.target.value })}
                            />
                            </div>
                            <div>
                            <input
                                className="input-field"
                                id="n_plantas"
                                type="number"
                                placeholder="n_plantas"
                                value={modalLote.n_plantas}
                                onChange={(e) =>
                                    setModalLote({ ...modalLote, n_plantas: e.target.value })
                                }
                            />
                            </div>
                            <div>
                            <input
                                className="input-field"
                                id="fincas_id"
                                type="hidden"
                                placeholder="fincas_id"
                                value={modalLote.fincas_id}
                                onChange={(e) => setModalLote({ ...modalLote, fincas_id: e.target.value })}
                            />
                            </div>
                            <button
                                className="btn-actu"
                                onClick={loteEditUser1}
                            >
                                Actualizar
                            </button>
                            {modalLote.estado === 1 ? (
                                <button
                                    className="btn-desactivar-finca"
                                    onClick={loteEditUser2}
                                >
                                    Desactivar
                                </button>
                            ) : (
                                <button
                                    className="btn-activar-finca"
                                    onClick={loteEditUser3}
                                >
                                    Activar
                                </button>
                            )}
                            <button
                                className="close-modal"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </>
    );
};

export default FincaView;
