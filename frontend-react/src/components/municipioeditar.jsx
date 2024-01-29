import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
const Editarmunicipio = () => {

    const { id } = useParams();
    const [municipios, setmunicipios] = useState({ fecha_creacion: '', nombre: '', departamentos_id: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscarmunicipios = async () => {
            try {
                const response = await Api.get(`/municipio/buscar/${id}`);
                setmunicipios(response.data);
            } catch (error) {
                console.error('Error buscando el usuario', error);

            }
        };
        buscarmunicipios();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/municipio/Actualizar/${id}`, municipios);
            navigate("/municipio/listar")
        } catch (error) {
            console.error('Error editando el municipio: ', error);
        }
    }

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar municipio</h1>
            <div className="max-w-xs">
                <input
                    className="input-field" 
                    type="date" placeholder="fecha_creacion" 
                    value={municipios.fecha_creacion} 
                    onChange={(e) => setmunicipios({ ...municipios, fecha_creacion: e.target.value })}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="nombre"
                    value={municipios.nombre}
                    onChange={(e) => setmunicipios({ ...municipios, nombre: e.target.value })}
                />

                <input
                    className="input-field"
                    type="number"
                    placeholder="departamentos_id"
                    value={municipios.departamentos_id}
                    onChange={(e) => setmunicipios({ ...municipios, departamentos_id: e.target.value })}
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

export default Editarmunicipio








