import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
import Sweet from "../helpers/Sweet";
import '../style/listana.css';

const EditarAnalisis = () => {

    const { id} = useParams();
    const [analisis, setAnalisis] = useState({ tipo_analisis_id: '', muestras_id: '', usuarios_id: '', propietario:'', });
    const navigate = useNavigate()

    useEffect(() => {
        const buscaranalis = async () => {
            try {
                const response = await Api.get(`/analisis/buscar/${id}`);
                setAnalisis(response.data[0]);
            } catch (error) {
                console.error('Error en buscar ', error);
            }
        };
        buscaranalis();
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
   
            try {
                await Api.patch(`/analisis/desactivar/${id}`, analisis);
                navigate("/analisis/listar")
               
            } catch (error) {
                console.error('Error desactivando el analisis: ', error);
            }

      
    };
    const handleEditUser3 = async () => {
        const result = await Sweet.confimarHabilitar({});
        
        try {
            await Api.patch(`/analisis/activar/${id}`, analisis);
            navigate("/analisis/listar")
        } catch (error) {
            console.error('Error activando el analisis: ', error);
        }
    }

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Analisis</h1>
            <div className="max-w-xs">

                 <input
                    className="input-field" 
                    type="number" placeholder="tipo_analisis_id " 
                    value={analisis.tipo_analisis_id} 
                    onChange={(e) => setAnalisis({ ...analisis, tipo_analisis_id : e.target.value })}
                />
                <input
                    className="input-field" 
                    type="number" placeholder="muestras_id " 
                    value={analisis.muestras_id} 
                    onChange={(e) => setAnalisis({ ...analisis, muestras_id : e.target.value })}
                />
                   <input
                    className="input-field" 
                    type="number" placeholder="usuarios_id" 
                    value={analisis.usuarios_id} 
                    onChange={(e) => setAnalisis({ ...analisis, usuarios_id : e.target.value })}
                />
                 <input
                    className="input-field" 
                    type="number" placeholder="propietario" 
                    value={analisis.propietario} 
                    onChange={(e) => setAnalisis({ ...analisis, propietario : e.target.value })}
                />
                
                <button className="btn-primary" onClick={handleEditUser1}>
                Actualizar
            </button>
          {analisis.estado === 1 ? (
            <button className="btn-secondary" onClick={handleEditUser2}>
              Desactivar
            </button>
          ) : (
            <button className="btn-tertiary" onClick={handleEditUser3}>
              Activar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EditarAnalisis