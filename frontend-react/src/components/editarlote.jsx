import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";


const EditarLote = () => {
    const { id } = useParams();
    const [Lote, setLotes] = useState({ fecha_creacion: '', nombre: '', longitud: '', latitud: '', fincas_id: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscarLotes = async () => {
            try {
                const response = await Api.get(`/lote/buscar/${id}`);
                setLotes(response.data);
            } catch (error) {
                console.error('Error buscando el usuario', error);

            }
        };
        buscarLotes();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/lote/Actualizar/${id}`, Lote);
            navigate("/lote/listar")
        } catch (error) {
            console.error('Error editando el Lote: ', error);
        }
    }
    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/lote/Desactivar/${id}`, Lote);
            navigate("/lote/listar")
        } catch (error) {
            console.error('Error desactivando el Lote: ', error);
        }
    }
    const handleEditUser3 = async () => {
        try {
            await Api.patch(`/lote/activar/${id}`, Lote);
            navigate("/lote/listar")
        } catch (error) {
            console.error('Error activando el Lote: ', error);
        }
    }

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Lote</h1>
            <div className="max-w-xs">
                <input
                    className="input-field" type="date" placeholder="fecha_creacion" value={Lote.fecha_creacion} onChange={(e) => setLotes({ ...Lote, fecha_creacion: e.target.value })}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="nombre"
                    value={Lote.nombre}
                    onChange={(e) => setLotes({ ...Lote, nombre: e.target.value })}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="longitud"
                    value={Lote.longitud}
                    onChange={(e) => setLotes({ ...Lote, longitud: e.target.value })}
                />
                <input
                    className="input-field"
                    type="text"
                    placeholder="latitud"
                    value={Lote.latitud}
                    onChange={(e) => setLotes({ ...Lote, latitud: e.target.value })}
                />
                <input
                    className="input-field"
                    type="number"
                    placeholder="fincas_id"
                    value={Lote.fincas_id}
                    onChange={(e) => setLotes({ ...Lote, fincas_id: e.target.value })}
                />
                <button
                    className="btn-primary"
                    onClick={handleEditUser1}
                >
                    Actualizar
                </button>
                <button
                    className="btn-secondary"
                    onClick={handleEditUser2}
                >
                    Desactivar
                </button>
                <button
                    className="btn-tertiary"
                    onClick={handleEditUser3}
                >
                    Activar
                </button>
            </div>
        </div>
        </>
    );

}

export default EditarLote