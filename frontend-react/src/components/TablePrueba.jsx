import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/fincas.css";
import Sweet from "../helpers/Sweet";
import $ from "jquery";
import jQuery from "jquery";
import "bootstrap"
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net-responsive';
import 'datatables.net-responsive/js/dataTables.responsive';
import 'datatables.net-responsive-dt';
import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';


const FincaView = () => {
    const [fincas, setFincas] = useState([]);

    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get("finca/listar");
                setFincas(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        buscarFincas();
    }, []);


    const dataTableRef = useRef(null);

    useEffect(() => {
        if (fincas.length > 0) {
            initializeDataTable();
        }
    }, [fincas]);

    const initializeDataTable = () => {
        $(document).ready(function () {
            $(dataTableRef.current).DataTable({
                responsive: true,
                responsivePriority: 1,
                targets: -1,
            });
        });

        
    };
    return (
        <>



            <div className="container-fluid w-full">


                <table className="table table-stripped table-bordered border display reponsive nowrap b-4" ref={dataTableRef}>

                    <thead>
                        <tr className="bg-gray-200">
                            <th>id</th>
                            <th>Fecha Creación</th>
                            <th>Nombre</th>
                            <th>Longitud</th>
                            <th>Latitud</th>
                            <th>usuario</th>
                            <th>municipio</th>
                            <th>Estado</th>
                            <th>Nombre Vereda</th>
                            <th>opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fincas

                            .map((task) => (
                                <tr key={task.id} className="border-t">
                                    <td className="td-id">{task.id}</td>
                                    <td>{task.fecha_creacion}</td>
                                    <td>{task.nombre}</td>
                                    <td>{task.longitud}</td>
                                    <td>{task.latitud}</td>
                                    <td>{task.nombre_usuario}</td>
                                    <td>{task.nombre_municipio}</td>
                                    <td>{task.estado === 1 ? "Activo" : "Desactivado"}</td>
                                    <td>{task.noombre_vereda}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn-primary"
                                                onClick={() => openEditarModal(task.id)}
                                            >
                                                Modificar
                                            </button>
                                            <div className="btn-secondary">
                                                Lotes
                                                <div className="btn-subgroup up">
                                                    <button
                                                        type="button"
                                                        className="btn-ver"
                                                        onClick={() => { setFincaId(task.id); openLotesModal(task.id) }}
                                                    >
                                                        Ver Lotes
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn-ver"
                                                        onClick={() => { setIdFinca(task.id); openRegistrarModal() }}
                                                    >
                                                        Registrar Lote
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>




        </>
    );
};

export default FincaView;
