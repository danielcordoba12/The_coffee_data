import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/cafe.css'



const RegistrarCafe = () => {
    const lotes_id = useRef();
    const variedades_id = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        lotes_id.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            lotes_id: lotes_id.current.value,
            variedades_id: variedades_id.current.value,
        };
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("/cafe/registrar", data, headers)
        window.location = "/cafe/listar"
    }
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <form className="tabla6" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Crear cafe</h1>

            <div className="div-input">
                <input type="number" id="lotes_id" name="lotes_id" ref={lotes_id} placeholder="" />
                <label for="lotes_id">Lotes</label>
            </div>

            <div className="div-input">
                <input type="number" id="variedades_id" name="variedades_id" ref={variedades_id} placeholder="" />
                <label for="variedades_id">variedad</label>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar Cafe</button>
        </form>
    </>
    )
}


export default RegistrarCafe