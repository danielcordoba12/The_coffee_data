import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
import '../style/usuarios.css'; // Asegúrate de importar el estilo correcto

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
        estado: ''
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
            navigate("/usuario/listar")
        } catch (error) {
            console.error('Error editando el usuario: ', error);
        }
    }
    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/usuario/desactivar/${id}`, usuario);
            navigate("/usuario/listar")
        } catch (error) {
            console.error('Error desactivando el usuario: ', error);
        }
    }
    const handleEditUser3 = async () => {
        try {
            await Api.patch(`/usuario/activar/${id}`, usuario);
            navigate("/usuario/listar")
        } catch (error) {
            console.error('Error activando el v: ', error);
        }
    }

    return (
        <>
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Usuario</h1>
                <div className="max-w-xs">
                    <input
                        className="input-field"
                        type="text"
                        placeholder="nombre"
                        value={usuario.nombre}
                        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="apellido"
                        value={usuario.apellido}
                        onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="number"
                        placeholder="numero_documentos"
                        value={usuario.numero_documentos}
                        onChange={(e) => setUsuario({ ...usuario, numero_documentos: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="number"
                        placeholder="telefono"
                        value={usuario.telefono}
                        onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="correo_electronico"
                        value={usuario.correo_electronico}
                        onChange={(e) => setUsuario({ ...usuario, correo_electronico: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="user_password"
                        value={usuario.user_password}
                        onChange={(e) => setUsuario({ ...usuario, user_password: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="tipo_documento"
                        value={usuario.tipo_documento}
                        onChange={(e) => setUsuario({ ...usuario, tipo_documento: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="rol"
                        value={usuario.rol}
                        onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="cargo"
                        value={usuario.cargo}
                        onChange={(e) => setUsuario({ ...usuario, cargo: e.target.value })}
                    />
        
                    <button
                            className="btn-primary"
                            onClick={handleEditUser1}
                        >
                            Actualizar
                        </button>
                        {usuario.estado === 1 ? (
                            <button
                            className="btn-secondary"
                            onClick={handleEditUser2}
                            >
                            Desactivar
                            </button>
                        ) : (
                            <button
                            className="btn-tertiary"
                            onClick={handleEditUser3}
                            >
                            Activar
                            </button>
                        )}
                </div>
            </div>
        </>
    );
}

export default EditarUsuario;
