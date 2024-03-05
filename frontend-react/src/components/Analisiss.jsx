import React, { useEffect, useRef, useState } from "react";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';
import esES from "../languages/es-ES.json"
  import $ from "jquery";
  import "bootstrap";
  import "datatables.net";
  import "datatables.net-bs5";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import "datatables.net-bs5/css/DataTables.bootstrap5.min.css";
 
  import "datatables.net-responsive";
  import "datatables.net-responsive-bs5";
  import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";




const Analisis = () => {
    
    const [analisis, setAnalisis] = useState([]);
    const [key, setKey] = useState(0);
    const [ModalTipoAnalisis, setModalTipoAnalisis] = useState(null);
    const [ModalMuestras, setModalMuestras] = useState(null);
    const [muestraId, setMuestraId] = useState(null);
    const [SelectedMuestraId, setSelectedMuestraId] = useState(null);
    const [selectAnalisisid, setselectAnalisisid] = useState(null);
    const [modalAnalisis, setModalAnalisis] = useState(null);
    const [aRegistrarModalOpen, setaRegistrarModalOpen] = useState(false)
    const [tipos_analisis, settipoAnalisis] = useState([]);
    const [muestras, setMuestra] = useState([]);
    const [tipo_analisis, settipo_analisis] = useState([]);
    const [usuarios, setUsuario] = useState([]);
    const [datasSelect, setDataSelect] = useState({});


    const tipo_analisis_id = useRef();
    const muestras_id = useRef();
    const usuarios_id = useRef();



    const navigate = useNavigate()


    useEffect(() => {
        const buscarAnalisis = async () => {
            try {
                const response = await Api.get('analisis/listar');
                setAnalisis(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarAnalisis();
    }, []);

    // useEffect(() => {
    //     const buscartiposAnalisis = async () => {
    //         try {
    //             const response = await Api.get("analisis/listar");
    //             settipoAnalisis(response.data);
    //         } catch (error) {
    //             console.error("Error fetching tasks:", error);
    //         }
    //     };
    //     buscartiposAnalisis();
    // }, []);

    useEffect(() => {
        const buscarMuestras = async () => {
            try {
                const response = await Api.get('muestra/listar');
                setMuestra(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarMuestras();
    }, []);
    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                console.log(response,"usuariissss")
                setUsuario(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarUsuarios();
    }, []);
    const openModal = async (anaId) => {
        setselectAnalisisid(anaId);
        try {
            const response = await Api.get(`/analisis/buscar/${anaId}`);
            setModalAnalisis(response.data[0]);
        } catch (error) {
            console.error('Error buscando el analisis', error);
        }
    };
    const handleEditUser1 = async (data) => {
        try {

            const actualizar = await Api.put(`/analisis/update/${selectAnalisisid}`, data);
            console.log(actualizar, data)
            if (actualizar.data.status == false) {
                let keys = Object.keys(actualizar.data.err)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(actualizar.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = actualizar.data.err[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            } else {
                Sweet.registroExitoso("/home/analisis");
                closeModalEdit(true);

            }
            const response = await Api.get("analisis/listar");
            setAnalisis(response.data);
        } catch (error) {
            console.error("Error editando el Analisis: ", error);
        }
    };
    const handleEditUser2 = async () => {
        const result = await Sweet.confimarDeshabilitar({
            
        });
        if (result.isConfirmed) {
            try {
                await Api.patch(`analisis/desactivar/${selectAnalisisid}`, modalAnalisis);
                closeModalEdit();
                const response = await Api.get("analisis/listar");
                setAnalisis(response.data);
            } catch (error) {
                console.error("Error desactivando el Analisis: ", error);
            }
        }
    };
    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/analisis/activar/${selectAnalisisid}`, modalAnalisis);
                closeModalEdit();
                const response = await Api.get("analisis/listar");
                setAnalisis(response.data);
                }catch (error) {
                console.error("Error activando el analisis: ", error);
                }
        }
    };



    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const closeModalEdit = () => {
        setselectAnalisisid(null);
        setModalAnalisis(null);
    };

    const openRegistrarAnalisisModal = () => {
        setaRegistrarModalOpen(true);
    };

    const closeRegistrarAnalisisModal = () => {
        setaRegistrarModalOpen(false);
    };

    const handleRegistrarAnalisis = async (data) => {
        console.log(data, "data")
        const AnalisisDta= {
            ...data
        };
        const headers = {
            headers: {
                token: "xd",
            },
        };
        try {
            const data = await Api.post("analisis/registrar", AnalisisDta, headers);
            if (data.data.status == false) {
                let keys = Object.keys(data.data.err)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(data.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = data.data.err[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            } else {
                Sweet.registroExitoso();
                console.log(data.data)
                
       
                const response = await Api.get("analisis/listar");
                setAnalisis(response.data);
                location.href = "/home/analisis"
                }
                // console.log(data,"tiposssssss")
                // const response = await Api.get("analisis/listar");
                //  setAnalisis(response.data);
        } catch (error) {
            console.error("Error al registrar el analisis:", error);
        }
    };
    
    function clearFocusInput(Element) {
        let inputSearch = document.getElementById(Element)

        if (inputSearch) {

            let divOptions = inputSearch.parentNode.querySelectorAll(".select-option-input-d");
            if (divOptions.length > 0) {
                divOptions[0].style.display = "none"
            }
            let select = inputSearch.parentNode.querySelectorAll(".option-select-ana")
            for (let s = 0; s < select.length; s++) {
                let elementvalue = inputSearch.getAttribute("id")

                if (datasSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")) {
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
                    let options = divOptions[s].querySelectorAll(".select-option-input-d")
                    if (options.length > 0) {
                        options[0].style.display = "none"
                    }
                }
            }
        })
    }, [])

    function searchInput() {
        let inputSearch = document.querySelectorAll(".input-search-d")


        if (inputSearch.length > 0) {
            for (let s = 0; s < inputSearch.length; s++) {

                inputSearch[s].addEventListener("input", function () {
                    let parent = inputSearch[s].parentNode
                    if (parent) {
                        let selectOptionsInput = parent.querySelectorAll(".select-option-input-d");
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
                                    if (!datasSelect[inputSearch[s].getAttribute("data-id")]) {
                                        datasSelect[inputSearch[s].getAttribute("data-id")] = {}
                                    }
                                    datasSelect[inputSearch[s].getAttribute("data-id")].value = options[o].getAttribute("data-id")
                                    options[o].classList.add("option-select-focus")
                                    if (!datasSelect[referencia]) {
                                        datasSelect[referencia] = {}
                                    }
                                    datasSelect[referencia]["value"] = options[o].getAttribute("data-id");
                                    options[o].parentNode.style.display = "none"
                                    break
                                } else {
                                    if (!datasSelect[referencia]) {
                                        datasSelect[referencia] = {}
                                    }
                                    datasSelect[referencia]["value"] = "";
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
    }, [aRegistrarModalOpen]);
    useEffect(() => {

        searchInput()
    }, [openModal]);

    const dataTableRef = useRef(null);
    const initializeDataTable = (analisis) => {
        $(document).ready(function () {
            $(dataTableRef.current).DataTable({
                columnDefs:[
                    {
                        targets:-1,
                        responsivePriority:1
                      }
                  ],
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
        setKey(key + 1)
        if (analisis.length > 0) {
            initializeDataTable(analisis);
        }
    }, [analisis]);

    return (

        <>

        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      
                <div className="contTitle">
                    <h1 className="titleanalisis">Análisis</h1>
                    <button to="/analisis/registrar" className="btn-registrar-d" onClick={openRegistrarAnalisisModal}>
                    Añadir
                    </button>
                </div>
            
                <div className="tablaAnalisis">    
                    <div className="container-fluid w-full" key={key}>
                    <table id="table-d" style={{ width: "100%" }}className=" table table-stripped  border display reponsive nowrap b-4 bg-white" ref={dataTableRef}>
                        <thead>
                            <tr className="bg-gray-200">
                            <th>id</th>
                            <th>Fecha </th>
                            <th>Tipo Análisis </th>
                            <th>Consecutivo Informe </th>
                            <th>Catador</th>
                            <th>Estado </th>
                            <th>Propietario </th>
                            <th>Finca </th>
                            <th>Lote </th>
                            <th>Variedad</th>
                            <th>Opciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                        {analisis.map((task) => (
                                <tr key={task.id_analisis}>
                                    <td>{task.id_analisis}</td>
                                    <td>{task.fecha_analisis=formatDate(task.fecha_analisis)}</td>
                                    <td>{task.nombre_tipo_analisis}</td>
                                    <td className="conse" >{task.codigo_externo}</td>
                                    <td>{task.nombre_usuario}</td>
                                    <td className="cont-estado">{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                    <td>{task.propietario}</td>
                                    <td>{task.nombre_fincas}</td> 
                                    <td>{task.nombre_lotes}</td> 
                                    <td>{task.nombre_variedades}</td> 
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-actualizar-mod"
                                            onClick={() => openModal(task.id_analisis)}
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

        {modalAnalisis && (
            <div className="tablaEditAna">
                {/* <div onClick={closeModalEdit} className="overlay-edit"></div> */}
                    <div className="Editcampos">
                    <h1 className="titleEditAna">Editar Análisis</h1><br />
                   
                            <br /><div className="div-input-d div-input-search-select">
                           
                                <div className="select-option-input-d">
                                {muestras.map((key, index) => {
                                        if (modalAnalisis.muestras_id) {
                                            !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.value = modalAnalisis.muestras_id
                                            if (key.id == modalAnalisis.muestras_id) {
                                                !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.referencia = key.codigo_externo
                                            }
                                        }

                                        return <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("muestras_id").value = key.codigo_externo; !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.value = key.id; clearFocusInput("muestras_id") }} key={key.id}>{key.codigo_externo}</div>
                                    })}
                                </div>
                                <input defaultValue={datasSelect.muestras_id ? datasSelect.muestras_id.referencia ? datasSelect.muestras_id.referencia : "" : ""} className="" type="text" id="muestras_id" />
                                <label htmlFor="muestras_id" className="labelEdit">Muestras</label>

                            </div><br />
                            <div className="div-input-d div-input-search-select">
                           
                                <div className="select-option-input-d">

                                    {usuarios.map((key, index) => {
                                        if (modalAnalisis.usuarios_id) {
                                            !datasSelect.usuarios_id ? datasSelect.usuarios_id = {} : ""; datasSelect.usuarios_id.value = modalAnalisis.usuarios_id
                                            if (key.id == modalAnalisis.usuarios_id) {
                                                !datasSelect.usuarios_id ? datasSelect.usuarios_id = {} : ""; datasSelect.usuarios_id.referencia = key.nombre
                                            }
                                        }

                                        return <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("usuarios_id").value = key.nombre; !datasSelect.usuarios_id ? datasSelect.usuarios_id = {} : ""; datasSelect.usuarios_id.value = key.id; clearFocusInput("usuarios_id") }} key={key.id}>{key.nombre}</div>
                                    })}
                                </div>
                                <input className="input-search-d" defaultValue={datasSelect.usuarios_id ? datasSelect.usuarios_id.referencia ? datasSelect.usuarios_id.referencia : "" : ""}  type="text" id="muestras_id" />
                                <label htmlFor="usuarios_id"  className="labelEdit">Catador</label>
                            </div>
                            <button
                            className="btn-actualizar-d"
                            onClick={() => {
                                handleEditUser1({
                                    muestras_id: datasSelect.muestras_id ? datasSelect.muestras_id.value : "",
                                    usuarios_id: datasSelect.usuarios_id ? datasSelect.usuarios_id.value : ""
                                })
                            }}
                            >
                                Actualizar
                            </button>
                            {modalAnalisis.estado === 1 ? (
                                <button
                                    className="btn-desactivar-d"
                                    onClick={handleEditUser2}
                                >
                                    Desactivar
                                </button>
                            ) : (
                                <button
                                    className="btn-activar-d"
                                    onClick={handleEditUser3}
                                >
                                    Activar
                                </button> 
                            )}
                            <button
                                className="close-modal-Edit"
                                onClick={closeModalEdit}
                            >
                                X
                            </button>
                            </div>

            </div>
        )}

            {aRegistrarModalOpen && (
                <div className="overlay-d" onClick={closeRegistrarAnalisisModal}></div>
            )}
            {aRegistrarModalOpen && (
                <div className="contRegistrarAna">
                    <h1 className="titleRegistrar">
                        Registrar Análisis
                    </h1>

                    <form
                        className="formRegiAna"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrarAnalisis({
                
                                tipo_analisis_id: datasSelect.tipo_analisis_id ? datasSelect.tipo_analisis_id.value:"",
                                muestras_id: datasSelect.muestras_id ? datasSelect.muestras_id.value:"",
                                usuarios_id: datasSelect.usuarios_id ? datasSelect.usuarios_id.value:""
                            });
                        }}
                        method="post"
                    >
                        
                        <div className="div-input-d-select div-input-search-select ">
                        <label className="select-div-tip" htmlFor="tipo_analisis_id">Tipo Análisis</label>
                            <select className="select-tipe" name="tipo_analisis_id" id="1">
                                <option value="1">Fisico</option>
                            </select>
                        </div>
                        <div className="div-input-d div-input-search-select">
                            <input className="input-search-d" type="text" id="muestras_id"ref={muestras_id} />
                            <label htmlFor="muestras_id"  className='label'>Muestra</label>
                            <div className="select-option-input-d">
                                {muestras.map((key, index) => (
                                    (
                                        <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("muestras_id").value = key.codigo_externo; !datasSelect.muestras_id ? datasSelect.muestras_id = {} : "";datasSelect.muestras_id.value = key.id; clearFocusInput("muestras_id") }} key={key.id}>{key.codigo_externo}</div>
                                    )
                                ))}
                            </div>
                        </div>
                        <div className="div-input-d div-input-search-select">
                            <input className="input-search-d" type="text" id="usuarios_id" ref={usuarios_id} />
                            <label htmlFor="usuarios_id" className='label'>Catador</label>
                            <div className="select-option-input-d">
                                {usuarios.map((key, index) =>(
                                    (
                                        <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("usuarios_id").value = key.nombre; !datasSelect.usuarios_id ? datasSelect.usuarios_id = {} : ""; datasSelect.usuarios_id.value = key.id; clearFocusInput("usuarios_id") }} key={key.id}>{key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>

                        <button className="btn-register-d"
                            type="submit">Registrar</button>
                        <button
                            className="close-modal-Ana"
                            onClick={closeRegistrarAnalisisModal}
                        >
                            X
                        </button>
                    </form>
                </div>
            )}
    </>

    )
}


export default Analisis