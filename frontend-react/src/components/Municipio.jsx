import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import '../style/municipio.css';
import Sweet from "../helpers/Sweet";
import $ from "jquery";
import esES from "../languages/es-ES.json"
import "bootstrap"
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';


const Municipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipioId, setSelectedMunicipioId] = useState(null);
    const [modalMunicipio, setModalMunicipio] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);

    const nombre = useRef();
    const departamentos_id = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        const buscarMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        buscarMunicipios();
    }, []);

    const openEditarModal = async (municipioId) => {
        setSelectedMunicipioId(municipioId);
        try {
            const response = await Api.get(`/municipio/buscar/${municipioId}`);
            setModalMunicipio(response.data);
        } catch (error) {
            console.error("Error buscando el municipio", error);
        }
    };

    const closeEditarModal = () => {
        setSelectedMunicipioId(null);
        setModalMunicipio(null);
    };

    const handleEditUser = async () => {
        try {
           const data = await Api.put(`/municipio/Actualizar/${selectedMunicipioId}`, modalMunicipio);
            console.log(data, "municipio")
            if (data.data.status == false) {
                let keys = Object.keys(data.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(data.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = data.data.errors[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            } else {
                Sweet.actualizacionExitosa();
                
                closeEditarModal();
            }

            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("municipio/listar");
            setMunicipios(response.data);
        } catch (error) {
            console.error("Error editando el municipio: ", error);
        }
    };

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const handleRegistrar = async (data) => {
        const MunicipioData = {
            ...data
        };

        const headers = {
            headers: {
                token: "xd",
            },
        };

        try {
            const data = await Api.post("municipio/registrar", MunicipioData, headers);
            if (data.data.status == false) {
                let keys = Object.keys(data.data.errors)
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove()
                }
                console.log(data.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6")
                    h6.innerHTML = data.data.errors[keys[x]]
                    h6.classList.add("h6-error")
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode
                        parent.appendChild(h6)
                    }

                }
            } else {
                console.log(data.data)
                /* Sweet.registroExitoso();
                closeRegistrarModal(); */
                // Recargar la lista de fincas después del registro
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
                location.href = "/municipio"
            }

            
        } catch (error) {
            console.error("Error al registrar el municipio:", error);
        }
    };

    const dataTableRef = useRef(null);
    const initializeDataTable = (municipios) => {
        $(document).ready(function () {
            $(dataTableRef.current).DataTable({
                columnDefs:[
                    {
                      targets:-1,
                      responsivePriority:1
                    }
                  ],
                lengthMenu: [5, 10, 20, 30, 40, 50],
                processing: true,
                pageLength: 5,
                language:esES,
                responsive: true,
            });
        });

        return () => {
            $(dataTableRef.current).DataTable().destroy(true);
        };
    };

    useEffect(() => {
        if (municipios.length > 0) {
            initializeDataTable(municipios);
        }
    }, [municipios]);




    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>




            <div className="bgr-m">
                <div className="container-list-Municipio">
                    <h1 className="title-municipio"> Listado de  Municipio</h1>



                    <div className="container-fluid w-full">
                        <button to="/Municipio/registrar" className="btn-añadir-municipio" onClick={openRegistrarModal}>
                            Añadir 
                        </button>

                        <table className="table table-stripped table-bordered border display reponsive nowrap b-4 bg-white" ref={dataTableRef} width={"100%"}>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th>id</th>
                                    <th>Fecha Creación</th>
                                    <th>Nombre</th>
                                    <th>Departamento</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {municipios.map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td>{task.id}</td>
                                        <td>{formatDate(task.fecha_creacion)}</td>
                                        <td>{task.nombre}</td>
                                        <td>{task.nombre_departamento}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-act-municipio "
                                                onClick={() => {
                                                    openEditarModal(task.id);

                                                }}
                                            >
                                                Modificar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                </div>
                    {modalMunicipio && (
                        <div className="div-modal">
                        <div onClick={closeEditarModal} className="fondo-modal"></div>
                        <div className="table-register-municipio">
                            <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                                Editar Municipio
                            </h1>
                            <div className="max-w-xs">
                                <div>
                                <input
                                    className="input-field"
                                    id="nombre"
                                    type="text"
                                    placeholder="nombre"
                                    value={modalMunicipio.nombre}
                                    onChange={(e) =>
                                        setModalMunicipio({
                                            ...modalMunicipio,
                                            nombre: e.target.value
                                        })
                                    }
                                /></div>

                                <div>
                                <input
                                    className="input-field"
                                    id="departamentos_id"
                                    type="number"
                                    placeholder="departamentos_id"
                                    value={modalMunicipio.departamentos_id}
                                    onChange={(e) =>
                                        setModalMunicipio({
                                            ...modalMunicipio,
                                            departamentos_id: e.target.value,
                                        })
                                    }
                                /></div>
                                <button
                                    className="btn-act-municipio "
                                    onClick={handleEditUser}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="close-modal-municipio"
                                    onClick={closeEditarModal}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                        </div>
                    )}

                    {isRegistrarModalOpen && (
                        <div className="div-modal">
                        <div onClick={closeRegistrarModal} className="fondo-modal"></div>
                        <div className="table-register-municipio">
                            <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                                Registrar Municipio
                            </h1>
                            <form
                                className="contenido-regi"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleRegistrar({
                                        nombre: nombre.current.value,
                                        departamentos_id: departamentos_id.current.value,
                                    });
                                }}
                                method="post"
                            >


                                <div className="div-input">
                                    <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                                    <label htmlFor="nombre">Nombre</label>
                                </div>

                                <div className="div-input">
                                    <input type="number" id="departamentos_id" name="departamentos_id" ref={departamentos_id} placeholder="" />
                                    <label htmlFor="departamentos_id">Departamento</label>
                                </div>
                                <button
                                    className="btn-register-municipio"
                                    type="submit"
                                >
                                    Registrar municipio
                                </button>
                                <button
                                    className="close-modal-municipio"
                                    onClick={closeRegistrarModal}
                                >
                                    X
                                </button>
                            </form>
                        </div>
                        </div>
                    )}
                </>
                );
};

                export default Municipio;
