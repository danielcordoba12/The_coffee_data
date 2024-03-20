import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
import "../style/fincas.css";
import Sweet from "../helpers/Sweet";
import esES from "../languages/es-ES.json"
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";



const FincaView = (user) => {
    const [fincas, setFincas] = useState([]);
    const [idUsuario, setIdUsuario] = useState();
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
    const tableRef = useRef();
    const tableRef2 = useRef();
    const [isRegistrarModalOpenfinca, setRegistrarModalOpenfinca] = useState(false);
    const [selectedMunicipio, setSelectedMunicipio] = useState("");


    const noombre_vereda = useRef();



    const fincas_id = useRef();
    const nombre = useRef();
    const longitud = useRef();
    const latitud = useRef();
    const n_plantas = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (modalLotes.length > 0) {
            if ($.fn.DataTable.isDataTable(tableRef2.current)) {
                $(tableRef2.current).DataTable().destroy();
            }
            $(tableRef2.current).DataTable({
                columnDefs: [
                    {
                        targets: -1,
                        responsivePriority: 1
                    }
                ],
                responsive: true,
                language: esES,
                paging: true,
                lengthMenu: [
                    [6],
                    ['6 Filas']
                ]
            });

        }
    }, [modalLotes])

    useEffect(() => {
        if (fincas.length > 0) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            $(tableRef.current).DataTable({
                columnDefs: [
                    {
                        targets: -1,
                        responsivePriority: 1
                    }
                ],
                responsive: true,
                language: esES,
                paging: true,
                lengthMenu: [
                    [7, 10, 50],
                    ['7 Filas', '10 Filas', '50 Filas']
                ]
            });

        }
    }, [fincas])
    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
            } catch (error) {
                console.error("Error fetching municipios:", error);
            }
        };
        fetchMunicipios();
    }, []);
    const buscarFincas = async () => {
        try {
            const response = await Api.get("finca/listar", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setFincas(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {

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

    const openmodalregisfinca = () => {
        setRegistrarModalOpenfinca(true);
        console.log("modal", setRegistrarModalOpenfinca);
        console.log("si estoy funcionando");
    };

    const closeRegistrarModalfinca = () => {
        setRegistrarModalOpenfinca(false);
    };

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
                buscarFincas();
            }

            // Recargar la lista de lotes después de la actualización

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
                buscarFincas()
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
                buscarFincas();
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
        console.log("modal", setRegistrarModalOpen);
        console.log("si estoy funcionando");
    };


    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const openLotesModal = async (fincaId) => {
        setSelectedFincaLotes(fincaId);
        setLotesModalOpen(true);

        try {
            setLoadingLotes(true);
            const response = await Api.get(`/lote/listarPorFinca/${fincaId}`,);

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
            console.log(data, "ahhhh")
            if (data.data.status == false) {
                let keys = Object.keys(data.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
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

                Sweet.registroExitoso();
                closeRegistrarModal();

                // closeRegistrarModal();
                // const response = await Api.get("finca/listar");
                setFincas(response.data);
                // location.href = "/finca"
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

    const handleRegistrarfinca = async (data) => {
        const fincaData = {
            ...data
        };

        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            const data = await Api.post("finca/registrar", fincaData, headers);
            if (data.data.status == false) {
                let keys = Object.keys(data.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
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
                Sweet.registroExitoso();
                closeRegistrarModalfinca();

                // closeRegistrarModal();
                // const response = await Api.get("finca/listar");
                setFincas(data.data);
                location.href = "/home/finca"
            }
        } catch (error) {
            console.error("Error al registrar la finca:", error);
        }
    };

    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

            {modalFinca && <div className="overlay" onClick={closeEditarModal}></div>}
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}

            {/* <img src="../../public/img/fondo.png" alt="" className="fondo2" /> */}



            
                <div className="contTitle-finca">
                    <h4 className="titulo-listado"> Fincas</h4>
                    {user.user ? user.user.rol == 'catador' ?
                    <button className="btn-añadir-finca" onClick={() => { setIdUsuario(user.user.id); openmodalregisfinca() }} >
                        Añadir
                    </button>
                    : '' : ''}
                    </div>
                


            <div className="container-listado">
                <div className="container-fluid w-100">
                    <table className="table table-hover rounded-3 display responsive nowrap shadow"
                        ref={tableRef}
                        cellPadding={0}
                        width="100%"
                        style={
                            {
                                overflow : "visible !important",
                                width: "100%",
                                maxWidth: "100%"
                            }
                        }
                    >

                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-muted">id</th>
                                <th className="text-muted">Fecha Creación</th>
                                <th className="text-muted">Nombre</th>                        
                                <th className="text-muted">usuario</th>
                                <th className="text-muted">municipio</th>
                                <th className="text-muted">Estado</th>
                                <th className="text-muted">Nombre Vereda</th>
                                <th className="text-muted">opciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {fincas.length > 0 ? fincas
                                /*  .filter((task) =>
                                     task.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                                 ) */
                                .map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td className="td-id">{task.id}</td>
                                        <td className="text-muted">{formatDate(task.fecha_creacion)}</td>
                                        <td className="text-muted">{task.nombre}</td>
                                        <td className="text-muted">{task.nombre_usuario}</td>
                                        <td className="text-muted">{task.nombre_municipio}</td>
                                        <td className="text-muted">{task.estado === 1 ? "Activo" : "Desactivado"}</td>
                                        <td className="text-muted">{task.noombre_vereda}</td>
                                        <td>
                                            <div className="btn-group">
                                                {user.user ? user.user.rol == 'administrador' ?
                                                    <button
                                                        type="button"
                                                        className="btn-actu"
                                                        onClick={() => { setFincaId(task.id); openEditarModal(task.id) }}
                                                    >
                                                        Modificar
                                                    </button>
                                                    : '' : ''}

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
                                                        {user.user ? user.user.rol == 'administrador' ?
                                                            <button
                                                                type="button"
                                                                className="btn-ver"
                                                                onClick={() => { setIdFinca(task.id); openRegistrarModal() }}
                                                            >
                                                                Registrar Lote
                                                            </button>
                                                            : '' : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan={999999999999} className="p-5 text-center">{fincas.message}</td></tr>}
                        </tbody>

                    </table>
                </div>
            </div>
            {isLotesModalOpen && (
                <div className="modal-div-fin">
                    <div className="modal modal-ver-lotes" tabIndex="-1" role="dialog" style={{ display: isLotesModalOpen ? 'block' : 'none' }} >
                        <div className="fondo-over"  ></div>
                        <div className="modal-dialog" role="document">
                            <div className="modal-contents">
                                <div className="modal-header">

                                    <h5 className="modal-title">Lotes de la Finca</h5>
                                    <button type="button" className="close" onClick={() => setLotesModalOpen(false)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <div className="container-fluid w-full">
                                        <table className=" bg-white table table-stiped table-bordered border display responsive nowrap b-4"
                                            ref={tableRef2}
                                            cellPadding={0}
                                            width={"100%"}
                                            style={
                                                {
                                                    width: "100%",
                                                    maxWidth: "95%"
                                                }
                                            }
                                        >
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

                                                            <td>{user.user ? user.user.rol == 'administrador' ?
                                                                <button
                                                                    type="button"
                                                                    className="btn-actu"
                                                                    onClick={() => openModal(lote.id)}
                                                                >
                                                                    Modificar
                                                                </button>
                                                                : '' : ''}</td>

                                                        </tr>
                                                    })
                                                    : <tr>
                                                        <td className="text-center p-5" colSpan={1000000}>No hay nada para mostrar</td>
                                                    </tr>}
                                            </tbody>
                                        </table>
                                    </div>
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
                            className="btn-actu-fin"
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
                <div className="overlay" ></div>
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
                    <div className="overlay"  ></div>
                    <div className="tabla-editar">

                        <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
                        <div className="max-w-xs">
                            <div>
                                <label className="labeledit" htmlFor="nombre">Nombre</label>
                                <input
                                    className="input-field"
                                    id="nombre"
                                    type="text"
                                    value={modalLote.nombre}
                                    onChange={(e) => setModalLote({ ...modalLote, nombre: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="labeledit" htmlFor="longitud">longitud</label>
                                <input
                                    className="input-field"
                                    id="longitud"
                                    type="text"
                                    value={modalLote.longitud}
                                    onChange={(e) => setModalLote({ ...modalLote, longitud: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="labeledit" htmlFor="latitud">latitud</label>
                                <input
                                    className="input-field"
                                    id="latitud"
                                    type="text"
                                    value={modalLote.latitud}
                                    onChange={(e) => setModalLote({ ...modalLote, latitud: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="labeledit" htmlFor="n_plantas">N°plantas</label>
                                <input
                                    className="input-field"
                                    id="n_plantas"
                                    type="number"
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
                                className="btn-actu-fin"
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
            {isRegistrarModalOpenfinca && (
                <>
                    <div className="overlay" onClick={closeRegistrarModal}></div>
                    <div className="tabla-regis-finca">
                        <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                            Registrar Finca
                        </h1>
                        <form
                            className="contenido-regi"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleRegistrarfinca({
                                    nombre: nombre.current.value,
                                    longitud: longitud.current.value,
                                    latitud: latitud.current.value,
                                    usuarios_id: user.user.id,
                                    municipios_id: selectedMunicipio,
                                    noombre_vereda: noombre_vereda.current.value
                                });
                            }}
                            method="post"
                        >
                            <div className="div-input">
                                <input className="input-register" type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>
                            <div className="div-input">
                                <input className="input-register" type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
                                <label htmlFor="longitud">Longitud</label>
                            </div>
                            <div className="div-input">
                                <input className="input-register" type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
                                <label htmlFor="latitud">Latitud</label>
                            </div>
                            <div className="div-input">
                                <select
                                    className="input-register"
                                    id="municipios_id"
                                    name="municipios_id"
                                    value={selectedMunicipio}
                                    onChange={(e) => {
                                        console.log("Municipio seleccionado:", e.target.value);
                                        setSelectedMunicipio(e.target.value);
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
                            <div className="div-input">
                                <input className="input-register" type="text" id="noombre_vereda" name="noombre_vereda" ref={noombre_vereda} placeholder="" />
                                <label htmlFor="noombre_vereda">nombre vereda</label>
                            </div>
                            <button className="btn-blue" type="submit">
                                Registrar finca
                            </button>
                            <button className="close-modal-x" onClick={closeRegistrarModalfinca}>
                                x
                            </button>
                        </form>
                    </div>
                </>
            )}



        </>
    );
};

export default FincaView;
