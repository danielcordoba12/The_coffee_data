import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";


const ListarMunicipio = () => {
    const [Municipios, setMunicipios] = useState([]);

    useEffect(() => {
        const buscarMunicipios = async () => {
            try {
                const response = await Api.get('municipio/listar');
                setMunicipios(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarMunicipios();
    }, []);
    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tablalistar">
            <h1 className="titu"> Listado de  Municipios</h1>
            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>id</th>
                        <th>Fecha Creación</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>opciones</th>


                    </tr>
                </thead>
                <tbody>
                    {Municipios.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td>{task.id}</td>
                            <td>{task.fecha_creacion}</td>
                            <td>{task.nombre}</td>
                            <td>{task.nombre_departamento}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/Municipio/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default ListarMunicipio