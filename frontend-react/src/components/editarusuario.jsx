import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";

const editarusuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        fecha_creacion: '',
        nombre: '',
        apellido : '',
        numero_documentos : '',
        telefono : '',
        correo_electronico : '',
        user_password : '',
        tipo_documento : '',
        rol : '',
        cargo : '',
        estado : '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const buscarUsuario = async () => {
            try {
                const response = await Api.get(`/usuario/buscarusuario/${id}`);
                setUsuario(response.data[0]);
            } catch (error) {
                console.error('Error buscando el usuario', error);
            }
        };

        buscarUsuario();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/usuario/actualizar/${id}`, usuario);
            navigate("/usuario/listar");
        } catch (error) {
            console.error('Error editando el usuario: ', error);
        }
    };

    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/usuario/desactivar/${id}`, usuario);
            navigate("/usuario/listar");
        } catch (error) {
            console.error('Error desactivando el usuario: ', error);
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar usuario</h1>
            <div className="max-w-xs">
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    placeholder="fecha_creacion"
                    value={usuario.fecha_creacion}
                    onChange={(e) => setUsuario({ ...usuario, fecha_creacion: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="nombre"
                    value={usuario.nombre}
                    onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="longitud"
                    value={usuario.longitud}
                    onChange={(e) => setUsuario({ ...usuario, longitud: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="latitud"
                    value={usuario.latitud}
                    onChange={(e) => setUsuario({ ...usuario, latitud: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="usuarios_id"
                    value={usuario.usuarios_id}
                    onChange={(e) => setUsuario({ ...usuario, usuarios_id: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="municipios_id"
                    value={usuario.municipios_id}
                    onChange={(e) => setUsuario({ ...usuario, municipios_id: e.target.value })}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="nombre_vereda"
                    value={usuario.nombre_vereda}
                    onChange={(e) => setUsuario({ ...usuario, nombre_vereda: e.target.value })}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleEditUser1}
                >
                    Actualizar
                </button>
            </div>
        </div>
    );
};

export default editarusuario;
