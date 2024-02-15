import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';


const RegistrarAnalisis= () => {
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