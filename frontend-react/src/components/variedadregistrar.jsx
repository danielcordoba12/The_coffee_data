import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/variedad.css'



const Registrarvariedad = () => {
    const nombre = useRef();
    const fecha_creacion = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        nombre.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            nombre: nombre.current.value,
            fecha_creacion: fecha_creacion.current.value,
        };
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("/variedad/registrar", data, headers)
        window.location = "/variedad/listar"
    }
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <form className="tabla5" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Crear variedad</h1>

            <div className="div-input">
                <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                <label for="nombre">Nombre</label>
            </div>

            <div className="div-input">
                <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar variedad</button>
        </form>
    </>
    )
}


export default Registrarvariedad