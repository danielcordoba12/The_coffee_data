import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
const Editarvariedad = () => {

    const { id } = useParams();
    const [variedads, setvariedads] = useState({ fecha_creacion: '', nombre: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscarvariedads = async () => {
            try {
                const response = await Api.get(`/variedad/buscar/${id}`);
                setvariedads(response.data);
            } catch (error) {
                console.error('Error buscando el usuario', error);

            }
        };
        buscarvariedads();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/variedad/Actualizar/${id}`, variedads);
            navigate("/variedad/listar")
        } catch (error) {
            console.error('Error editando el variedad: ', error);
        }
    }

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar variedad</h1>
            <div className="max-w-xs">
                <input
                    className="input-field" 
                    type="date" placeholder="fecha_creacion" 
                    value={variedads.fecha_creacion} 
                    onChange={(e) => setvariedads({ ...variedads, fecha_creacion: e.target.value })}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="nombre"
                    value={variedads.nombre}
                    onChange={(e) => setvariedads({ ...variedads, nombre: e.target.value })}
                />

                
                <button
                className="btn-primary"
                onClick={handleEditUser1}
              >
                Actualizar
              </button>
            </div>
        </div>
        </>
    );

}

export default Editarvariedad