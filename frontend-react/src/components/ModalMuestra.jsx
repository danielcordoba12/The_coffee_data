
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import '../style/RegistrarMuestra.css';
import Api from "../services/api";
import '../style/RegistrarMuestra.css'




const ModalMuestra = () => {

    const { id } = useParams();
    const [Muestra, setFincas] = useState({ fecha_creacion: '', codigo_externo: '', consecutivo_informe: '', muestreo: '', preparacion_muestra : '', cantidad : '', noombre_vereda: '', tipo_fermentacion: '', densidad_cafe_verde: '', fecha_procesamiento: '', tipo_tostion: '', tiempo_fermentacion: '', codigo_muestra: '', actividad_agua: '', tiempo_secado: '', presentacion: '', estado: '', cafes_id: ''});
    // const navigate = useNavigate()

    useEffect(()=> {
        const buscarFincas = async () => {
            try {
                const response = await Api.get(`/muestra/buscar/${id}`);
                setFincas(response.data[0]);
            } catch (error) {
                console.error('Error buscando la muestra', error);
                
            }
        };
        buscarFincas();
    },[id]);

    // const handleEditUser1 = async () => {
    //     try {
    //         await Api.put(`/finca/actualizar/${id}`,Finca);
    //         navigate("/finca/listar")
    //     } catch (error) {
    //         console.error('Error editando el finca: ',error);
    //     }
    // }
    // const handleEditUser2 = async () => {
    //     try {
    //         await Api.patch(`/finca/desactivar/${id}`,Finca);
    //         navigate("/finca/listar")
    //     } catch (error) {
    //         console.error('Error desactivando el Finca: ',error);
    //     }
    // }

return(
    <>
    <img src="../../public/img/fondo.png" alt="" className="fondo2" />

<div id="modalInfo">
    <form className="formulario"  method="post">
    <table className="info-complete">
        <tbody>
        <tr>
            <td>  
            <div className='container-label'>
                <label className='label-modal'>Fecha de creacion</label>
                <div className='value'>{Muestra.fecha_creacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Codigo externo</label>
              <div className='value'>{Muestra.codigo_externo}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Consecutivo Informe</label>
              <div className='value'>{Muestra.consecutivo_informe}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Muestreo</label>
              <div className='value'>{Muestra.muestreo}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Preparacion muestra</label>
              <div className='value'>{Muestra.preparacion_muestra}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Cantidad</label>
              <div className='value'>{Muestra.cantidad}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Tipo de molienda</label>
              <div className='value'>{Muestra.tipo_molienda}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Tipo de fermentacion</label>
              <div className='value'>{Muestra.tipo_fermentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Densidad de cafe verde</label>
              <div className='value'>{Muestra.densidad_cafe_verde}</div>
            </div>
          </td>
          <td>
            
            <div className='container-label'>
              <label className='label-modal'>Fecha de procesamiento</label>
              <div className='value'>{Muestra.fecha_procesamiento}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tipo de tostion</label>
              <div className='value'>{Muestra.tipo_tostion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tiempo de fermentacion</label>
              <div className='value'>{Muestra.tiempo_fermentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Codigo de muestra</label>
              <div className='value'>{Muestra.codigo_muestra}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Actividad agua</label>
              <div className='value'>{Muestra.actividad_agua}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tiempo de secado</label>
              <div className='value'>{Muestra.tiempo_secado}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Presentacion</label>
              <div className='value'>{Muestra.presentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Estado</label>
              <div className='value'>{Muestra.estado}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Cafe</label>
              <div className='value'>{Muestra.cafes_id}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </form>

</div>


    </>
  );
};

export default ModalMuestra;

