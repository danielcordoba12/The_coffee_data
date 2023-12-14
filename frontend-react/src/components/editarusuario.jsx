import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
import '../style/fincas.css';

const EditarUsuario = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        numero_documentos: '',
        telefono: '',
        correo_electronico: '',
        user_password: '',
        tipo_documento: '',
        rol: '',
        cargo: '',
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

    const handleInputChange = (e, field) => {
        setUsuario({ ...usuario, [field]: e.target.value });
    };

    const handleEditUser = async (actionType) => {
        try {
            let url;
            switch (actionType) {
                case "actualizar":
                    url = `/usuario/actualizar/${id}`;
                    break;
                case "desactivar":
                    url = `/usuario/desactivar/${id}`;
                    break;
                case "activar":
                    url = `/usuario/activar/${id}`;
                    break;
                default:
                    break;
            }

            await Api[actionType === "actualizar" ? "put" : "patch"](url, usuario);
            navigate("/usuario/listar");
        } catch (error) {
            console.error(`Error ${actionType} el usuario: `, error);
        }
    };

    return (
        <>
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Usuario</h1>
                <div className="max-w-xs">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Nombre"
                        value={usuario.nombre}
                        onChange={(e) => handleInputChange(e, 'nombre')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Apellido"
                        value={usuario.apellido}
                        onChange={(e) => handleInputChange(e, 'apellido')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Número Documentos"
                        value={usuario.numero_documentos}
                        onChange={(e) => handleInputChange(e, 'numero_documentos')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Teléfono"
                        value={usuario.telefono}
                        onChange={(e) => handleInputChange(e, 'telefono')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Correo Electrónico"
                        value={usuario.correo_electronico}
                        onChange={(e) => handleInputChange(e, 'correo_electronico')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Contraseña"
                        value={usuario.user_password}
                        onChange={(e) => handleInputChange(e, 'user_password')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Tipo de Documento"
                        value={usuario.tipo_documento}
                        onChange={(e) => handleInputChange(e, 'tipo_documento')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Rol"
                        value={usuario.rol}
                        onChange={(e) => handleInputChange(e, 'rol')}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Cargo"
                        value={usuario.cargo}
                        onChange={(e) => handleInputChange(e, 'cargo')}
                    />

                    <button className="btn-primary" onClick={() => handleEditUser("actualizar")}>
                        Actualizar
                    </button>
                    <button className="btn-secondary" onClick={() => handleEditUser("desactivar")}>
                        Desactivar
                    </button>
                    <button className="btn-tertiary" onClick={() => handleEditUser("activar")}>
                        Activar
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditarUsuario;
