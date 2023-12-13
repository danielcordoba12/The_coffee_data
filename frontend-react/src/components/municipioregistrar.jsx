import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/municipio.css'



const RegistrarMunicipio = () => {
    const nombre = useRef();
    const fecha_creacion = useRef();
    const departamentos_id  = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        nombre.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            nombre: nombre.current.value,
            fecha_creacion: fecha_creacion.current.value,
            departamentos_id : departamentos_id .current.value,
        };
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("/municipio/registrar", data, headers)
        window.location = "/municipio/listar"
    }
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <form className="tabla4" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Crear Municipio</h1>

            <div className="div-input">
                <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                <label for="nombre">Nombre</label>
            </div>

            <div className="div-input">
                <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
            </div>

        
            <div className="div-input">
                <input type="number" id="departamentos_id " name="departamentos_id " ref={departamentos_id } placeholder="" />
                <label for="departamentos_id ">Departamento</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar Municipio</button>
        </form>
    </>
    )
}


export default RegistrarMunicipio