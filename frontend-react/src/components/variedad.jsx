import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";



const Variedad = () => {
    const [variedades, setvariedades] = useState([]);
    const [selectedVarId, setSelectedVarId] = useState(null);
    const [modalVar, setModalVar] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const nombre = useRef();
    const fecha_creacion = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarvariedades = async () => {
            try {
                const response = await Api.get('variedad/listar');
                setvariedades(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarvariedades();
    }, []);

    const openModal = async (varId) => {
        setSelectedVarId(varId);
        try {
            const response = await Api.get(`/variedad/buscar/${varId}`);
            setModalVar(response.data);
        } catch (error) {
            console.error('Error buscando el variedad', error);
        }
    };
    const closeModal = () => {
        setSelectedVarId(null);
        setModalVar(null);
    };

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/variedad/actualizar/${selectedVarId}`, modalVar);
            Sweet.actualizacionExitosa();
            closeModal();
            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("variedad/listar");
            setvariedades(response.data);
        } catch (error) {
            console.error("Error editando el variedad: ", error);
        }
    };

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const handleRegistrar = async (data) => {
        const headers = {
            headers: {
                token: "xd",
            },
        };
    
        try {
            const response = await Api.post("variedad/registrar", data, headers);
    
            if (response.data.status === false) {
                let keys = Object.keys(response.data.errors);
                let h6Error = document.querySelectorAll(".h6-error");
    
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove();
                }
    
                console.log(response.data);
    
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6");
                    h6.innerHTML = response.data.errors[keys[x]];
                    h6.classList.add("h6-error");
    
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode;
                        parent.appendChild(h6);
                    }
                }
            } else {
                console.log(response.data);
                /* Sweet.registroExitoso();
                closeRegistrarModal(); */
                // Recargar la lista de variedades después del registro
                const variedadesResponse = await Api.get("variedad/listar");
                setvariedades(variedadesResponse.data);
                location.href = "/variedad";
            }
        } catch (error) {
            console.error("Error al registrar la finca:", error);
        }
    };

    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    
    return (<>

        {modalVar && <div className="overlay" onClick={closeModal}></div>}
        {isRegistrarModalOpen && (
            <div className="overlay" onClick={closeRegistrarModal}></div>
        )}


        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  variedades</h1>

            <button to="/variedad/registrar" className="btn-registrar-lote" onClick={openRegistrarModal}>
                Registrar variedades
            </button>

            <div className="search-container">

          {/* icono de buscar */}
          <svg x="0px" y="0px" viewBox="0 0 60 60" width="26" height="26" >
            <path class="st0" fill="#ffffff" d="M54.8,51.4L38.7,35.3c2.6-3.1,4.2-7.1,4.2-11.5C42.9,14,34.9,6,25.1,6C15.2,6,7.2,14,7.2,23.8
                c0,9.8,8,17.8,17.8,17.8c4.4,0,8.4-1.6,11.5-4.2l16.1,16.1L54.8,51.4z M10.2,23.8C10.2,15.6,16.9,9,25.1,
                9c8.2,0,14.8,6.7,14.8,14.8c0,8.2-6.7,14.8-14.8,14.8C16.9,38.7,10.2,32,10.2,23.8z">
            </path>
          </svg>

          <input
            type="text"
            placeholder="Buscar variedad"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Fecha Creación</th>
                        <th>Nombre</th>
                        <th>opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {variedades
                    .filter((task) =>
                    task.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{formatDate(task.fecha_creacion)}</td>
                            <td>{task.nombre}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => openModal(task.id)}
                                >
                                    Modificar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >

        {modalVar && (
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Variedad</h1>
                <div className="max-w-xs">
                    <input
                        className="input-field"
                        type="date" placeholder="fecha_creacion"
                        value={modalVar.fecha_creacion}
                        onChange={(e) => setModalVar({ ...modalVar, fecha_creacion: e.target.value })}
                    />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="nombre"
                        value={modalVar.nombre}
                        onChange={(e) => setModalVar({ ...modalVar, nombre: e.target.value })}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleEditUser1}
                    >
                        Actualizar
                    </button>
                    <button
                        className="close-modal-btn"
                        onClick={closeModal}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        )}

        {isRegistrarModalOpen && (
            <div className="overlay" onClick={closeRegistrarModal}></div>
        )}
        {isRegistrarModalOpen && (
            <div className="tabla2">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                    Registrar Variedad
                </h1>

                <form
                    className="contenido-regi"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegistrar({
                            nombre: nombre.current.value,
                            fecha_creacion: fecha_creacion.current.value,
                        });
                    }}
                    method="post"
                >

                    <div className="div-input">
                        <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                        <label for="nombre">Nombre</label>
                    </div>

                    <div className="div-input">
                        <input type="date" id="fecha_creacion" name="fecha_creacion" ref={fecha_creacion} placeholder="" />
                    </div>
                    
                    <button className="btn-register-lote"
                        type="submit">Registrar Variedad</button>
                    <button
                        className="close-modal-btn"
                        onClick={closeRegistrarModal}
                    >
                        Cerrar
                    </button>
                </form>
            </div>
        )}

    </>
    );
};

export default Variedad