import React, { useEffect, useRef, useState } from "react";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';





const Analisis = () => {
    
    const [analisis, setAnalisis] = useState([]);
    const [selectAnalisisid, setselectAnalisisid] = useState(null);
    const [modalAnalisis, setModalAnalisis] = useState(null);
    const [aRegistrarModalOpen, setaRegistrarModalOpen] = useState(false)
    const [tipos_analisis, settipoAnalisis] = useState([]);
    const [muestras, setMuestra] = useState([]);
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
    const handleEditUser1 = async () => {
        try {
            await Api.put(`analisis/update/${selectAnalisisid}`, modalAnalisis);
            Sweet.actualizacionExitosa();
            closeModal();
            // Recargar la lista de analisis después de la actualización
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
                closeModal();
                // Recargar la lista de Analisis después de la desactivación
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
                closeModal();
                // Recargar la lista de analisis después de la activación
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




    const closeModal = () => {
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
        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            await Api.post("analisis/registrar", data, headers);
            Sweet.registroExitoso();
            closeRegistrarModal();
            // Recargar la lista de analisis después del registro
            const response = await Api.get("analisis/listar");
            setAnalisis(response.data);
        } catch (error) {
            console.error("Error al registrar el analisis:", error);
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
                let elementValue = inputSearch.getAttribute("id")

                if (datasSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")) {
                    select[s].classList.add("option-select-focus")
                } else {
                    select[s].classList.remove("option-select-focus")
                }

            }
        }
    }
    useEffect(() => {

        let inputSearch = document.querySelectorAll(".input-search")

        if (inputSearch.length > 0) {
            for (let s = 0; s < inputSearch.length; s++) {
                inputSearch[s].addEventListener("blur", function () {
                    let divOptions = inputSearch[s].parentNode.querySelectorAll(".select-options-input");
                    if (divOptions.length > 0) {
                        setTimeout(() => {
                            divOptions[0].style.display = "none"
                        }, 110);
                    }

                })
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
                                if (options[o].innerHTML.toLowerCase() == inputSearch[s].value.toLowerCase()) {
                                    let focusSelect = document.querySelectorAll(".option-select-focus")
                                    if (focusSelect.length > 0) {
                                        console.log(focusSelect[0].classList)
                                        focusSelect[0].classList.remove("option-select-focus")
                                    }
                                    inputSearch[s].value = options[o].innerHTML
                                    if (!datasSelect[inputSearch[s].getAttribute("data-id")]) {
                                        datasSelect[inputSearch[s].getAttribute("data-id")] = {}
                                    }
                                    datasSelect[inputSearch[s].getAttribute("data-id")].value = options[o].getAttribute("data-id")
                                    options[o].classList.add("option-select-focus")
                                } else {
                                    options[o].classList.remove("option-select-focus")
                                }
                            }
                        }
                    }
                })
            }
        }
    }, [aRegistrarModalOpen])


    return (
        <>
        {modalAnalisis && <div className="overlay" onClick={closeModal}></div>}
        {aRegistrarModalOpen && (
            <div className="overlay" onClick={closeRegistrarAnalisisModal}></div>
            )}
            
        <div className="tablaprincipal">
            <h1 className="titleanalisis">Analisis</h1>

            <button to="/analisis/registrar" className="btn-registrar-d" onClick={openRegistrarAnalisisModal}>
                Añadir
            </button>

            <table className="tablaprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Fecha</th>
                        <th>Tipo Análisis</th>
                        <th>Consecutivo Informe</th>
                        <th>Asignación</th>
                        <th>Estado</th>
                        <th>Propietario</th>
                        <th>Finca</th>
                        <th>Lote</th>

                    </tr>
                </thead>
                <tbody>
                    {analisis.map((task) => (
                            <tr key={task.id_analisis} className="border-t">
                                <td>{task.id_analisis}</td>
                                <td>{task.fecha_analisis=formatDate(task.fecha_analisis)}</td>
                                <td>{task.nombre_tipo_analisis}</td>
                                <td className="conse" >{task.consecutivo_informe}</td>
                                <td>{task.nombre_usuario}</td>
                                <td className="cont-estado">{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                <td>{task.propietario}</td>
                                <td>{task.nombre_fincas}</td> 
                                <td>{task.nombre_lotes}</td> 
                                <td>
                                    <button
                                        type="button"
                                        className="btn-primary"
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

        {modalAnalisis && (
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Analisis</h1>
                <div className="max-w-xs">
                    <input
                        className="input-field"
                        type="number"
                        placeholder="tipo_analisis_id"
                        value={modalAnalisis.tipo_analisis_id}
                        onChange={(e) => setModalAnalisis({ ...modalAnalisis, tipo_analisis_id: e.target.value })}
                    />

                    <input
                        className="input-field"
                        type="number" placeholder="muestras_id"
                        value={modalAnalisis.muestras_id}
                        onChange={(e) => setModalAnalisis({ ...modalAnalisis, muestras_id: e.target.value })}
                    />
                     <input
                        className="input-field"
                        type="number" placeholder="usuarios_id"
                        value={modalAnalisis.usuarios_id}
                        onChange={(e) => setModalAnalisis({ ...modalAnalisis, usuarios_id: e.target.value })}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleEditUser1}
                    >
                        Actualizar
                    </button>
                    {modalAnalisis.estado === 1 ? (
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
                        onClick={closeModal}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        )}


            
            {aRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarAnalisisModal}></div>
            )}
            {aRegistrarModalOpen && (
                <div className="tabla2">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                        Registrar Analisis
                    </h1>

                    <form
                        className="contenido-regi"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrarAnalisis({
                
                                muestras_id: datasSelect.muestras_id.value,
                                usuarios_id: datasSelect.usuarios_id.value
                            });
                        }}
                        method="post"
                    >
                        
                        <div className="div-input">
                           
                            <label htmlFor="tipo_analisis_id" className='label'>Tipos Analisis</label>
                            <select name="tipo_analisis" id="1">
                                <option value="1" id="1">
                                    Fisico
                                </option>
                            </select>
                            
                        </div>
                        <div className="div-input">
                            <input className="input-search" type="text" id="muestras_id" />
                            <label htmlFor="muestras_id" className='label'>Muestras</label>
                            <div className="select-options-input">
                                {muestras.map((key1, index) => (
                                    (
                                        <div className="option-select-search" data-id={key1.id} onClick={() => { document.getElementById("muestras_id").value = key1.codigo_externo; !datasSelect.muestras_id ? datasSelect.muestras_id = {} : "";datasSelect.muestras_id.value = key1.id; clearFocusInput("muestras_id") }} key1={key1.id}>{key1.codigo_externo}</div>
                                    )
                                ))}
                            </div>
                        </div>
                        <div className="div-input">
                            <input className="input-search" type="text" id="usuarios_id" />
                            <label htmlFor="usuarios_id" className='label'>Usuarios</label>
                            <div className="select-options-input">
                                {usuarios.map((key, index) => (
                                    (
                                        <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("usuarios_id").value = key.nombre; !datasSelect.usuarios_id ? datasSelect.usuarios_id = {} : ""; datasSelect.usuarios_id.value = key.usuarios_id; clearFocusInput("usuarios_id") }} key={key.id}>{key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>

                        <button className="btn-register-d"
                            type="submit">Registrar Analisis</button>
                        <button
                            className="close-modal-btn"
                            onClick={closeRegistrarAnalisisModal}
                        >
                            Cerrar
                        </button>
                    </form>
                </div>
            )}
    </>

    )
}


export default Analisis