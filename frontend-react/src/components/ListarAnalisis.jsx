import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";
import '../style/listana.css'


const ListarAnalisis = () => {
    const [fincas, setFincas] = useState([]);

    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get('analisis/listar');
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
            <h1 className="titu">Listar Análisis</h1>
            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Fecha</th>
                        <th>Calidad</th>
                        <th>Tipo Análisis</th>
                        <th>Muestras</th>
                        <th>Usuarios</th>
                        <th>Estado</th>

            
                    </tr>
                </thead>
                <tbody>
                    {fincas.map((task) => (
                        <tr key={task.id} className="border-t">
                             <td>{task.fecha_analisis}</td>
                            <td>{task.calidad}</td>
                            <td>{task.tipo_analisis_id}</td>
                            <td>{task.muestras_id}</td>
                            <td>{task.usuarios_id}</td>
                            <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                           
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/analisis/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default ListarAnalisis