import React, { useEffect, useState } from "react";
import Api from "../services/api";
import { Link } from "react-router-dom";
import '../style/usuarios.css';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        buscarUsuarios();
    }, []);

    return (
        <>
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu">Usuarios</h1>
                <br />
                <table className="tableprincipal">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha Creación</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Número Documentos</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.fecha_creacion}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.numero_documentos}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.correo_electronico}</td>
                                <td>{usuario.estado}</td>
                                <td>
                                    <button type="button" className="btn-primary"
                                    onClick={() => handleUpdate(usuario.id)}>
                                        <Link to={`/usuario/editar/${usuario.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            Modificar
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListarUsuarios;
