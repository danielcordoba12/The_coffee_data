import React, { useEffect, useState } from "react"
import Api from "../services/api";
import { Link } from "react-router-dom";
import '../style/lotes.css'


const Listarlote = () => {
    const [lotes, setlotes] = useState([]);

    useEffect(() => {
        const buscarlotes = async () => {
            try {
                const response = await Api.get('lote/listar');
                setlotes(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        buscarlotes();
    }, []);
    return (
        <>
          <img src="../../public/img/fondo.png" alt="" className="fondo2" />
          <div className="tablalistar">
            <h1 className="titu">lotes</h1>
            <br />
            <table className="tableprincipal">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Fecha Creación</th>
                  <th>Nombre</th>
                  <th>Longitud</th>
                  <th>Latitud</th>
                  <th>Estado</th>
                  <th>opciones</th>
                </tr>
              </thead>
              <tbody>
                {lotes.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.fecha_creacion}</td>
                    <td>{task.nombre}</td>
                    <td>{task.longitud}</td>
                    <td>{task.latitud}</td>
                    <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => handleUpdate(task.id)}
                      >
                        <Link to={`/lote/editar/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
      );
      
}

export default Listarlote