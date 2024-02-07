import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import Sweet from "../helpers/Sweet";
import '../style/analisis.css';


const RegistrarAnalisis= () => {
    const calidad = useRef();
    const nombre_tipo_analisis = useRef();
    const muestras_id = useRef();
    const nombre_usuario =useRef();


    const navigate = useNavigate()

    useEffect(() => {
        calidad.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            calidad:calidad.current.value,
            nombre_tipo_analisis: nombre_tipo_analisis.current.value,
            muestras_id :muestras_id.current.value,
            nombre_usuario :nombre_usuario.current.value,
            

        };
        console.log(data);
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("analisis/registrar", data, headers)
        window.location = "/analisis/listar"
    }
    return (
    <>
        <img src="../../public/img/fondo.png " alt="" className="fondo2" />
        <form className="tabla2" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Análisis</h1>



            <div className="div-input">
                <input type="text" id="calidad" name="calidad" ref={calidad} placeholder="" />
                <label htmlFor="calidad">Calidad</label>
            </div>
      
            <div className="div-input">
                    <input type="text" id="nombre_tipo_analisis " name="nombre_tipo_analisis " ref={nombre_tipo_analisis} placeholder="" />
                    <label htmlFor="nombre_tipo_analisis">Tipo de Análisis</label>
            </div>
            <div className="div-input">
                <input type="number" id="Muestras " name=" muestras_id " ref={muestras_id} placeholder="" />
                <label htmlFor=" muestras_id">Muestras</label>
            </div>
            <div className="div-input">
                    <input type="text" id="nombre_usuario" name="nombre_usuario" ref={nombre_usuario} placeholder="" />
                <label htmlFor="nombre_usuario">Usuarios</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar</button>
            
        </form>
        
    </>

    )
}


export default RegistrarAnalisis