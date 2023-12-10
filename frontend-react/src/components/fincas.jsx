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
        <div className="m-3 p-3 mx-auto">

            <h1 className="text-center font-bold underline text-3xl">Fincas</h1>
            <br />
            <table className="table1">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">id</th>
                        <th className="border p-2">Fecha Creación</th>
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Longitud</th>
                        <th className="border p-2">Latitud</th>
                        <th className="border p-2">Estado</th>
                        <th className="border p-2">Nombre Vereda</th>
                        <th className="border p-2">opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {fincas.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td className="border p-2 text-center">{task.id}</td>
                            <td className="border p-2 text-center">{task.fecha_creacion}</td>
                            <td className="border p-2 text-center">{task.nombre}</td>
                            <td className="border p-2 text-center">{task.longitud}</td>
                            <td className="border p-2 text-center">{task.latitud}</td>
                            <td className="border p-2 text-center">{task.estado}</td>
                            <td className="border p-2 text-center">{task.noombre_vereda}</td>
                            <td className="border p-2 text-center">
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