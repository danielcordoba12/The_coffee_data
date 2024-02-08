import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";


const Cafe = () => {
    const [cafes, setCafes] = useState([]);
    const [selectedCafeId, setSelectedCafeId] = useState(null);
    const [modalCafe, setModalCafe] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);


    const lotes_id = useRef();
    const variedades_id = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarcafe = async () => {
            try {
                const response = await Api.get('cafe/listar');
                setCafes(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarcafe();
    }, []);

    const openModal = async (cafeId) => {
        setSelectedCafeId(cafeId);
        try {
            const response = await Api.get(`/cafe/buscar/${cafeId}`);
            setModalCafe(response.data);
        } catch (error) {
            console.error('Error buscando el cafe', error);
        }
    };

    const closeModal = () => {
        setSelectedCafeId(null);
        setModalCafe(null);
    };

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/cafe/actualizar/${selectedCafeId}`, modalCafe);
            Sweet.actualizacionExitosa();
            closeModal();
            // Recargar la lista de Cafes después de la actualización
            const response = await Api.get("cafe/listar");
            setCafes(response.data);
        } catch (error) {
            console.error("Error editando el Cafe: ", error);
        }
    };
    const handleEditUser2 = async () => {
        const result = await Sweet.confimarDeshabilitar({
        });
        if (result.isConfirmed) {
            try {
                await Api.patch(`/cafe/desactivar/${selectedCafeId}`, modalCafe);
                closeModal();
                // Recargar la lista de cafes después de la desactivación
                const response = await Api.get("cafe/listar");
                setCafes(response.data);
            } catch (error) {
                console.error("Error desactivando el Cafe: ", error);
            }
        }
    };
    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/cafe/activar/${selectedCafeId}`, modalCafe);
                closeModal();
                // Recargar la lista de cafes después de la activación
                const response = await Api.get("cafe/listar");
                setCafes(response.data);
            } catch (error) {
                console.error("Error activando el cafe: ", error);
            }
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
            await Api.post("cafe/registrar", data, headers);
            Sweet.registroExitoso();
            closeRegistrarModal();
            // Recargar la lista de cafes después del registro
            const response = await Api.get("cafe/listar");
            setCafes(response.data);
        } catch (error) {
            console.error("Error al registrar el cafe:", error);
        }
    };

    return (<>
        {modalCafe && <div className="overlay" onClick={closeModal}></div>}
        {isRegistrarModalOpen && (
            <div className="overlay" onClick={closeRegistrarModal}></div>
        )}
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  cafe</h1>

            <button to="/cafe/registrar" className="btn-registrar-lote" onClick={openRegistrarModal}>
                Registrar cafe
            </button>

            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Propietario</th>
                        <th>Municipio</th>
                        <th>lote</th>
                        <th>variedad</th>
                        <th>Estado</th>
                        <th>opciones</th>

                    </tr>
                </thead>
                <tbody>
                    {cafes
                        .map((task) => (
                            <tr key={task.id} className="border-t">
                                <td>{task.id}</td>
                                <td>{task.nombre_usuario}</td>
                                <td>{task.nombre_municipio}</td>
                                <td>{task.numero_lote}</td>
                                <td>{task.nombre_variedad}</td>
                                <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>

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
        </div>

        {modalCafe && (
            <div className="tabla3">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
                <div className="max-w-xs">
                    <input
                        className="input-field"
                        type="number"
                        placeholder="lotes_id"
                        value={modalCafe.lotes_id}
                        onChange={(e) => setModalCafe({ ...modalCafe, lotes_id: e.target.value })}
                    />

                    <input
                        className="input-field"
                        type="number" placeholder="variedades_id "
                        value={modalCafe.variedades_id}
                        onChange={(e) => setModalCafe({ ...modalCafe, variedades_id: e.target.value })}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleEditUser1}
                    >
                        Actualizar
                    </button>
                    {modalCafe.estado === 1 ? (
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
                    Registrar Cafe
                </h1>

                <form
                    className="contenido-regi"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegistrar({
                            lotes_id: lotes_id.current.value,
                            variedades_id: variedades_id.current.value,
                        });
                    }}
                    method="post"
                >

                    <div className="div-input">
                        <input type="number" id="lotes_id" name="lotes_id" ref={lotes_id} placeholder="" />
                        <label for="lotes_id">Lotes</label>
                    </div>

                    <div className="div-input">
                        <input type="number" id="variedades_id" name="variedades_id" ref={variedades_id} placeholder="" />
                        <label for="variedades_id">variedad</label>
                    </div>

                    <button className="btn-register-lote"
                        type="submit">Registrar Cafe</button>
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
    )
}

export default Cafe