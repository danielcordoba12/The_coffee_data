import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/lotes.css";
import Sweet from "../helpers/Sweet";
import esES from "../languages/es-ES.json"
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";




const lote = () => {
  const [lotes, setLotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef();

  const navigate = useNavigate()

  useEffect(() => {
    if (lotes.length > 0) {
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
}, [lotes])

  useEffect(() => {
    const buscarLotes = async () => {
      try {
        const response = await Api.get("lote/listar", {
          headers: {
              token: localStorage.getItem("token")
          }
      });
        setLotes(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    buscarLotes();
  }, []);





  return (
    <>

      

      {/* <img src="../../public/img/fondo.png" alt="" className="fondo2" /> */}
      <div className="tablalistar">
      <h4 className="titulo-listado"> Listado de lotes</h4>

        <br />
        <br />

        <table className=" bg-white table table-stiped table-bordered border display responsive nowrap b-4"
                        ref={tableRef}
                        cellPadding={0}
                        width="100%"
                        style={
                            {
                                width : "100%",
                                maxWidth : "100%"
                            }
                        }
                        >
          <thead>
            <tr className="bg-gray-200">
              <th>id</th>
              <th>Fecha Creación</th>
              <th>Propietario</th>
              <th>Finca</th>
              <th>lote</th>
              <th>Longitud</th>
              <th>Latitud</th>
              <th>N° plantas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
          {lotes.length > 0 ? lotes
          .map((task) => (
            <tr key={task.id} className="border-t">
              <td>{task.id}</td>
              <td>{task.fecha_creacion}</td>
              <td>{task.nombre_usuario}</td>
              <td>{task.Nombre_Finca}</td>
              <td>{task.nombre}</td>
              <td>{task.longitud}</td>
              <td>{task.latitud}</td>
              <td>{task.n_plantas}</td>
              <td>{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
             
            </tr>
          )) : <tr><td colSpan={999999999999} className="p-5 text-center">{lotes.message}</td></tr>}
          </tbody>
        </table>

      </div>

    </>
  );
};

export default lote