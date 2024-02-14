import React, { useEffect, useRef, useState } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';





const RegistrarAnalisis = () => {
    
    const [analisis, setAnalisis] = useState([]);
    const [selectAnalisisid, setselectAnalisisid] = useState(null);
    const [modalAnalisis, setModalAnalisis] = useState(null);
    const [aRegistrarModalOpen, setaRegistrarModalOpen] = useState(false)
    const [tipos_analisis, settipoAnalisis] = useState([]);
    const [muestras, setMuestras] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [datasSelect, setDataSelect] = useState({});




    const tipo_analisis_id = useRef();
    const muestras_id = useRef();
    const usuarios_id = useRef();


    const navigate = useNavigate()


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










    useEffect(() => {
        tipo_analisis_id.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
  
            tipo_analisis_id:tipo_analisis_id.current.value,
            muestras_id:muestras_id.current.value,
            usuario_id:usuarios_id.current.value,
            

        };
        
        const handleRegistrar = async (data) => {
            console.log(data, "datas")
            const headers = {
                headers: {
                    token: "xd",
                },
            };

            try {
                await Api.post("analisis/registrar", data, headers);
                Sweet.registroExitoso();
                closeRegistrarAnalisisModal();
                // Recargar la lista de cafes después del registro
                const response = await Api.get("analisis/registrar");
                setAnalisis(response.data);
            } catch (error) {
                console.error("Error al registrar el analisis:", error);
            }
        };






    }


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

                if (dataSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")) {
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
                            handleRegistrar({
                                tipo_analisis_id: datasSelect.tipo_analisis_id.value,
                                lotes_id: datasSelect.lotes_id.value
                            });
                        }}
                        method="post"
                    >

                        <div className="div-input">
                            <input className="input-search" type="text" id="tipo_analisis_id" />
                            <label htmlFor="tipo_analisis_id" className='label'>Lote</label>
                            <div className="select-options-input">
                                {lote.map((key, index) => (
                                    (
                                        <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("tipo_analisis_id").value = key.Nombre_Finca + ", " + key.nombre; !datasSelect.lotes_id ? datasSelect.lotes_id = {} : ""; datasSelect.lotes_id.value = key.id; clearFocusInput("tipo_analisis_id") }} key={key.id}>{key.Nombre_Finca + ", " + key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>
                        <div className="div-input">
                            <input className="input-search" type="text" id="tipo_analisis_id" />
                            <label htmlFor="tipo_analisis_id" className='label'>Variedad</label>
                            <div className="select-options-input">
                                {variedades.map((key, index) => (
                                    (
                                        <div className="option-select-search" data-id={key.id} onClick={() => { document.getElementById("tipo_analisis_id").value = key.nombre; !datasSelect.tipo_analisis_id ? datasSelect.tipo_analisis_id = {} : ""; datasSelect.tipo_analisis_id.value = key.id; clearFocusInput("tipo_analisis_id") }} key={key.id}>{key.nombre}</div>
                                    )
                                ))}
                            </div>
                        </div>

                        <button className="btn-register-b"
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


export default RegistrarAnalisis