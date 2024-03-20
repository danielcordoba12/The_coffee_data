import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
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
      <div className="tablalistar-lote">
      <div className="container-fluid-l ">
        <br />   <br />
      <div className="contTitle-lote">
      <h4 className="titulo-lote">Lotes</h4>
      </div>
        <br />
        <br />
        <br />

        <table className=" table table-hover rounded-3 display responsive nowrap shadow"
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
              <th className="text-muted">id</th>
              <th className="text-muted">Fecha Creación</th>
              <th className="text-muted">Propietario</th>
              <th className="text-muted">Finca</th>
              <th className="text-muted">lote</th>
              <th className="text-muted">Longitud</th>
              <th className="text-muted">Latitud</th>
              <th className="text-muted">N° plantas</th>
              <th className="text-muted">Estado</th>
            </tr>
          </thead>
          <tbody>
          {lotes.length > 0 ? lotes
          .map((task) => (
            <tr key={task.id} className="border-t">
              <td className="text-muted">{task.id}</td>
              <td className="text-muted">{task.fecha_creacion}</td>
              <td className="text-muted">{task.nombre_usuario}</td>
              <td className="text-muted">{task.Nombre_Finca}</td>
              <td className="text-muted">{task.nombre}</td>
              <td className="text-muted">{task.longitud}</td>
              <td className="text-muted">{task.latitud}</td>
              <td className="text-muted">{task.n_plantas}</td>
              <td className="text-muted">{task.estado === 1 ? 'Activo' : 'Desactivado'}</td>
             
            </tr>
          )) : <tr><td colSpan={999999999999} className="p-5 text-center">{lotes.message}</td></tr>}
          </tbody>
        </table>
        </div>
      </div>

    </>
  );
};

export default lote