  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import '../style/RegistrarMuestra.css'
  import Api from "../services/api";
  const EditarMestra = () => {
      
      const { id } = useParams();
      const [Muestra, setMuestra] = useState({ fecha_creacion: '', codigo_externo: '', consecutivo_informe: '', muestreo: '', preparacion_muestra : '', cantidad : '', tipo_molienda: '',tipo_fermentacion: '', densidad_cafe_verde: '', fecha_procesamiento: '', tipo_tostion: '', tiempo_fermentacion: '', codigo_muestra: '', actividad_agua: '', tiempo_secado: '', presentacion: '', cafes_id: ''});
      const navigate = useNavigate()
      

      useEffect(()=> {
          const buscarFincas = async () => {
              try {
                  const response = await Api.get(`/muestra/buscar/${id}`);
                  setMuestra(response.data[0]);
              } catch (error) {
                  console.error('Error buscando la muestra', error);
                  
              }
          };
          buscarFincas();
      },[id]);

      const handleEditUser1 = async () => {
        try {
            await Api.put(`/muestra/actualizar/${id}`, Muestra);
            // Si la actualización es exitosa, se ejecutará esta línea
            navigate("/listar/muestra/");
        } catch (error) {
            console.error('Error editando la muestra: ', error);
            // Aquí puedes agregar lógica adicional para manejar el error, si es necesario
        }
    };
      const handleEditUser2 = async () => {
          try {
              await Api.patch(`/muestra/desactivar/${id}`,Muestra);
              navigate("/listar/muestra")
          } catch (error) {
              console.error('Error desactivando la muestra: ',error);
          }
      }
      const handleEditUser3 = async () => {
          try {
              await Api.patch(`/muestra/activar/${id}`, Muestra);
              navigate("/listar/muestra")
          } catch (error) {
              console.error('Error activando el Lote: ', error);
          }
      }
      

  return(
      <>
      <img src="../../public/img/fondo.png" alt="" className="fondo2" />

  <div className='main.content'>
  <h1 className='title'>Editar Muestra</h1>

    <form className="formulario info-complete"  >
      <div className="columna">
        <div className='container-input'>
          <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' placeholder='' value={Muestra.fecha_creacion} onChange={(e)=> setMuestra({ ...Muestra, fecha_creacion: e.target.value})}/> 
          
        </div>
        <div className='container-input'> 
        <label htmlFor="fecha_creacion" className='label'>Campo 1:</label>
          <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder='' value={Muestra.codigo_externo} onChange={(e)=> setMuestra({ ...Muestra, codigo_externo: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' placeholder=''  value={Muestra.consecutivo_informe} onChange={(e)=> setMuestra({ ...Muestra , consecutivo_informe: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="muestreo" name="muestreo" className='input' placeholder='' value={Muestra.muestreo} onChange={(e)=> setMuestra({ ...Muestra, muestreo: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' placeholder=''value={Muestra.preparacion_muestra} onChange={(e)=> setMuestra({ ...Muestra, preparacion_muestra: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="cantidad" name="cantidad" className='input' placeholder='' value={Muestra.cantidad} onChange={(e)=> setMuestra({ ...Muestra, cantidad: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' placeholder='' value={Muestra.tipo_molienda} onChange={(e)=> setMuestra({ ...Muestra, tipo_molienda: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input' placeholder=''value={Muestra.tipo_fermentacion} onChange={(e)=> setMuestra({ ...Muestra, tipo_fermentacion: e.target.value})}/>
        </div>
        <div className='container-input' > 
          <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' placeholder='' value={Muestra.densidad_cafe_verde} onChange={(e)=> setMuestra({ ...Muestra, densidad_cafe_verde: e.target.value})}/>
        </div>
      </div>

      <div className="columna">
        <div className='container-input'>
          <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input'  placeholder='' value={Muestra.fecha_procesamiento} onChange={(e)=> setMuestra({ ...Muestra, fecha_procesamiento: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_tostion" name="tipo_tostion" className='input'  value={Muestra.tipo_tostion} onChange={(e)=> setMuestra({ ...Muestra, tipo_tostion: e.target.value})}/>
          <label htmlFor="tipo_tostion" className='label'></label>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input'  placeholder='' value={Muestra.tiempo_fermentacion} onChange={(e)=> setMuestra({ ...Muestra, tiempo_fermentacion: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' placeholder=''  value={Muestra.codigo_muestra} onChange={(e)=> setMuestra({ ...Muestra, codigo_muestra: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="actividad_agua" name="actividad_agua" className='input' placeholder=''  value={Muestra.actividad_agua} onChange={(e)=> setMuestra({ ...Muestra, actividad_agua: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_secado" name="tiempo_secado" className='input' placeholder='' value={Muestra.tiempo_secado} onChange={(e)=> setMuestra({ ...Muestra, tiempo_secado: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="presentacion" name="presentacion" className='input' placeholder='' value={Muestra.presentacion} onChange={(e)=> setMuestra({ ...Muestra, presentacion: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="text" id="cafes_id" name="cafes_id" className='input' placeholder='' value={Muestra.cafes_id} onChange={(e)=> setMuestra({ ...Muestra, cafes_id: e.target.value})}/>
        </div>
        <div className="container-button">
      <button  className='button' type="submit" onClick={handleEditUser1}>Enviar</button>
      {Muestra.estado === 1 ? (
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
      

    </form>
  </div>

    </>
  );  
      };
      export default EditarMestra;
