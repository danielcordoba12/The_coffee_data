import React, { useEffect, useRef } from "react";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";
import '../style/usuarios.css'

const Registrarusuarios= () => {
    const nombre = useRef();
    const apellido = useRef();
    const numero_documentos = useRef();
    const telefono = useRef();
    const correo_electronico = useRef();
    const user_password = useRef();
    const tipo_documento = useRef();
    const rol = useRef();
    const cargo = useRef();


    const navigate = useNavigate()

    useEffect(() => {
    nombre.current.focus();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            nombre:nombre.current.value,
            apellido:apellido.current.value,
            numero_documentos:numero_documentos.current.value,
            telefono:telefono.current.value,
            correo_electronico:correo_electronico.current.value,
            user_password:user_password.current.value,
            tipo_documento:tipo_documento.current.value,
            rol:rol.current.value,
            cargo:cargo.current.value,

            

        };
        console.log(data);
        const headers = {
            headers: {
                token: "xd"
            }
        }
        let fetch = Api.post("usuario/registrar", data, headers)
        window.location = "/usuario/listar"
    }
    return (
    <>
        <img src="../../public/img/fondo.png " alt="" className="fondo2" />
        <form className="tabla2" onSubmit={handleSubmit} method="post">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Registro Análisis</h1>



            <div className="div-input">
                <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                <label htmlFor="nombre">nombre</label>
            </div>
      
            <div className="div-input">
                <input type="text" id="apellido " name="apellido " ref={apellido} placeholder="" />
                <label htmlFor="apellido">apellido</label>
            </div>
            <div className="div-input">
                <input type="number" id="numero_documentos " name=" numero_documentos " ref={numero_documentos} placeholder="" />
                <label htmlFor=" v">numero_documentos</label>
            </div>
            <div className="div-input">
                <input type="text" id="telefono" name="telefono" ref={telefono} placeholder="" />
                <label htmlFor="telefono">telefono</label>
            </div>
            <div className="div-input">
                <input type="text" id="correo_electronico" name="correo_electronico" ref={correo_electronico} placeholder="" />
                <label htmlFor="correo_electronico">correo_electronico</label>
            </div>
            <div className="div-input">
                <input type="password" id="user_password" name="user_password" ref={user_password} placeholder="" />
                <label htmlFor="user_password">user_password</label>
            </div>
            <div className="div-input">
                <input type="text" id="tipo_documento" name="tipo_documento" ref={tipo_documento} placeholder="" />
                <label htmlFor="tipo_documento">tipo_documento</label>
            </div>
            <div className="div-input">
                <input type="text" id="rol" name="rol" ref={rol} placeholder="" />
                <label htmlFor="rol">rol</label>
            </div>
            <div className="div-input">
                <input type="text" id="cargo" name="cargo" ref={cargo} placeholder="" />
                <label htmlFor="cargo">cargo</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Registrar</button>
        </form>
    </>
    )
}


export default Registrarusuarios