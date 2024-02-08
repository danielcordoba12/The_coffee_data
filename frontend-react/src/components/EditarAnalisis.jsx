import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";
const EditarAnalisis = () => {

    const { id } = useParams();
    const [analisis, setcafes] = useState({ fecha_analisis: '' , calidad: '', nombre_tipo_analisis: '', nombre_usuario: '', muestras_id: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscaranalisis = async () => {
            try {
                const response = await Api.get(`/analisis/buscar/${id}`);
                setcafes(response.data[0]);
            } catch (error) {
                console.error('Error en buscar ', error);

            }
        };
        buscaranalisis();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/analisis/update/${id}`, analisis);
            Sweet.actualizacionExitosa();
            // Lista de analisis//
            const response = await Api.get("/analisis/listar");
            navigate("/analisis/listar")
        } catch (error) {
            console.error('Error editando el analisis: ', error);
        }
    };
    const handleEditUser2 = async () => {

        const result = await Sweet.confimarDeshabilitar({});
        if (result.isConfirmed){
            try {
                await Api.patch(`/analisis/desactivar/${id}`, analisis);
                navigate("/analisis/listar")
               
            } catch (error) {
                console.error('Error desactivando el analisis: ', error);
            }

        }
        Sweet.deshabilitacionExitosa();
      
    };
    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        if (result.isConfirmed) {
            try {
                await Api.patch(`/analisis/activar/${id}`, analisis);
                navigate("/analisis/listar")

            } catch (error) {
                console.error('Error activando el analisis: ', error);
            }
            
        }
        Sweet.habilitacionExitosa();
     
       
    };

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Analisis</h1>
            <div className="max-w-xs">
            <input
                className="input-field"
                type="date"
                placeholder="fecha_analisis"
                value={analisis.fecha_analisis}
                onChange={(e) => setFincas({ ...analisis, fecha_analisis: e.target.value })}
              />
            <input
                    className="input-field"
                    type="enum"
                    placeholder="calidad"
                    value={analisis.calidad}
                    onChange={(e) => setcafes({ ...analisis, calidad: e.target.value })}
                />
                 <input
                    className="input-field" 
                    type="text" placeholder="nombre_tipo_analisis " 
                    value={analisis.nombre_tipo_analisis} 
                    onChange={(e) => setcafes({ ...analisis, nombre_tipo_analisis : e.target.value })}
                />
                <input
                    className="input-field" 
                    type="number" placeholder="muestras_id " 
                    value={analisis.muestras_id} 
                    onChange={(e) => setcafes({ ...analisis, muestras_id : e.target.value })}
                />
                   <input
                    className="input-field" 
                    type="text" placeholder="nombre " 
                    value={analisis.nombre_usuario} 
                    onChange={(e) => setcafes({ ...analisis, nombre_usuario : e.target.value })}
                />
                
                
                
                <button
                className="btn-primary"
                onClick={handleEditUser1}
              >
                Actualizar
              </button>
              {analisis.estado === 1 ? (
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

export default EditarAnalisis