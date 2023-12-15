import React, { useEffect, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/RegistrarMuestra.css';

const RegistrarMuestra = () => {
  const fecha_creacion = useRef();
  const codigo_externo = useRef();
  const consecutivo_informe = useRef();
  const muestreo = useRef();
  const preparacion_muestra  = useRef();
  const cantidad  = useRef();
  const tipo_molienda  = useRef();
  const tipo_fermentacion  = useRef();
  const densidad_cafe_verde  = useRef();
  const fecha_procesamiento  = useRef();
  const tipo_tostion  = useRef();
  const tiempo_fermentacion  = useRef();
  const codigo_muestra  = useRef();
  const actividad_agua  = useRef();
  const tiempo_secado  = useRef();
  const presentacion  = useRef();
  const cafes_id  = useRef();

  const navigate = useNavigate()

  useEffect(() => {
    if (codigo_externo.current) {
      codigo_externo.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {

      e.preventDefault();

      const data = {
        fecha_creacion: fecha_creacion.current.value,
          codigo_externo: codigo_externo.current.value,
          consecutivo_informe: consecutivo_informe.current.value,
          muestreo: muestreo.current.value,
          preparacion_muestra : preparacion_muestra .current.value,
          cantidad : cantidad .current.value,
          tipo_molienda : tipo_molienda .current.value,
          tipo_fermentacion : tipo_fermentacion .current.value,
          densidad_cafe_verde : densidad_cafe_verde .current.value,
          fecha_procesamiento : fecha_procesamiento .current.value,
          tipo_tostion : tipo_tostion .current.value,
          tiempo_fermentacion : tiempo_fermentacion .current.value,
          codigo_muestra : codigo_muestra .current.value,
          actividad_agua : actividad_agua .current.value,
          tiempo_secado : tiempo_secado .current.value,
          presentacion : presentacion .current.value,
          cafes_id : cafes_id .current.value,

      };


      Api.post("/muestra/registrar",data,{}).finally(()=>{
        navigate("/lote/listar")
    })
  }

  return (
    <>
        <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

    <div className='main-content-registrar'>
    <h1 className='title-registrar-muestras'>Registrar Muestra</h1>

      <form className="formulario-muestra" onSubmit={handleSubmit}  method="post" >
        <div className="columna">
          <div className='container-input'>
            <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' placeholder='' ref={fecha_creacion} />
            <label htmlFor="fecha_creacion" className='label'>Campo 1:</label>
          </div>
          <div className='container-input'> 
            <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder='' ref={codigo_externo} />
            <label htmlFor="codigo_externo" className='label'>Codigo externo</label>
          </div>
          <div className='container-input'>
            <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' placeholder=''  ref={consecutivo_informe}/>
            <label htmlFor="consecutivo_informe" className='label'>Consecutivo informe</label>
          </div>
          <div className='container-input'>
            <input type="text" id="muestreo" name="muestreo" className='input' placeholder='' ref={muestreo} />
            <label htmlFor="muestreo" className='label'>Muestreo</label>
          </div>
          <div className='container-input'>
            <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' placeholder=''ref={preparacion_muestra}  />
            <label htmlFor="preparacion_muestra" className='label'>Preparacion de la muestra</label>
          </div>
          <div className='container-input'>
            <input type="text" id="cantidad" name="cantidad" className='input' placeholder='' ref={cantidad}   />
            <label htmlFor="cantidad" className='label'>Cantidad</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' placeholder='' ref={tipo_molienda}  />  
            <label htmlFor="tipo_molienda" className='label'>Tipo de molienda</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input' placeholder='' ref={tipo_fermentacion}  />
            <label htmlFor="tipo_fermentacion" className='label'>Tipo de fermentacion</label>
          </div>
          <div className='container-input' > 
            <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' placeholder='' ref={densidad_cafe_verde} />
            <label htmlFor="densidad_cafe_verde" className='label'>Densidad de cafe verde</label>
          </div>
        </div>
  
        <div className="columna">
          <div className='container-input'>
            <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input'  placeholder='' ref={fecha_procesamiento}/>
            <label htmlFor="fecha_procesamiento"  className='label'>Fecha de procesamiento</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_tostion" name="tipo_tostion" className='input' placeholder='' ref={tipo_tostion}/>
            <label htmlFor="tipo_tostion" className='label'>Tipo de tostion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input'  placeholder='' ref={tiempo_fermentacion} />
            <label htmlFor="tiempo_fermentacion" className='label'>Tiempo fermentacion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' placeholder=''  ref={codigo_muestra}/>
            <label htmlFor="codigo_muestra"className='label'>Codigo de muestra</label>
          </div>
          <div className='container-input'>
            <input type="text" id="actividad_agua" name="actividad_agua" className='input' placeholder='' ref={actividad_agua}/>
            <label htmlFor="actividad_agua" className='label'>Actividad agua</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tiempo_secado" name="tiempo_secado" className='input' placeholder=''ref={tiempo_secado} />
            <label htmlFor="tiempo_secado" className='label'>Tiempo de secado</label>
          </div>
          <div className='container-input'>
            <input type="text" id="presentacion" name="presentacion" className='input' placeholder=''ref={presentacion} />
            <label htmlFor="presentacion" className='label'>Presentacion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="cafes_id" name="cafes_id" className='input' placeholder=''ref={cafes_id} />
            <label htmlFor="cafes_id" >Cafe</label>
          </div>
      <button type="submit" className='button'>Enviar</button>

          
        </div>
        
  
      </form>
    </div>

      </>
    );
};


export default RegistrarMuestra;


