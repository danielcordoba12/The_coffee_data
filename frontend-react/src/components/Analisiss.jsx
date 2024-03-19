import React, { useEffect, useRef, useState } from "react";
import Api from "../services/Api";
import Sweet from "../helpers/Sweet";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';
import esES from "../languages/es-ES.json"
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import { Alert } from "bootstrap";




const Analisis = (user) => {

    const [analisis, setAnalisis] = useState([]);
    const [catadores, setCatadores] = useState([]);
    const [statusSelect, setStatusSelect] = useState({});
    const [key, setKey] = useState(0);
    const [ModalTipoAnalisis, setModalTipoAnalisis] = useState(null);
    const [ModalMuestras, setModalMuestras] = useState(null);
    const [muestraId, setMuestraId] = useState(null);
    const [SelectedMuestraId, setSelectedMuestraId] = useState(null);
    const [selectAnalisisid, setselectAnalisisid] = useState(null);
    const [modalAnalisis, setModalAnalisis] = useState(null);
    const [aRegistrarModalOpen, setaRegistrarModalOpen] = useState(false)
    const [modalCatador, setModalCatador] = useState(false)
    const [tipos_analisis, settipoAnalisis] = useState([]);
    const [muestras, setMuestra] = useState([]);
    const [tipo_analisis, settipo_analisis] = useState([]);
    const [usuarios, setUsuario] = useState([]);
    const [datasSelect, setDataSelect] = useState({});
    const [inputValue, setInputValue] = useState('');



    const tipo_analisis_id = useRef();
    const muestras_id = useRef();
    const usuarios_id = useRef();


    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);


    const navigate = useNavigate()

    useEffect(() => {

        buscarAnalisis();
        buscarMuestras();
        buscarUsuarios();

    }, []);


    const buscarAnalisis = async () => {
        try {
            const response = await Api.get('analisis/listar', {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setAnalisis(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const buscarMuestras = async () => {
        try {
            const response = await Api.get('muestra/listar', {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setMuestra(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }


    const buscarUsuarios = async () => {
        try {
            const response = await Api.get('usuario/listar/catador');
            console.log(response, "usuariissss")
            setUsuario(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
    const buscarcatador = async (anaId) => {
    try {
        const response = await Api.get(`catador/buscar/${anaId}`);
        setCatadores(response.data);
    } catch (error) {
        console.error('Error buscando el analisis', error);
    }

};


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
            setModalAnalisis({})
            const actualizar = await Api.put(`/analisis/update/${selectAnalisisid}`, data);
            console.log(datasSelect, actualizar, data, "dataaaaaaaaaaaaaaaaaaa")
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
                closeModalEdit();
                buscarAnalisis();

            }

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
                buscarAnalisis();
            } catch (error) {
                console.error("Error desactivando el Analisis: ", error);
            }
        }
    };
    const handleEditUser3 = async (analisis,catador) => {
        Sweet.confimarHabilitar().then(async (result) => {
            if (result.isConfirmed) {

            try {
                
                await Api.patch(`/catador/activar/analisis/${catador}/catador/${analisis}`);
            closeModalCatador();
                    
                if(data.status == 200) {
                    Sweet.habilitacionExitosa();
                    buscarUsuarios();
                    closeModalCatador();

                }

                    if(data.status == 404) {
                        Sweet.habilitacionFallida(); 
                    }
                closeModalEdit();

            } catch (error) {
                console.error("Error activando el analisis: ", error);
            }
        }
            })

            buscarcatador(analisis);


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

    
    const openModalCatador = () => {
        setModalCatador(true);
    };
    const closeModalCatador = () => {
        setModalCatador(false);
    };

    const handleRegistrarAnalisis = async (data) => {
        const AnalisisDta = {
            muestras_id: data.muestras_id,
            tipo_analisis_id: data.tipo_analisis_id,
            usuarios_id: datasSelect.usuarios_id
        };
        // console.log("datos" , datasSelect.usuarios_id[0].id);
        console.log("datos" , AnalisisDta);

        
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
                buscarAnalisis();
                Sweet.registroExitoso();
                closeRegistrarAnalisisModal();

            }

            // setAnalisis(response.data);
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
                // Ocultar todas las opciones
                divOptions.forEach(div => div.style.display = "none");
            }
    
            let select = inputSearch.parentNode.querySelectorAll(".option-select-ana")
            for (let s = 0; s < select.length; s++) {
                let elementvalue = inputSearch.getAttribute("id");
    
                // Verificar si el valor de select[s] está presente en datasSelect
                if (datasSelect[elementvalue] && datasSelect[elementvalue].value == select[s].getAttribute("data-id")) {
                    select[s].classList.add("option-select-focus");
                } else {
                    select[s].classList.remove("option-select-focus");
                }
            }
        }
    }
    
    // useEffect(() => {
    //     window.addEventListener("click", function (e) {
    //         let divOptions = document.querySelectorAll(".div-input-search-select");
    //         for (let s = 0; s < divOptions.length; s++) {
    //             if (!e.target == divOptions[s] || !divOptions[s].contains(e.target)) {
    //                 let options = divOptions[s].querySelectorAll(".select-option-input-d")
    //                 if (options.length > 0) {
    //                     options[0].style.display = "none"
    //                 }
    //             }
    //         }
    //     })
    // }, [])

    useEffect(() => {
        setInputValue(getSelectedNames()); // Actualizar el valor del input cuando cambia el estado datasSelect
    }, [datasSelect]);

    function getSelectedNames() {
        if (!datasSelect.usuarios_id) return ''; // Si no hay usuarios seleccionados, devolver una cadena vacía
        return datasSelect.usuarios_id.map(user => user?.name || '').join(', '); // Obtener los nombres de los usuarios seleccionados y unirlos con una coma
    }
    
    function handleInputChange(event) {
        setInputValue(event.target.value); // Actualizar el valor del input con cada cambio
    }

    function searchInput() {
        let inputSearch = document.querySelectorAll(".input-search-d");

        if (inputSearch.length > 0) {
            inputSearch.forEach(input => {
                input.addEventListener("input", function () {
                    let parent = input.parentNode;
                    if (parent) {
                        let selectOptionsInput = parent.querySelector(".select-option-input-d");
                        if (selectOptionsInput) {
                            selectOptionsInput.style.display = "block";
                            let options = selectOptionsInput.querySelectorAll("div");
                            let inputValue = input.value.toLowerCase();
                            let commaIndex = inputValue.lastIndexOf(",");
                            let searchValue = inputValue.substring(commaIndex === -1 ? 0 : commaIndex + 1).trim();
                            
                            options.forEach(option => {
                                if (option.innerHTML.toLowerCase().includes(searchValue)) {
                                    option.style.display = "block";
                                } else {
                                    option.style.display = "none";
                                }

                                if (option.innerHTML.toLowerCase() === searchValue) {
                                    let referencia = input.getAttribute("id");
                                    let dataId = option.getAttribute("data-id");

                                    // Actualizamos el estado datasSelect para agregar el nuevo valor
                                    setDataSelect(prevState => ({
                                        ...prevState,
                                        [referencia]: [...(prevState[referencia] || []), dataId]
                                    }));
                                    
                                    // Resto del código para manejar las opciones seleccionadas
                                    // clearFocusInput(referencia);
                                } 
                                // else {
                                //     clearFocusInput(referencia);
                                // }
                            });
                        }
                    }
                });
            });
        }
        console.log(datasSelect);
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
                columnDefs: [
                    {
                        targets:-1,
                        responsivePriority:1
                    }
                ],
                lengthMenu: [5, 10, 20, 30, 40, 50],
                processing: true,
                pageLength: 5,
                language: esES,
                responsive: true,
            });
        });
        
        dataTableRef




        return () => {
            $(dataTableRef.current).DataTable().destroy(true);
        };
    };

    /////////////////// DATA TABLE CAFETERO////////////////////
    

    useEffect(() => {
        setKey(key + 1)
        if (analisis.length > 0) {
            initializeDataTable(analisis);
        }
    }, [analisis]);


    const agregarUsuario = (usuario) => {
        if (usuariosSeleccionados.length < 5) {
            setUsuariosSeleccionados([...usuariosSeleccionados, usuario]);
        }
    };
    return (

        <>

            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

            <div className="contTitle">
                <h1 className="titleanalisis">Análisis</h1>
                {user.user ? user.user.rol == 'administrador' ?
                    <button to="/analisis/registrar" className="btn-registrar-d" onClick={() => {
                        openRegistrarAnalisisModal();
                        setDataSelect({})

                    }}>
                        Añadir
                    </button>
                    : '' : ''}
            </div>

            <div className="tablaAnalisis">
                <div className="container-fluid w-full" key={key}>
                    <table id="table-d" style={{ width: "100%" }} className="table table-hover rounded-3 overflow-hidden display responsive nowrap shadow" ref={dataTableRef}>
                        <thead>
                            <tr className="bg-black-200">
                                <th className="text-muted">id</th>
                                <th className="text-muted">Fecha </th>
                                <th className="text-muted">Tipo Análisis </th>
                                <th className="text-muted">Consecutivo Informe </th>
                                <th className="text-muted">Propietario</th>
                                <th className="text-muted">Finca </th>
                                <th className="text-muted">Lote </th>
                                <th className="text-muted"> Variedad </th>
                                <th className="text-muted">Catadores </th>
                                <th className="text-muted">Estado</th>
                                {user.user ? user.user.rol == 'administrador' ?
                                    <th className="text-muted"> Opciones</th>
                                    : '' : ''}
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200 text-center">
                            { analisis.length > 0 ? analisis 
                            .map((task) => (
                                <tr key={task.id_analisis}>
                                    <td className="text-muted">{task.id_analisis}</td>
                                    <td className="text-muted">{task.fecha_analisis = formatDate(task.fecha_analisis)}</td>
                                    <td className="text-muted">{task.nombre_tipo_analisis}</td>
                                    <td className="text-muted" >{task.codigo_externo}</td>

                                    <td className="text-muted">{task.propietario}</td>
                                    <td className="text-muted">{task.nombre_fincas}</td>
                                    <td className="text-muted">{task.nombre_lotes}</td>
                                    <td className="text-muted">{task.nombre_variedades}</td>

                                    <td>
                                        <button
                                            type="button"
                                            className="btn-actualizar-mod rounded-3"
                                            onClick={() =>{openModalCatador(),buscarcatador(task.id_analisis)}}
                                        >
                                            Catadores 
                                        </button>
                                    </td>
                                    <td className="text-muted">
                                    {task.estado === 0 ? (
                                        <button
                                        className="btn-activar"
                                        onClick={() => { setUpdateModal(true); activarMuestra(task.id)}}
                                        >
                                        Finalizado
                                        </button>

                                        
                                        ) : (
                                            <button
                                            className="btn-desactivar"
                                            onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                                        >
                                            Pendiente
                                        </button>
                                            
                                        )}     
                                    </td>                                    {user.user ? user.user.rol == 'administrador' ? 
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-actualizar-mod rounded-3"
                                            onClick={() => openModal(task.id_analisis)}
                                        >
                                            Modificar
                                        </button>
                                    </td>
                                    : '' : ''}
                                </tr>
                            )): <tr><td colSpan={999999999999} className="p-5 text-center">{analisis.message}</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalAnalisis && (
                <div className="tablaEditAna">
                    <div className="overlay-edit"></div>
                    <div className="contEditAna">
                        <h1 className="titleEditAna">Editar Análisis</h1><br />

                        <div className="EditCampos">
                            <br /><div className="div-input-d div-input-search-select">

                                <div className="select-option-input-d">
                                    {muestras.length > 0 ? muestras
                                        .map((key, index) => {
                                            if (modalAnalisis.muestras_id) {
                                                !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.value = modalAnalisis.muestras_id
                                                if (key.id == modalAnalisis.muestras_id) {
                                                    !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.referencia = key.codigo_externo
                                                }
                                            }

                                            return <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("muestras_id").value = key.codigo_externo; !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.value = key.id; clearFocusInput("muestras_id") }} key={key.id}>{key.codigo_externo}</div>
                                        }) : <tr><td ></td></tr>}
                                </div>
                                <input defaultValue={datasSelect.muestras_id ? datasSelect.muestras_id.referencia ? datasSelect.muestras_id.referencia : "" : ""} className="input-search-d" type="text" id="muestras_id" />
                                <label htmlFor="muestras_id" className="labelEdit">Muestras</label>

                            </div><br />
                            {user.user ? user.user.rol == 'administrador' ?
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

                                    <input className="input-search-d" defaultValue={datasSelect.usuarios_id ? datasSelect.usuarios_id.referencia ? datasSelect.usuarios_id.referencia : "" : ""} type="text" id="usuarios_id" />
                                    <label htmlFor="usuarios_id" className="labelEdit">Catador</label>
                                </div>
                                : '' : ''}
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
                                    className="btn-desactivar-d "
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
                </div>

            )}
            {aRegistrarModalOpen && (
                <div className="overlay-d"></div>
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

                                tipo_analisis_id: datasSelect.tipo_analisis_id ? datasSelect.tipo_analisis_id.value : "",
                                muestras_id: datasSelect.muestras_id ? datasSelect.muestras_id.value : "",
                                // usuarios_id: datasSelect.usuarios_id ? datasSelect.usuarios_id.value : ""

                            });
                        }}
                        method="post"
                    >

                        <div className="div-input-d-select div-input-search-select ">
                            <label className="select-div-tip" htmlFor="tipo_analisis_id">Tipo Análisis</label>
                            <label className="label-tipe-ana" htmlFor="tipo_analisis_id">Fisico</label>

                        </div><br />
                        <div className="div-input-d div-input-search-select">
                            <input className="input-search-d" type="text" id="muestras_id" ref={muestras_id} />
                            <label htmlFor="muestras_id" className='label'>Muestra</label>
                            <div className="select-option-input-d">
                                {muestras.length > 0 ? muestras
                                .map((key, index) => (
                                    (
                                        <div className="option-select-ana" data-id={key.id} onClick={() => { document.getElementById("muestras_id").value = key.codigo_externo; !datasSelect.muestras_id ? datasSelect.muestras_id = {} : ""; datasSelect.muestras_id.value = key.id; clearFocusInput("muestras_id") }} key={key.id}>{key.codigo_externo}</div>
                                    )
                                    
                                )): null}
                            </div>
                        </div>
                        <div className="div-input-d div-input-search-select">
                        <input className="input-search-d" type="text" id="usuarios_id" value={inputValue} onChange={handleInputChange} />

                            <label htmlFor="usuarios_id" className='label'>Catador</label>
                            <div className="select-option-input-d">
                                {usuarios.map((key, index) => (
                                    <div className="option-select-ana" data-id={key.id} onClick={() => { 
                                        const inputValue = key.nombre + ' ' + key.apellido;
                                        setDataSelect(prevState => ({
                                            ...prevState,
                                            usuarios_id: [...(prevState.usuarios_id || []), { id: key.id, name: inputValue }]
                                        }));
                                        clearFocusInput("usuarios_id");
                                    }} key={key.id}>
                                        {key.nombre} {key.apellido}
                                    </div>
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


            {/* //////////////////////////MODAL CATADOR //////////////////////////////////////////7 */}
            
            {modalCatador && (
                <div className="overlay-d"></div>
            )}
            {modalCatador && (
                
                
                <div className="contRegistrarCatador">
                    <button
                            className="close-modal-Ana2"
                            onClick={() => closeModalCatador()}

                        >
                            X
                        </button>
                    <h1 className="titleRegistrar">
                        
                        Catadores
                    </h1>
                
                    {/* <div className="tablaAnalisis"> */}
                <div className="container-fluid w-full" key={key}>
                    
                    <table id="table-d" style={{ width: "100%" }} className="table table-hover rounded-3 overflow-hidden display responsive nowrap shadow" ref={dataTableRef}>
                        
                        <thead>
                            <tr className="bg-black-200">
                                <th hidden>if analisis</th>
                                <th className="text-muted">id</th>
                                <th className="text-muted">Nombre </th>
                                <th className="text-muted">Apellido </th>
                                <th className="text-muted">Estado </th>



                                {user.user ? user.user.rol == 'administrador' ? 
                                <th className="text-muted"> Opciones</th>
                                : '' : ''}
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200 text-center">
                            { catadores.length > 0 ? catadores 
                            .map((task) => (
                                <tr key={task.id}>
                                    <td hidden>{task.analisis_id}</td>
                                    <td className="text-muted">{task.id}</td>
                                    <td className="text-muted">{task.nombre}</td>
                                    <td className="text-muted">{task.apellidos}</td>
                                    <td className="text-muted">                     
                
                    
                                    {task.estado === 0 ? (
                                        <button
                                        className="btn-activar"
                                        onClick={() => {  handleEditUser3(task.analisis_id,task.id)}}
                                        >
                                        Finalizado
                                        </button>

                                        
                                        ) : (
                                            <button
                                            className="btn-desactivar"
                                            onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                                        >
                                            Pendiente
                                        </button>
                                            
                                        )}  
                                    </td>

                                    {user.user ? user.user.rol == 'administrador' ? 
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-actualizar-mod rounded-3"
                                            onClick={() => openModal(task.id_analisis)}
                                        >
                                            Modificar
                                        </button>
                                    </td>
                                    : '' : ''}
                                </tr>
                            )): <tr><td colSpan={999999999999} className="p-5 text-center">{analisis.message}</td></tr>}
                        </tbody>
                        
                        </table>
                </div>
            {/* </div> */}
            

                    
                </div>
                
            )}
        </>

    )
}


export default Analisis