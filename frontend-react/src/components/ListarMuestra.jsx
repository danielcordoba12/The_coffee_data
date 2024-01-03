  import React, { useEffect, useRef, useState } from "react"
  import '../style/RegistrarMuestra.css';
  import Api from "../services/api";
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faInfo}  from'@fortawesome/free-solid-svg-icons'
  import '../style/RegistrarMuestra.css'
  import { Link } from "react-router-dom";
import Sweet from "../helpers/Sweet";


  const Muestra = () => {
    const[muestra, setMuestra] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const modalMuestraRef = useRef(null);
    let modalVisible = false




    useEffect(()=>{
      listarMuestra()
    },[]);
  // const LiMuestra = () => {


  //   const [muestras, setmuestras] = useState([]);

  //   useEffect(() => {
  //       const buscarMuestras = async () => {
  //           try {
  //               const response = await Api.get('muestra/listar');
  //               setmuestras(response.data);
  //           } catch (error) {
  //               console.error('Error fetching tasks:', error);
  //           }
  //       }
  //       buscarMuestras();
  //   }, []);
      
  function toggleModal() {
    const mainConterRegistrar = document.getElementById('mainConterRegistrar'); // Asegúrate de tener una referencia al modal

    // Cambiar el valor de modalVisible
    modalVisible = !modalVisible;

    // Mostrar u ocultar el modal según el valor de modalVisible
    if (modalVisible) {
        mainConterRegistrar.style.display = "flex";
    } else {
        mainConterRegistrar.style.display = "none";
    }
}


      function ocultarModal(){
        mainConterRegistrar.style.display = "none"
        listarMuestra()
      }
      function mostrarModal(){
        mainConterRegistrar.style.display = "flex"
        listarMuestra()
      }
  async function listarMuestra(){
    try {
      // console.log(Api)
      const response = await  fetch('http://localhost:4000/muestra/listar', {
        method: "get",
        headers: {
            "content-type": "application/json",
        },
      })
      const data= await response.json();
        setMuestra(data);
        console.log(data)

      }catch(e){
        console.log(e + "error")

      }
  }


    function RegistrarMuestra(){
      
      let fecha_creacion = document.getElementById('fecha_creacion').value
      let codigo_externo = document.getElementById('codigo_externo').value
      let consecutivo_informe = document.getElementById('consecutivo_informe').value
      let muestreo = document.getElementById('muestreo').value
      let preparacion_muestra = document.getElementById('preparacion_muestra').value
      let cantidad = document.getElementById('cantidad').value
      let tipo_molienda = document.getElementById('tipo_molienda').value
      let tipo_fermentacion = document.getElementById('tipo_fermentacion').value
      let densidad_cafe_verde = document.getAnimations('densidad_cafe_verde').value
      let fecha_procesamiento = document.getElementById('fecha_procesamiento').value
      let tipo_tostion = document.getElementById('tipo_tostion').value
      let tiempo_fermentacion = document.getElementById('tiempo_fermentacion').value
      let codigo_muestra = document.getElementById('codigo_muestra').value
      let actividad_agua = document.getElementById('actividad_agua').value
      let tiempo_secado = document.getElementById('tiempo_secado').value
      let presentacion = document.getElementById('presentacion').value
      let cafes_id = document.getElementById('cafes_id').value

      const  validacion = true


      fetch('http://localhost:4000/muestra/registrar', {
        method:'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({fecha_creacion,codigo_externo,consecutivo_informe,muestreo,preparacion_muestra,cantidad,tipo_molienda,tipo_fermentacion,densidad_cafe_verde,fecha_procesamiento,tipo_tostion,tiempo_fermentacion,codigo_muestra,actividad_agua,tiempo_secado,presentacion,cafes_id})
      })

        .then((res) => res.json())
        .then(data => {

            if(data.status == 200) {
              Sweet.registroExitoso();
            }
            if(data.status  == 400) {
              Sweet.registroFallido();
            }
          toggleModal()

        })
        .catch(error => {
          console.error("Error del servidor" + error);
        })
    }

    return (
      <div>
          <div className={`main-content-registrar ${showModal ? 'show' : '' }`} id="mainConterRegistrar"  >
    <h1 className='title-registrar-muestras'>Registrar Muestra</h1>

      <form className="formulario-muestra" 
      // onSubmit={handleSubmit}  
        method="post" >
        <div className="columna">
          <div className='container-input'>
            <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' placeholder='' />
            <label htmlFor="fecha_creacion" className='label'>Campo 1:</label>
          </div>
          <div className='container-input'> 
            <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder=''  />
            <label htmlFor="codigo_externo" className='label'>Codigo externo</label>
          </div>
          <div className='container-input'>
            <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' placeholder='' />
            <label htmlFor="consecutivo_informe" className='label'>Consecutivo informe</label>
          </div>
          <div className='container-input'>
            <input type="text" id="muestreo" name="muestreo" className='input' placeholder=''  />
            <label htmlFor="muestreo" className='label'>Muestreo</label>
          </div>
          <div className='container-input'>
            <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' placeholder=''  />
            <label htmlFor="preparacion_muestra" className='label'>Preparacion de la muestra</label>
          </div>
          <div className='container-input'>
            <input type="text" id="cantidad" name="cantidad" className='input' placeholder=''   />
            <label htmlFor="cantidad" className='label'>Cantidad</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' placeholder=''  />  
            <label htmlFor="tipo_molienda" className='label'>Tipo de molienda</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input' placeholder=''   />
            <label htmlFor="tipo_fermentacion" className='label'>Tipo de fermentacion</label>
          </div>
          <div className='container-input' > 
            <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' placeholder=''  />
            <label htmlFor="densidad_cafe_verde" className='label'>Densidad de cafe verde</label>
          </div>
        </div>
  
        <div className="columna">
          <div className='container-input'>
            <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input'  placeholder='' />
            <label htmlFor="fecha_procesamiento"  className='label'>Fecha de procesamiento</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tipo_tostion" name="tipo_tostion" className='input' placeholder='' />
            <label htmlFor="tipo_tostion" className='label'>Tipo de tostion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input'  placeholder=''  />
            <label htmlFor="tiempo_fermentacion" className='label'>Tiempo fermentacion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' placeholder=''  />
            <label htmlFor="codigo_muestra"className='label'>Codigo de muestra</label>
          </div>
          <div className='container-input'>
            <input type="text" id="actividad_agua" name="actividad_agua" className='input' placeholder=''/>
            <label htmlFor="actividad_agua" className='label'>Actividad agua</label>
          </div>
          <div className='container-input'>
            <input type="text" id="tiempo_secado" name="tiempo_secado" className='input' placeholder='' />
            <label htmlFor="tiempo_secado" className='label'>Tiempo de secado</label>
          </div>
          <div className='container-input'>
            <input type="text" id="presentacion" name="presentacion" className='input' placeholder='' />
            <label htmlFor="presentacion" className='label'>Presentacion</label>
          </div>
          <div className='container-input'>
            <input type="text" id="cafes_id" name="cafes_id" className='input' placeholder='' />
            <label htmlFor="cafes_id" >Cafe</label>
          </div>
          <button className="btn-reg-mue" type="button" onClick={()=>{
          // setShowModla(true);
          toggleModal()

        }}>
            Cancelar
        </button>
          <button  className='button' type="button" onClick={RegistrarMuestra} >Enviar</button>

          
        </div>
        
  
      </form>
    </div>
        <div>
      <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

      <div className="main-container">
        <button className="btn-reg-mue" onClick={()=>{
          // setShowModla(true);
          toggleModal()

        }}>
            Registrar muestra
        </button>

        <table className="table-muestra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de creacion</th>
              <th>Codigo externo</th>
              <th>Consecutivo informe</th>
              <th>Muestreo</th>
              <th>Preparacion de la muestra</th>
              <th>Cantidad</th>
              <th>Tipo de molienda</th>
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Mas</th>
            </tr>
          </thead>
          <tbody>
                  {muestra.map((task,index) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.fecha_creacion}</td>
                      <td>{task.codigo_externo}</td>
                      <td>{task.consecutivo_informe}</td>
                      <td>{task.muestreo}</td>
                      <td>{task.preparacion_muestra}</td>
                      <td>{task.cantidad}</td>
                      <td>{task.tipo_molienda}</td>
                      <td>{task.estado}</td>
                      <td>
                        <Link to={`/editar/muestra/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                          Editar
                        </Link>
                      </td>
                      <td>
                        <button
                                      type="button"
                                      className="btn-primary"
                                      onClick={() => handleUpdate(task.id)}
                                  >
                                      <Link to={`/ModalMuestra/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                          Mas
                                      </Link>
                                  </button>
                      </td> 

                    </tr>
                  ))}
                </tbody>
        </table>
      </div>
      {console.log(muestra + "Esta es lamuestra")}

      </div>
  {/* //////////Registrar Muestra/////////////////////////// */}


        

      </div>

    );
  // };


  

        
  }


  export default  Muestra;

