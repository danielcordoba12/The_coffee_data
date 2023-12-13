import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";


const Listarcafe = () => {
    const [cafe, setcafe] = useState([]);

    useEffect(() => {
        const buscarcafe = async () => {
            try {
                const response = await Api.get('cafe/listar');
                setcafe(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarcafe();
    }, []);
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  cafe</h1>
            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>estado</th>
                        <th>lote</th>
                        <th>variedad</th>
                        <th>opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {cafe.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                            <td>{task.numero_lote}</td>
                            <td>{task.nombre_variedad}</td>

                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/cafe/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default Listarcafe