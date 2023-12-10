import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/lotes.css'

const Registrarlote = () => {
    const fecha_creacion = useRef();
    const nombre = useRef();
    const latitud = useRef();
    const longitud = useRef();
    const fincas_id  = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        nombre.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            fecha_creacion: fecha_creacion.current.value,
            nombre: nombre.current.value,
            latitud: latitud.current.value,
            longitud: longitud.current.value,
            fincas_id : fincas_id .current.value,
        };
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("lote/registrar", data, headers)
        window.location = "/lote/listar"
    }
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <form className="tabla3" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Crear lote</h1>

            <div className="div-input">
                <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
                
            </div>

            <div className="div-input">
                <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                <label for="nombre">Nombre</label>
            </div>
            <div className="div-input">
                <input type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
                <label for="latitud">Latitud</label>
            </div>
            <div className="div-input">
                <input type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
                <label for="longitud">Longitud</label>
            </div>
            <div className="div-input">
                <input type="number" id="fincas_id " name="fincas_id " ref={fincas_id } placeholder="" />
                <label for="fincas_id ">finca</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar lote</button>
        </form>
    </>
    )
}


export default Registrarlote