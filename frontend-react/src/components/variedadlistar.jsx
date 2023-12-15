import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";


const ListarVariedad = () => {
    const [variedades, setvariedades] = useState([]);

    useEffect(() => {
        const buscarvariedades = async () => {
            try {
                const response = await Api.get('variedad/listar');
                setvariedades(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarvariedades();
    }, []);
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  variedades</h1>
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
                    {variedades.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{task.fecha_creacion}</td>
                            <td>{task.nombre}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/variedad/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default ListarVariedad