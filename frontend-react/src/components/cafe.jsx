import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";
import "../style/cafe.css";
import $ from "jquery";
import "bootstrap"
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import api from "../services/api";


const Cafe = () => {
    const [cafes, setCafes] = useState([]);
    const [selectedCafeId, setSelectedCafeId] = useState(null);
    const [modalCafe, setModalCafe] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [lote, setLotes] = useState([]);
    const [variedades, setvariedades] = useState([]);
    const [dataSelect, setDataSelect] = useState({});   


    const lotes_id = useRef();


    const variedades_id = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarcafe = async () => {
            try {
                const response = await Api.get('cafe/listar');
                setCafes(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarcafe();
    }, []);

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


    const openModal = async (cafeId) => {
        setSelectedCafeId(cafeId);
        try {
            const response = await Api.get(`/cafe/buscar/${cafeId}`);
            setModalCafe(response.data[0]);
        } catch (error) {
            console.error('Error buscando el cafe', error);
        }
    };

    const closeModal = () => {
        setSelectedCafeId(null);
        setModalCafe(null);
    };

    const handleActualizar = async (data) => {
        try {

            const actualizar = await Api.put(`/cafe/actualizar/${selectedCafeId}`, data);
            console.log(actualizar, data)
            if (actualizar.data.status == false) {
                let keys = Object.keys(actualizar.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(actualizar.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = actualizar.data.errors[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            } else {
                Sweet.actualizacionExitosa();
                closeModal();

            }
            // Recargar la lista de Cafes después de la actualización
            const response = await Api.get("cafe/listar");
            setCafes(response.data);
        } catch (error) {
            console.error("Error editando el Cafe: ", error);
        }
    };
    const handleEditUser2 = async () => {
        const result = await Sweet.confimarDeshabilitar({
        });
        if (result.isConfirmed) {
            try {
                await Api.patch(`/cafe/desactivar/${selectedCafeId}`, modalCafe);
                closeModal();
                // Recargar la lista de cafes después de la desactivación
                const response = await Api.get("cafe/listar");
                setCafes(response.data);
            } catch (error) {
                console.error("Error desactivando el Cafe: ", error);
            }
        }
    };
    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/cafe/activar/${selectedCafeId}`, modalCafe);
                closeModal();
                // Recargar la lista de cafes después de la activación
                const response = await Api.get("cafe/listar");
                setCafes(response.data);
            } catch (error) {
                console.error("Error activando el cafe: ", error);
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
        const CafeData = {
            ...data
        };


        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            const data = await Api.post("cafe/registrar", CafeData, headers);
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
                const response = await Api.get("cafe/listar");
                setCafes(response.data);
                location.href = "/cafe"
            }

        } catch (error) {
            console.error("Error al registrar el cafe:", error);
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
    }, [openModal]);

    const dataTableRef = useRef(null);
    const initializeDataTable = (Cafes) => {
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
        if (cafes.length > 0) {
            initializeDataTable(cafes);
        }
    }, [cafes]);



    return (<>


        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>




        <div className="bgr-c">
            <div className="container-list-cafe">
                <h1 className="title-cafe"> Listado de  cafe</h1>



                <div className="container-fluid w-full">
                    <button to="/cafe/registrar" className="btn-register-cofee" onClick={openRegistrarModal}>
                        Añadir
                    </button>

                    <table className="table table-stripped table-bordered border display reponsive nowrap b-4 bg-white" ref={dataTableRef}>

                        <thead>
                            <tr className="bg-gray-200">
                                <th>id</th>
                                <th>Propietario</th>
                                <th>finca</th>
                                <th>Municipio</th>
                                <th>lote</th>
                                <th>variedad</th>
                                <th>Estado</th>
                                <th>opciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cafes
                                .map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td>{task.id}</td>
                                        <td>{task.nombre_usuario}</td>
                                        <td>{task.nombre_finca}</td>
                                        <td>{task.nombre_municipio}</td>
                                        <td>{task.numero_lote}</td>
                                        <td>{task.nombre_variedad}</td>
                                        <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-act-cafe"
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
            </div>
        </div>

        {modalCafe && (
            <div className="div-modal">
                <div onClick={closeModal} className="fondo-modal"></div>
                <div className="table-register-cafe">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Cafe</h1>
                    <div className="max-w-xs">

                        <div className="div-input div-input-search-select">
                            <div className="select-options-input">

                                {lote.map((key, index) => {
                                    if (modalCafe.lotes_id) {
                                        !dataSelect.lotes_id ? dataSelect.lotes_id = {} : ""; dataSelect.lotes_id.value = modalCafe.lotes_id
                                        if (key.id == modalCafe.lotes_id) {
                                            !dataSelect.lotes_id ? dataSelect.lotes_id = {} : ""; dataSelect.lotes_id.referencia = key.Nombre_Finca + ", " + key.nombre
                                        }
                                    }

                                    return <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("lotes_id").value = key.Nombre_Finca + ", " + key.nombre; !dataSelect.lotes_id ? dataSelect.lotes_id = {} : ""; dataSelect.lotes_id.value = key.id; clearFocusInput("lotes_id") }} key={key.id}>{key.Nombre_Finca + ", " + key.nombre}</div>
                                })}
                            </div>
                            <input defaultValue={dataSelect.lotes_id ? dataSelect.lotes_id.referencia ? dataSelect.lotes_id.referencia : "" : ""} className="input-search" type="text" id="lotes_id" />
                            <label htmlFor="lotes_id" >Lote</label>

                        </div>


                        <div className="div-input div-input-search-select">
                            <div className="select-options-input">

                                {variedades.map((key, index) => {
                                    if (modalCafe.variedades_id) {
                                        !dataSelect.variedades_id ? dataSelect.variedades_id = {} : ""; dataSelect.variedades_id.value = modalCafe.variedades_id
                                        if (key.id == modalCafe.variedades_id) {
                                            !dataSelect.variedades_id ? dataSelect.variedades_id = {} : ""; dataSelect.variedades_id.referencia = key.nombre
                                        }
                                    }

                                    return <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("variedades_id").value = key.nombre; !dataSelect.variedades_id ? dataSelect.variedades_id = {} : ""; dataSelect.variedades_id.value = key.id; clearFocusInput("variedades_id") }} key={key.id}>{key.nombre}</div>
                                })}
                            </div>
                            <input defaultValue={dataSelect.variedades_id ? dataSelect.variedades_id.referencia ? dataSelect.variedades_id.referencia : "" : ""} className="input-search" type="text" id="variedades_id" />
                            <label htmlFor="variedades_id" >variedad</label>

                        </div>
                        <button
                            className="btn-act-cafe"
                            onClick={() => {
                                handleActualizar({
                                    variedades_id: dataSelect.variedades_id ? dataSelect.variedades_id.value : "",
                                    lotes_id: dataSelect.lotes_id ? dataSelect.lotes_id.value : ""
                                })
                            }}
                        >
                            Actualizar
                        </button>
                        {modalCafe.estado === 1 ? (
                            <button
                                className="btn-desactivar"
                                onClick={handleEditUser2}
                            >
                                Desactivar
                            </button>
                        ) : (
                            <button
                                className="btn-activar"
                                onClick={handleEditUser3}
                            >
                                Activar
                            </button>
                        )}
                        <button
                            className="close-modal-cafe"
                            onClick={closeModal}
                        >
                            x
                        </button>
                    </div>
                </div>
            </div>
        )}

        {isRegistrarModalOpen && (
            <div className="div-modal">
                <div onClick={closeRegistrarModal} className="fondo-modal"></div>
                <div className="table-register-cafe">
                    <h1 className="">
                        Registrar Cafe
                    </h1>

                    <form
                        className="contenido-regi"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrar({
                                variedades_id: dataSelect.variedades_id ? dataSelect.variedades_id.value : "",
                                lotes_id: dataSelect.lotes_id ? dataSelect.lotes_id.value : ""
                            });
                        }}
                        method="post"
                    >

                        <div className="div-input div-input-search-select">
                            <input className="input-search" type="text" id="lotes_id" />
                            <label htmlFor="lotes_id" >Lote</label>
                            <div className="select-options-input">
                                {lote.map((key, index) => (
                                    (
                                        <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("lotes_id").value = key.Nombre_Finca + ", " + key.nombre; !dataSelect.lotes_id ? dataSelect.lotes_id = {} : ""; dataSelect.lotes_id.value = key.id; clearFocusInput("lotes_id") }} key={key.id}>{key.Nombre_Finca + ", " + key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>
                        <div className="div-input div-input-search-select">
                            <input className="input-search" type="text" id="variedades_id" />
                            <label htmlFor="variedades_id" >Variedad</label>
                            <div className="select-options-input">
                                {variedades.map((key, index) => (
                                    (

                                        <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("variedades_id").value = key.nombre; !dataSelect.variedades_id ? dataSelect.variedades_id = {} : ""; dataSelect.variedades_id.value = key.id; clearFocusInput("variedades_id") }} key={key.id}>{key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>

                        <button className="btn-register-cafe"
                            type="submit">Registrar Cafe</button>
                        <button
                            className="close-modal-cafe"
                            onClick={closeRegistrarModal}
                        >
                            X
                        </button>
                    </form>
                </div>
            </div>
        )}

    </>
    )
}

export default Cafe