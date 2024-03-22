import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
import '../style/variedad.css';
import Sweet from "../helpers/Sweet";
import esES from "../languages/es-ES.json"
import $ from "jquery";
import "bootstrap"
import "datatables.net";
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';
import 'datatables.net-bs5';




const Variedad = () => {
    const [variedades, setvariedades] = useState([]);
    const [selectedVarId, setSelectedVarId] = useState(null);
    const [modalVar, setModalVar] = useState(null);
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const tableRef = useRef();

    const nombre = useRef();

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
            const data = await Api.put(`/variedad/actualizar/${selectedVarId}`, modalVar);
            console.log(data, "variedad")
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
                setModalVar(false)
                closeModal();
            }

            // Recargar la lista de lotes después de la actualización
            const response = await Api.get("variedad/listar");
            setvariedades(response.data);
        } catch (error) {
            console.error("Error editando la variedad: ", error);
        }
    };

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };

    const handleRegistrar = async (data) => {
        const variedadData = {
            ...data
        };

        const headers = {
            headers: {
                token: "xd",
            },
        };
    
        try {
            const data = await Api.post("variedad/registrar", variedadData, headers);
    
            if (data.data.status === false) {
                let keys = Object.keys(data.data.errors);
                let h6Error = document.querySelectorAll(".h6-error");
                for (let x = 0; x < h6Error.length; x++) {
                    h6Error[x].remove();
                }console.log(data.data)
                for (let x = 0; x < keys.length; x++) {
                    let h6 = document.createElement("h6");
                    h6.innerHTML = data.data.errors[keys[x]];
                    h6.classList.add("h6-error");  
                    if (document.getElementById(keys[x])) {
                        let parent = document.getElementById(keys[x]).parentNode;
                        parent.appendChild(h6);
                    }
                }
            } else { 
                Sweet.registroExitoso("/home/variedad");
                closeRegistrarModal(true);
            }
            const response = await Api.get("variedad/listar");
            setvariedades(response.data);
            
            
        } catch (error) {
            console.error("Error al registrar la variedad:", error);
        }
    };

   
    useEffect(() => {
        if (variedades.length > 0) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            $(tableRef.current).DataTable({
                columnDefs:[
                    {
                      targets:-1,
                      responsivePriority:1
                    }
                  ],
                responsive: true,
                language: esES,
                paging: true,
                lengthMenu: [
                    [7, 10, 50, -1],
                    ['7 Filas', '10 Filas', '50 Filas', 'Ver Todo']
                ]
            });

        }
    }, [variedades])
    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    
    return (<>

<meta name="viewport" content="width=device-width, initial-scale=1"></meta>




<div className="bgr-v">
    <div className="container-list-variedad">
    <div className="contTitle-finca">
        <h1 className="title-variedad"> Variedad</h1>

</div>
<br /><br />
        <div className="container-fluid w-full">
            <button to="/variedad/registrar" className="btn-añadir-variedad" onClick={openRegistrarModal}>
                Añadir
            </button>

            <table className="table table-stripped table-bordered border display reponsive nowrap b-4 bg-white" width={"100%"} ref={tableRef}>
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
                                    className="btn-modi-variedad"
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
    </div >
</div >

        {modalVar && (
            <div className="div-modal">
            <div  className="fondo-modal"></div>
            <div className="table-register-variedad">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar</h1>
                <div className="max-w-xs">
                    <div>
                    <label className="labeledit" htmlFor="nombre">Nombre</label>
                    <input
                        className="input-field"
                        id="nombre"
                        type="text"
                        value={modalVar.nombre}
                        onChange={(e) => setModalVar({ ...modalVar, nombre: e.target.value })}
                    /></div>
                    <button
                        className="btn-act-variedad"
                        onClick={handleEditUser1}
                    >
                        Actualizar
                    </button>
                    <button
                        className="close-modal-variedad"
                        onClick={closeModal}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>     

          )}

        {isRegistrarModalOpen && (
            <div className="div-modal">
            <div  className="fondo-modal"></div>
            <div className="table-register-variedad">
                <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                    Registrar
                </h1>

                <form
                    className="contenido-regi"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegistrar({
                            nombre: nombre.current.value,
                        });
                    }}
                    method="post"
                >

                    <div className="div-input">
                        
                        <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                        <label htmlFor="nombre">Nombre</label>
                    </div>

                    
                    <button className="btn-register-variedad"
                        type="submit">Registrar</button>
                    <button
                        className="close-modal-variedad"
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

export default Variedad