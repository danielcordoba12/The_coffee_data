import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';


const RegistrarAnalisis= () => {


    const [RegistrarModalOpen, setRegistrarModalOpen] = useState(false);

    const tipo_analisis_id = useRef();
    const muestras_id = useRef();
    const usuarios_id = useRef();


    const navigate = useNavigate()

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
        console.log(data);
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("analisis/registrar", data, headers)
        console.log(data)
        window.location = "/analisis/listar"


    }



    function clearFocusInput(Element) {
        let inputSearch = document.getElementById(Element)

        if (inputSearch) {
            
            let divOptions = inputSearch.parentNode.querySelectorAll(".select-options-input");
            if(divOptions.length > 0){
                divOptions[0].style.display = "none"
            }
            let select = inputSearch.parentNode.querySelectorAll(".option-select-search")
            for (let s = 0; s < select.length; s++) {
                let elementValue = inputSearch.getAttribute("id")
                
                if(dataSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")){
                    select[s].classList.add("option-select-focus")
                }else{
                    select[s].classList.remove("option-select-focus")
                }
                
            }
        }
    }
    useEffect(() => {

        let inputSearch = document.querySelectorAll(".input-search")

        if (inputSearch.length > 0) {
            for (let s = 0; s < inputSearch.length; s++) {
                inputSearch[s].addEventListener("blur",function(){
                    let divOptions = inputSearch[s].parentNode.querySelectorAll(".select-options-input");
                    if(divOptions.length > 0){
                       setTimeout(() => {
                        divOptions[0].style.display = "none"
                       }, 100);
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
                                    if(!dataSelect[inputSearch[s].getAttribute("data-id")]){
                                        dataSelect[inputSearch[s].getAttribute("data-id")] = {}
                                    }
                                    dataSelect[inputSearch[s].getAttribute("data-id")].value = options[o].getAttribute("data-id")
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
    }, [RegistrarModalOpen])

    

    return (
    <>
        <img src="../../public/img/fondo.png " alt="" className="fondo2" />
        <form className="tabla2" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Análisis</h1>


      
            <div className="div-input">
                    <input type="number" id="tipo_analisis_id " name="tipo_analisis_id " ref={tipo_analisis_id} placeholder="" />
                    <label htmlFor="tipo_analisis_id">Tipo de Análisis</label>
            </div>
            <div className="div-input">
                <input type="number" id="muestras_id " name="muestras_id " ref={muestras_id} placeholder="" />
                <label htmlFor="muestras_id">Muestras</label>
            </div>
            <div className="div-input">
                    <input type="number" id="usuarios_id" name="usuarios_id" ref={usuarios_id} placeholder="" />
                <label htmlFor="usuarios_id">Usuarios</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar</button>
            
        </form>
        
    </>

    )
}


export default RegistrarAnalisis