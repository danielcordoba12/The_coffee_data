import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
import '../style/fincas.css'
const EditarFinca = () => {

    const { id } = useParams();
    const [Finca, setFincas] = useState({ fecha_creacion: '', nombre: '', longitud: '', latitud: '', usuarios_id: '', municipios_id: '', noombre_vereda: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscarFincas = async () => {
            try {
                const response = await Api.get(`/finca/buscar/${id}`);
                setFincas(response.data[0]);
            } catch (error) {
                console.error('Error buscando el usuario', error);

            }
        };
        buscarFincas();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/finca/actualizar/${id}`, Finca);
            navigate("/finca/listar")
        } catch (error) {
            console.error('Error editando el Finca: ', error);
        }
    }
    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/finca/desactivar/${id}`, Finca);
            navigate("/finca/listar")
        } catch (error) {
            console.error('Error desactivando el Finca: ', error);
        }
    }
    const handleEditUser3 = async () => {
        try {
            await Api.patch(`/finca/activar/${id}`, Finca);
            navigate("/finca/listar")
        } catch (error) {
            console.error('Error activando el Finca: ', error);
        }
    }

    return (
        <>
          <img src="../../public/img/fondo.png" alt="" className="fondo2" />
          <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Finca</h1>
            <div className="max-w-xs">
            <input
                    className="input-field" type="date" placeholder="fecha_creacion" value={Finca.fecha_creacion} onChange={(e) => setFincas({ ...Finca, fecha_creacion: e.target.value })}
                />
              <input
                className="input-field"
                type="text"
                placeholder="nombre"
                value={Finca.nombre}
                onChange={(e) => setFincas({ ...Finca, nombre: e.target.value })}
              />
              <input
                className="input-field"
                type="text"
                placeholder="longitud"
                value={Finca.longitud}
                onChange={(e) => setFincas({ ...Finca, longitud: e.target.value })}
              />
              <input
                className="input-field"
                type="text"
                placeholder="latitud"
                value={Finca.latitud}
                onChange={(e) => setFincas({ ...Finca, latitud: e.target.value })}
              />
              <input
                className="input-field"
                type="number"
                placeholder="usuarios_id"
                value={Finca.usuarios_id}
                onChange={(e) => setFincas({ ...Finca, usuarios_id: e.target.value })}
              />
              <input
                className="input-field"
                type="number"
                placeholder="municipios_id"
                value={Finca.municipios_id}
                onChange={(e) => setFincas({ ...Finca, municipios_id: e.target.value })}
              />
              <input
                className="input-field"
                type="text"
                placeholder="noombre_vereda"
                value={Finca.noombre_vereda}
                onChange={(e) => setFincas({ ...Finca, noombre_vereda: e.target.value })}
              />
              <button
                className="btn-primary"
                onClick={handleEditUser1}
              >
                Actualizar
              </button>
              {Finca.estado === 1 ? (
                <button
                  className="btn-secondary"
                  onClick={handleEditUser2}
                >
                  Desactivar
                </button>
              ) : (
                <button
                  className="btn-tertiary"
                  onClick={handleEditUser3}
                >
                  Activar
                </button>
              )}
            </div>
          </div>
        </>
      );
              }
      


export default EditarFinca