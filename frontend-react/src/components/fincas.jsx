import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";
import '../style/fincas.css'


const ListarFinca = () => {
    const [fincas, setFincas] = useState([]);

    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get('finca/listar');
                setFincas(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarFincas();
    }, []);
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  Fincas</h1>
            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Fecha Creación</th>
                        <th>Nombre</th>
                        <th>Longitud</th>
                        <th>Latitud</th>
                        <th>Estado</th>
                        <th>Nombre Vereda</th>
                        <th>opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {fincas.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{task.fecha_creacion}</td>
                            <td>{task.nombre}</td>
                            <td>{task.longitud}</td>
                            <td>{task.latitud}</td>
                            <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                            <td>{task.noombre_vereda}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/finca/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
    )
}

export default ListarFinca