import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";
import '../style/listana.css'
import Swal from "sweetalert2";


const ListarAnalisis = () => {
    const [fincas, setFincas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [tipos_analisis, setTipos] = useState([]);



    

    function formatDate(dateString) {
        if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
        const fecha = new Date(dateString);
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('analisis/listar');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarUsuarios();
    }, []);
    
    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get('analisis/listar');
                setFincas(response.data);
                setTipos(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarFincas();
    }, []);
    return (<>
        <img src="../../public/img/fondo_coffee.jpg" alt="" className="fondo2" />
        <div className="tablalistar">

            <h1 className="titu">Análisis</h1>
            <br />
            <table className="tableprincipal">
                <thead>
                    <tr className="bg-gray-200">
                        <th>ID</th>
                        <th>FECHA</th>
                        <th>TIPO ANALISIS</th>
                        <th>CONSECUTIVO INFORME</th>
                        <th>ASIGNACIÓN</th>
                        <th>ESTADO</th>
                        <th>PROPIETARIO</th>
                        <th>FINCA</th>
                        <th>LOTE</th>

                        <th></th>
                        <th></th>

            
                    </tr>
                </thead>
                <tbody>
                    {fincas.map((task) => (
                        <tr key={task.id_analisis} className="border-t">
                             <td>{task.id_analisis}</td> 
                            <td>{task.fecha_analisis=formatDate(task.fecha_analisis)}</td> 
                            <td>{task.nombre_tipo_analisis}</td>
                            <td className="conse">{task.consecutivo_informe}</td>
                            <td>{task.nombre_usuario}</td>
                            <td className="cont-estado">{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                            <td>{task.propietario}</td> 
                            <td>{task.nombre_fincas}</td> 
                            <td>{task.nombre_lotes}</td> 
                           
                            <td>
                                <button
                                    type="button"
                                    className="btn-primary"
                                   
                                >
                                    <Link to={`/analisis/update/${task.id_analisis}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Modificar
                                    </Link>
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-registrar-d"
                                  
                                >
                                    <Link to={`/analisis/registrar`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Registrar
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