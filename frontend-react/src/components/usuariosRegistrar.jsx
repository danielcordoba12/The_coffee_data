import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/fincas.css';

const Registrar = () => {
    const fecha_creacion = useRef();
    const nombre = useRef();
    const apellido = useRef();
    const numero_documentos = useRef();
    const telefono = useRef();
    const correo_electronico = useRef();
    const user_password = useRef();
    const tipo_documento = useRef();
    const rol = useRef();
    const cargo = useRef();
    const estado = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        nombre.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fecha_creacion: fecha_creacion.current.value,
            nombre: nombre.current.value,
            apellido: apellido.current.value,
            numero_documentos: numero_documentos.current.value,
            telefono: telefono.current.value,
            correo_electronico: correo_electronico.current.value,
            user_password: user_password.current.value,
            tipo_documento: tipo_documento.current.value,
            rol: rol.current.value,
            cargo: cargo.current.value,
            estado: estado.current.value,
            longitud: longitud.current.value,  // Reemplazar con el valor adecuado
            latitud: latitud.current.value,    // Reemplazar con el valor adecuado
            usuarios_id: usuarios_id.current.value,  // Reemplazar con el valor adecuado
            municipios_id: municipios_id.current.value, // Reemplazar con el valor adecuado
            noombre_vereda: noombre_vereda.current.value,
        };

        const headers = {
            headers: {
                token: "xd"
            }
        };

        try {
            await Api.post("usuario/registrar", data, headers);
            navigate("/usuario/listar");
        } catch (error) {
            console.error("Error al registrar la Usuario:", error);
        }
    };

    return (
        <>
            <img src="../../public/img/" alt="" className="fondo2" />
            <form className="tabla2" onSubmit={handleSubmit} method="post">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Registrar usuarios</h1>

                <div className="div-input">
                    <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
                </div>

                <div className="div-input">
                    <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                    <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="div-input">
                    <input type="text" id="apellido" name="apellido" ref={apellido} placeholder="" />
                    <label htmlFor="apellido">Apellido</label>
                </div>

                <div className="div-input">
                    <input type="text" id="numero_documentos" name="numero_documentos" ref={numero_documentos} placeholder="" />
                    <label htmlFor="numero_documentos">Número de Documentos</label>
                </div>

                <div className="div-input">
                    <input type="text" id="telefono" name="telefono" ref={telefono} placeholder="" />
                    <label htmlFor="telefono">Teléfono</label>
                </div>

                <div className="div-input">
                    <input type="text" id="correo_electronico" name="correo_electronico" ref={correo_electronico} placeholder="" />
                    <label htmlFor="correo_electronico">Correo Electrónico</label>
                </div>

                <div className="div-input">
                    <input type="password" id="user_password" name="user_password" ref={user_password} placeholder="" />
                    <label htmlFor="user_password">Contraseña</label>
                </div>

                <div className="div-input">
                    <input type="text" id="tipo_documento" name="tipo_documento" ref={tipo_documento} placeholder="" />
                    <label htmlFor="tipo_documento">Tipo de Documento</label>
                </div>

                <div className="div-input">
                    <input type="text" id="rol" name="rol" ref={rol} placeholder="" />
                    <label htmlFor="rol">Rol</label>
                </div>

                <div className="div-input">
                    <input type="text" id="cargo" name="cargo" ref={cargo} placeholder="" />
                    <label htmlFor="cargo">Cargo</label>
                </div>

                <div className="div-input">
                    <input type="text" id="estado" name="estado" ref={estado} placeholder="" />
                    <label htmlFor="estado">Estado</label>
                </div>

                {/* Resto de campos... */}

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" type="submit">Registrar Usuario</button>
            </form>
        </>
    );
};

export default Registrar;
