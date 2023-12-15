import React, { useEffect, useState } from "react"
import '../style/RegistrarMuestra.css';
import Api from "../services/api";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfo}  from'@fortawesome/free-solid-svg-icons'
import '../style/RegistrarMuestra.css'
import { Link } from "react-router-dom";





const ListarMuestra = () => {


  const [muestras, setmuestras] = useState([]);

  useEffect(() => {
      const buscarMuestras = async () => {
          try {
              const response = await Api.get('muestra/listar');
              setmuestras(response.data);
          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      }
      buscarMuestras();
  }, []);
    

  return (
    <>
    <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

    <div className="main-container">
      <table className="table-muestra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de creacion</th>
            <th>Codigo externo</th>
            <th>Consecutivo informe</th>
            <th>Muestreo</th>
            <th>Preparacion de la muestra</th>
            <th>Cantidad</th>
            <th>Tipo de molienda</th>
            <th>tipo de fermantacion</th>
            <th>Actualizar</th>
            <th>Mas</th>
          </tr>
        </thead>
        <tbody>
                {muestras.map((task) => (
                  <tr >
                    <td>{task.id}</td>
                    <td>{task.fecha_creacion}</td>
                    <td>{task.codigo_externo}</td>
                    <td>{task.consecutivo_informe}</td>
                    <td>{task.muestreo}</td>
                    <td>{task.preparacion_muestra}</td>
                    <td>{task.cantidad}</td>
                    <td>{task.tipo_molienda}</td>
                    <td>{task.tipo_fermentacion}</td>
                    <td>
                      <Link to={`/editar/muestra/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Editar
                      </Link>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faInfo} className="icon" />
                      <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => handleUpdate(task.id)}
                                >
                                    <Link to={`/ModalMuestra/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Mas
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
};

export default ListarMuestra;

