import React, { useEffect, useState, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import Sweet from "../helpers/Sweet";
import '../style/usuarios.css';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [isActualizarModalOpen, setActualizarModalOpen] = useState(false);
    const [usuarioToUpdate, setUsuarioToUpdate] = useState(null);
    const [fincas, setFincas] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState("");
    const nombre = useRef();
    const apellido = useRef();
    const numeroDocumento = useRef();
    const telefono = useRef();
    const correo = useRef();
    const estado = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
                console.log("Municipios cargados:", response.data);
            } catch (error) {
                console.error("Error fetching municipios:", error);
            }
        };
        fetchMunicipios();
    }, []);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        buscarUsuarios();
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
            nombre: nombre.current.value,
            apellido: apellido.current.value,
            numero_documento: numeroDocumento.current.value,
            telefono: telefono.current.value,
            correo_electronico: correo.current.value,
            estado: estado.current.value
        };

        try {
            const response = await Api.post("usuario/registrar", usuarioData);
            console.log(response.data);
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
            nombre: nombre.current.value,
            apellido: apellido.current.value,
            numero_documento: numeroDocumento.current.value,
            telefono: telefono.current.value,
            correo_electronico: correo.current.value,
            estado: estado.current.value
        };

        try {
            const response = await Api.post("usuario/actualizar", usuarioData);
            console.log(response.data);
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
                        <div className="div-input">
                            <input type="text" ref={nombre} placeholder="Nombre" required />
                        </div>
                        <div className="div-input">
                            <input type="text" ref={apellido} placeholder="Apellido" required />
                        </div>
                        <div className="div-input">
                            <input type="text" ref={numeroDocumento} placeholder="Número de Documento" required />
                        </div>
                        <div className="div-input">
                        
                            <select
                                className="input-register"
                                id="municipios_id"
                                name="municipios_id"
                                value={selectedMunicipio}
                                onChange={(e) => {
                                    console.log("Municipio seleccionado:", e.target.value);
                                    setSelectedMunicipio(e.target.value);
                                }}
                                
                            >
                                <option value="" disabled>Seleccione un municipio</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.id} value={municipio.id}>
                                        {municipio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Registrar Usuario</button>
                        <button className="close-modal-btn" onClick={closeRegistrarModal}>Cerrar</button>
                    </form>
                </div>
            )}
            {isActualizarModalOpen && usuarioToUpdate && (
                <div className="modal-actualizar">
                    <form onSubmit={handleActualizar}>
                        <div className="div-input">
                            <input type="text" ref={nombre} defaultValue={usuarioToUpdate.nombre} required />
                        </div>
                        <div className="div-input">
                            <input type="text" ref={apellido} defaultValue={usuarioToUpdate.apellido} required />
                        </div>
                        <div className="div-input">
                            <input type="text" ref={numeroDocumento} defaultValue={usuarioToUpdate.numero_documento} required />
                        </div>
                        <div className="div-input">
                            <input type="text" ref={telefono} defaultValue={usuarioToUpdate.telefono} required />
                        </div>
                        <div className="div-input">
                            <input type="email" ref={correo} defaultValue={usuarioToUpdate.correo_electronico} required />
                        </div>
                        <div className="div-input">
                            <select ref={estado} defaultValue={usuarioToUpdate.estado}>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>
                        <button type="submit">Actualizar Usuario</button>
                        <button className="close-modal-btn" onClick={closeActualizarModal}>Cerrar</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ListarUsuarios;
