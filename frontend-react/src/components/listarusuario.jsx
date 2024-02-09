import React, { useEffect, useState, useRef } from "react";
import Api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Sweet from "../helpers/Sweet";
import '../style/usuarios.css';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [isActualizarModalOpen, setActualizarModalOpen] = useState(false);
    const [usuarioToUpdate, setUsuarioToUpdate] = useState(null);
    const nombreRef = useRef();
    const apellidoRef = useRef();
    const numeroDocumentoRef = useRef();
    const telefonoRef = useRef();
    const correoRef = useRef();
    const estadoRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const openActualizarModal = (usuario) => {
        setUsuarioToUpdate(usuario);
        setActualizarModalOpen(true);
    };

    const closeActualizarModal = () => {
        setActualizarModalOpen(false);
    };

    const handleRegistrar = async (e) => {
        e.preventDefault();
        const usuarioData = {
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            numero_documento: numeroDocumentoRef.current.value,
            telefono: telefonoRef.current.value,
            correo_electronico: correoRef.current.value,
            estado: estadoRef.current.value
        };

        try {
            const response = await Api.post("usuario/registrar", usuarioData);
            if (response.data.status) {
                Sweet.registroExitoso();
                closeRegistrarModal();
                setUsuarios([...usuarios, response.data.usuario]);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        const usuarioData = {
            id: usuarioToUpdate.id,
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            numero_documento: numeroDocumentoRef.current.value,
            telefono: telefonoRef.current.value,
            correo_electronico: correoRef.current.value,
            estado: estadoRef.current.value
        };

        try {
            const response = await Api.post("usuario/actualizar", usuarioData);
            if (response.data.status) {
                Sweet.registroExitoso();
                closeActualizarModal();
                const updatedUsuarios = usuarios.map((user) =>
                    user.id === usuarioToUpdate.id ? response.data.usuario : user
                );
                setUsuarios(updatedUsuarios);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <>
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}
            {isActualizarModalOpen && (
                <div className="overlay" onClick={closeActualizarModal}></div>
            )}
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu">Usuarios</h1>
                <button className="btn-primary" onClick={openRegistrarModal}>Registrar Usuario</button>
                <br />
                <table className="tableprincipal">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Número de Documento</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.numero_documento}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.correo_electronico}</td>
                                <td>{usuario.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button className="btn-icon-edit" onClick={() => openActualizarModal(usuario)}><i className="fas fa-pen"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isRegistrarModalOpen && (
                 <div className="modal-registrar">
                 <form onSubmit={handleRegistrar}>
                     {/* Contenido del modal de registro */}
                     <input type="text" ref={nombreRef} placeholder="Nombre" required />
                     <input type="text" ref={apellidoRef} placeholder="Apellido" required />
                     <input type="text" ref={numeroDocumentoRef} placeholder="Número de Documento" required />
                     <input type="text" ref={telefonoRef} placeholder="Teléfono" required />
                     <input type="email" ref={correoRef} placeholder="Correo Electrónico" required />
                     <select ref={estadoRef}>
                         <option value="1">Activo</option>
                         <option value="0">Inactivo</option>
                     </select>
                     <button type="submit">Registrar Usuario</button>
                 </form>
                 <button className="close-modal-btn" onClick={closeRegistrarModal}>Cerrar</button>
             </div>
            )}
            {isActualizarModalOpen && usuarioToUpdate && (
                 <div className="modal-actualizar">
                 <form onSubmit={handleActualizar}>
                     {/* Contenido del modal de actualización */}
                     <input type="text" ref={nombreRef} defaultValue={usuarioToUpdate.nombre} required />
                     <input type="text" ref={apellidoRef} defaultValue={usuarioToUpdate.apellido} required />
                     <input type="text" ref={numeroDocumentoRef} defaultValue={usuarioToUpdate.numero_documento} required />
                     <input type="text" ref={telefonoRef} defaultValue={usuarioToUpdate.telefono} required />
                     <input type="email" ref={correoRef} defaultValue={usuarioToUpdate.correo_electronico} required />
                     <select ref={estadoRef} defaultValue={usuarioToUpdate.estado}>
                         <option value="1">Activo</option>
                         <option value="0">Inactivo</option>
                     </select>
                     <button type="submit">Actualizar Usuario</button>
                 </form>
                 <button className="close-modal-btn" onClick={closeActualizarModal}>Cerrar</button>
             </div>
            )}
        </>
    );
};

export default ListarUsuarios;
