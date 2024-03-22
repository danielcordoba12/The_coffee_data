import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
import '../style/municipio.css';
import Sweet from "../helpers/Sweet";
import $ from "jquery";
import esES from "../languages/es-ES.json"
import "bootstrap"
import "datatables.net";
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';
import 'datatables.net-bs5';


const Municipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipioId, setSelectedMunicipioId] = useState(null);
    const [modalMunicipio, setModalMunicipio] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [dataSelect, setDataSelect] = useState({});
    const tableRef = useRef();

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
    useEffect(() => {
        const buscardepartamentos = async () => {
            try {
                const response = await Api.get("departamento/listar");
                setDepartamentos(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        buscardepartamentos();
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
            const data = await Api.put(`/municipio/Actualizar/${selectedMunicipioId}`, modalMunicipio);
            console.log(data, "municipio")
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

                closeEditarModal();
            }

            // Recargar la lista de lotes después de la actualización
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
        const MunicipioData = {
            ...data
        };

        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            const data = await Api.post("municipio/registrar", MunicipioData, headers);
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
                Sweet.registroExitoso("/home/municipio");
                closeRegistrarModal(true);
            }
            const response = await Api.get("municipio/listar");
            setMunicipios(response.data);

        } catch (error) {
            console.error("Error al registrar el municipio:", error);
        }
    };

    function clearFocusInput(Element) {
        let inputSearch = document.getElementById(Element)

        if (inputSearch) {

            let divOptions = inputSearch.parentNode.querySelectorAll(".select-options-input");
            if (divOptions.length > 0) {
                divOptions[0].style.display = "none"
            }
            let select = inputSearch.parentNode.querySelectorAll(".option-select-search")
            for (let s = 0; s < select.length; s++) {
                let elementvalue = inputSearch.getAttribute("id")

                if (dataSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")) {
                    select[s].classList.add("option-select-focus")
                } else {
                    select[s].classList.remove("option-select-focus")
                }

            }
        }
    }
    useEffect(() => {
        window.addEventListener("click", function (e) {
            let divOptions = document.querySelectorAll(".div-input-search-select");
            for (let s = 0; s < divOptions.length; s++) {
                if (!e.target == divOptions[s] || !divOptions[s].contains(e.target)) {
                    let options = divOptions[s].querySelectorAll(".select-options-input")
                    if (options.length > 0) {
                        options[0].style.display = "none"
                    }
                }
            }
        })
    }, [])

    function searchInput() {
        let inputSearch = document.querySelectorAll(".input-search")


        if (inputSearch.length > 0) {
            for (let s = 0; s < inputSearch.length; s++) {

                inputSearch[s].addEventListener("input", function () {
                    let parent = inputSearch[s].parentNode
                    if (parent) {
                        let selectOptionsInput = parent.querySelectorAll(".select-options-input");
                        if (selectOptionsInput[0]) {
                            selectOptionsInput[0].style.display = "block"
                            let options = selectOptionsInput[0].querySelectorAll("div");
                            for (let o = 0; o < options.length; o++) {
                                if (options[o].innerHTML.toLowerCase().includes(inputSearch[s].value.toLowerCase())) {
                                    options[o].style.display = "block"
                                } else {
                                    options[o].style.display = "none"
                                }
                                let referencia = inputSearch[s].getAttribute("id")

                                if (options[o].innerHTML.toLowerCase() == inputSearch[s].value.toLowerCase()) {
                                    let focusSelect = document.querySelectorAll(".option-select-focus")
                                    if (focusSelect.length > 0) {
                                        focusSelect[0].classList.remove("option-select-focus")
                                    }
                                    inputSearch[s].value = options[o].innerHTML
                                    if (!dataSelect[inputSearch[s].getAttribute("data-id")]) {
                                        dataSelect[inputSearch[s].getAttribute("data-id")] = {}
                                    }
                                    dataSelect[inputSearch[s].getAttribute("data-id")].value = options[o].getAttribute("data-id")
                                    options[o].classList.add("option-select-focus")
                                    if (!dataSelect[referencia]) {
                                        dataSelect[referencia] = {}
                                    }
                                    dataSelect[referencia]["value"] = options[o].getAttribute("data-id");
                                    options[o].parentNode.style.display = "none"
                                    break
                                } else {
                                    if (!dataSelect[referencia]) {
                                        dataSelect[referencia] = {}
                                    }
                                    dataSelect[referencia]["value"] = "";
                                    options[o].classList.remove("option-select-focus")
                                }
                            }
                        }
                    }
                })
            }
        }
    }
    useEffect(() => {
        searchInput()
    }, [isRegistrarModalOpen]);
    useEffect(() => {

        searchInput()
    }, [openEditarModal]);

    useEffect(() => {
        if (municipios.length > 0) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            $(tableRef.current).DataTable({
                columnDefs:[
                    {
                      targets:-1,
                      responsivePriority:1
                    }
                  ],
                responsive: true,
                language: esES,
                paging: true,
                lengthMenu: [
                    [7, 10, 50, -1],
                    ['7 Filas', '10 Filas', '50 Filas', 'Ver Todo']
                ]
            });

        }
    }, [municipios])




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




            <div className="bgr-m">
                <div className="container-list-Municipio">
                    <div className="titulo-municipio">
                    <h1 className="title-municipio">Municipio</h1>
                    </div>
<br /><br />

                    <div className="container-fluid w-full">
                        <button to="/Municipio/registrar" className="btn-añadir-municipio" onClick={openRegistrarModal}>
                            Añadir
                        </button>

                        <table className="table table-hover rounded-3 overflow-hidden display responsive nowrap shadow" ref={tableRef} width={"100%"}>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="text-muted">id</th>
                                    <th className="text-muted">Fecha Creación</th>
                                    <th className="text-muted">Nombre</th>
                                    <th className="text-muted">Departamento</th>
                                    <th className="text-muted">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {municipios.map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td className="text-muted">{task.id}</td>
                                        <td className="text-muted">{formatDate(task.fecha_creacion)}</td>
                                        <td className="text-muted">{task.nombre}</td>
                                        <td className="text-muted">{task.nombre_departamento}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-modi-municipio "
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
                </div>

            </div>
            {modalMunicipio && (
                <div className="div-modal">
                    <div  className="fondo-modal"></div>
                    <div className="table-register-municipio">
                        <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                            Editar Municipio
                        </h1>
                        <div className="max-w-xs">
                            <div>
                            <label className="labeledit" htmlFor="nombre">Nombre</label>
                                <input
                                    className="input-field"
                                    id="nombre"
                                    type="text"
                                    value={modalMunicipio.nombre}
                                    onChange={(e) =>
                                        setModalMunicipio({
                                            ...modalMunicipio,
                                            nombre: e.target.value
                                        })
                                    }
                                /></div>

                            <div className="div-input div-input-search-select">
                                <div className="select-options-input">

                                    {departamentos.map((key, index) => {
                                        if (modalMunicipio.departamentos_id) {
                                            !dataSelect.departamentos_id ? dataSelect.departamentos_id = {} : ""; dataSelect.departamentos_id.value = modalMunicipio.departamentos_id
                                            if (key.id == modalMunicipio.departamentos_id) {
                                                !dataSelect.departamentos_id ? dataSelect.departamentos_id = {} : ""; dataSelect.departamentos_id.referencia = key.nombre
                                            }
                                        }

                                        return <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("departamentos_id").value = key.nombre; !dataSelect.departamentos_id ? dataSelect.departamentos_id = {} : ""; dataSelect.departamentos_id.value = key.id; clearFocusInput("departamentos_id") }} key={key.id}>{key.nombre}</div>
                                    })}
                                </div>
                                <input defaultValue={dataSelect.departamentos_id ? dataSelect.departamentos_id.referencia ? dataSelect.departamentos_id.referencia : "" : ""} className="input-search" type="text" id="departamentos_id" />
                                <label htmlFor="departamentos_id" className="labeledit" >Departamento</label>

                            </div>
                            <button
                                className="btn-act-municipio "
                                onClick={() => {
                                    handleEditUser({
                                        departamentos_id: dataSelect.departamentos_id ? dataSelect.departamentos_id.value : ""
                                    })
                                }}
                            >
                                Actualizar
                            </button>
                            <button
                                className="close-modal-municipio"
                                onClick={closeEditarModal}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isRegistrarModalOpen && (
                <div className="div-modal">
                    <div  className="fondo-modal"></div>
                    <div className="table-register-municipio">
                        <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                            Registrar Municipio
                        </h1>
                        <form
                            className="contenido-regi"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleRegistrar({
                                    nombre: nombre.current.value,
                                    departamentos_id: dataSelect.departamentos_id ? dataSelect.departamentos_id.value : ""
                                });
                            }}
                            method="post"
                        >


                            <div className="div-input">
                                <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                                <label htmlFor="nombre">Nombre</label>
                            </div>

                            <div className="div-input div-input-search-select">
                                <input className="input-search" type="text" id="departamentos_id" />
                                <label htmlFor="departamentos_id" >Departamento</label>
                                <div className="select-options-input">
                                    {departamentos.map((key, index) => (
                                        (

                                            <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("departamentos_id").value = key.nombre; !dataSelect.departamentos_id ? dataSelect.departamentos_id = {} : ""; dataSelect.departamentos_id.value = key.id; clearFocusInput("departamentos_id") }} key={key.id}>{key.nombre}</div>
                                        )
                                    ))}
                                </div>
                            </div>
                            <button
                                className="btn-register-municipio"
                                type="submit"
                            >
                                Registrar municipio
                            </button>
                            <button
                                className="close-modal-municipio"
                                onClick={closeRegistrarModal}
                            >
                                X
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Municipio;
