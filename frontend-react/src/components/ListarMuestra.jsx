  import React, { useEffect, useRef, useState } from "react"
  import '../style/RegistrarMuestra.css';
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faX }  from'@fortawesome/free-solid-svg-icons'
  // import '../style/RegistrarMuestra.css'
  import Sweet from "../helpers/Sweet";


  const Muestra = () => {
    const[muestra, setMuestra] = useState([]);
    const [showModal,setShowModal] = useState(false);
    // const [showModal2, setShowModal2] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const modalMuestraRef = useRef(null);
    let modalVisible = false; 
    const [muestraSeleccionada,setMuestraSeleccionada] = useState({});

    function formatDate(dateString) {
      if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
      const fecha = new Date(dateString);
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }


    useEffect(()=>{
      listarMuestra()
    },[]);




  // function toggleModal() {
  //   // Cambiar el valor de showModal en lugar de modalVisible
  //   console.log("Toggle modal funcional");
  //   setShowModal(!showModal);
  // }
  const toggleModal = (modalId) => {
    if (modalId === 1) {
      console.log("modal" , modalId);
      setShowModal1(!showModal1);
    } else if (modalId === 2) {
      console.log("modal" , modalId);

      setShowModal2(!showModal2);
    } else if (modalId === 3) {
      console.log("modal" , modalId);

      setShowModal3(!showModal3);
    }
  };
  const hideAllModals = () => {
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
  };  


      
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
      let densidad_cafe_verde = document.getElementById('densidad_cafe_verde').value
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
          hideAllModals();
          listarMuestra();

        })
        .catch(error => {
          console.error("Error del servidor" + error);
        })
    }
    function buscarMuestra(id) {
      fetch(`http://localhost:4000/muestra/buscar/${id}`,{
        method:'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMuestraSeleccionada(data[0]); })
        .catch((error) => {
          console.error(error);
        });
    }
    function desactivarMuestra(id){
      Sweet.confimarDeshabilitar().then((result) => {
        if(result.isConfirmed) {
          fetch(`http://localhost:4000/muestra/desactivar/${id}`,{
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            }
          })
                .then(res => res.json())
                .then(data => {
                  if(data.status == 200) {
                    Sweet.deshabilitacionExitosa();
                  }
                  if(data.status == 401) {
                    Sweet.deshabilitacionFallida(); 
                  }
                  listarMuestra();  
                })
                .catch(error =>  {
                  console.error('Error:', error)
                });

        }
      })
    }
    function activarMuestra(id){
      Sweet.confimarHabilitar().then((result) => {
        if(result.isConfirmed) {
          fetch(`http://localhost:4000/muestra/activar/${id}`,{
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            }
          })
                .then(res => res.json())
                .then(data => {
                  if(data.status == 200) {
                    Sweet.habilitacionExitosa();
                  }
                  if(data.status == 401) {
                    Sweet.habilitacionFallida(); 
                  }
                  listarMuestra();  
                })
                .catch(error =>  {
                  console.error('Error:', error)
                });

        }
      })
    }

    function actualizarMuestra(id) {
      fetch( `http://localhost:4000/muestra/actualizar/${id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json'

      },
      body: JSON.stringify(muestraSeleccionada),
    })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.status);

          if (data.status == 200) {
            Sweet.actualizacionExitosa();
            
          }
          if (data.status == 401) {

            Sweet.actualizacionFallida();

          }
          hideAllModals();
          listarMuestra();
          // setUpdateModal(false);
          // removeModalBackdrop();
          // const modalBackdrop = document.querySelector('.modal-backdrop');
          // if (modalBackdrop) {
          //   modalBackdrop.remove();
          // }
        })
          .catch(error => {
            console.error('Error:', error);
			});

    
    }
    

    return (
      <div>
            <div id="modalInfo3" className={`modal-info ${showModal3 ? 'show' : ''}`}  showModal={showModal3} >
    <form className="formulario-muestra"  method="post">
      <div className="btn-x" onClick={hideAllModals}>
          <FontAwesomeIcon icon={faX} className="faX"/>
      </div>
    <table className="info-complete">
        <tbody>
        <tr>
            <td>  
            <div className='container-label'>
                <label className='label-modal'>Fecha de creacion</label>
                <div className='value'>{formatDate(muestraSeleccionada.fecha_creacion)}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Codigo externo</label>
              <div className='value'>{muestraSeleccionada.codigo_externo}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Consecutivo Informe</label>
              <div className='value'>{muestraSeleccionada.consecutivo_informe}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Muestreo</label>
              <div className='value'>{muestraSeleccionada.muestreo}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Preparacion muestra</label>
              <div className='value'>{muestraSeleccionada.preparacion_muestra}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Cantidad</label>
              <div className='value'>{muestraSeleccionada.cantidad}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Tipo de molienda</label>
              <div className='value'>{muestraSeleccionada.tipo_molienda}</div>
            </div><div className='container-label'>
              <label className='label-modal'>Tipo de fermentacion</label>
              <div className='value'>{muestraSeleccionada.tipo_fermentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Densidad de cafe verde</label>
              <div className='value'>{muestraSeleccionada.densidad_cafe_verde}</div>
            </div>
          </td>
          <td>
            
            <div className='container-label'>
              <label className='label-modal'>Fecha de procesamiento</label>
              <div className='value'>{formatDate(muestraSeleccionada.fecha_procesamiento)}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tipo de tostion</label>
              <div className='value'>{muestraSeleccionada.tipo_tostion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tiempo de fermentacion</label>
              <div className='value'>{muestraSeleccionada.tiempo_fermentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Codigo de muestra</label>
              <div className='value'>{muestraSeleccionada.codigo_muestra}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Actividad agua</label>
              <div className='value'>{muestraSeleccionada.actividad_agua}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Tiempo de secado</label>
              <div className='value'>{muestraSeleccionada.tiempo_secado}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Presentacion</label>
              <div className='value'>{muestraSeleccionada.presentacion}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Estado</label>
              <div className='value'>{muestraSeleccionada.estado}</div>
            </div>
            <div className='container-label'>
              <label className='label-modal'>Cafe</label>
              <div className='value'>{muestraSeleccionada.cafes_id}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </form>

</div>

        <div className= {`main-content-actualizar ${showModal2 ? 'show' : ''}`}  id="modalInfo2" showModal={showModal2}>
          <h1 className='title-registrar-muestras'>Editar Muestra</h1>

    <form className="formulario-muestra info-complete"  >
      <div className="columna">
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' placeholder='' value={formatDate(muestraSeleccionada.fecha_creacion)} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, fecha_creacion: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder='' value={muestraSeleccionada.codigo_externo || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, codigo_externo: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' placeholder=''  value={muestraSeleccionada.consecutivo_informe || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada , consecutivo_informe: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="muestreo" name="muestreo" className='input' placeholder='' value={muestraSeleccionada.muestreo} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, muestreo: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' placeholder=''value={muestraSeleccionada.preparacion_muestra || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, preparacion_muestra: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="cantidad" name="cantidad" className='input' placeholder='' value={muestraSeleccionada.cantidad || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, cantidad: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' placeholder='' value={muestraSeleccionada.tipo_molienda || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_molienda: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input' placeholder=''value={muestraSeleccionada.tipo_fermentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_fermentacion: e.target.value})}/>
        </div>
        <div className='container-input' >
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' placeholder='' value={muestraSeleccionada.densidad_cafe_verde || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, densidad_cafe_verde: e.target.value})}/>
        </div>
      </div>

      <div className="columna">
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input'  placeholder='' value={formatDate(muestraSeleccionada.fecha_procesamiento || '')  } onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, fecha_procesamiento: e.target.value})}/>
        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_tostion" name="tipo_tostion" className='input'  value={muestraSeleccionada.tipo_tostion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_tostion: e.target.value})}/>
          <label htmlFor="tipo_tostion" className='label'></label>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input'  placeholder='' value={muestraSeleccionada.tiempo_fermentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tiempo_fermentacion: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' placeholder=''  value={muestraSeleccionada.codigo_muestra || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, codigo_muestra: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="actividad_agua" name="actividad_agua" className='input' placeholder=''  value={muestraSeleccionada.actividad_agua || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, actividad_agua: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tiempo_secado" name="tiempo_secado" className='input' placeholder='' value={muestraSeleccionada.tiempo_secado || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tiempo_secado: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="presentacion" name="presentacion" className='input' placeholder='' value={muestraSeleccionada.presentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, presentacion: e.target.value})}/>
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="cafes_id" name="cafes_id" className='input' placeholder='' value={muestraSeleccionada.cafes_id || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, cafes_id: e.target.value})}/>
        </div>
        <div className="container-button">
      <button  className='button' type="button"            
            onClick={() => { actualizarMuestra(muestraSeleccionada.id), toggleModalUpdate() }}
      >Actualizar</button>
      
      <button  className='button' type="button"
        onClick={hideAllModals}>
      Cancelar</button>


          </div>
      </div>


    </form>
  </div>
        {/* Registrar Muestra */}
          <div className={`main-content-registrar ${showModal1 ? 'show' :  ''}`}   id="modalInfo1 "   >
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
          <button className="btn-reg-mue" type="button" onClick={hideAllModals}>
            Cancelar
        </button>
          <button  className='button' type="button" onClick={RegistrarMuestra} >Enviar</button>


        </div>


      </form>
    </div>
        <div>
      <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

      <div className="main-container">
        <button className="btn-reg-mue" onClick={() => setShowModal1(!showModal1)}>
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
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Mas</th>
            </tr>
          </thead>
          <tbody>
                  {muestra.map((task,index) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{formatDate(task. fecha_creacion)}</td>
                      <td>{task.codigo_externo}</td>
                      <td>{task.consecutivo_informe}</td>
                      <td>{task.muestreo}</td>
                      <td>{task.preparacion_muestra}</td>
                      <td>{task.cantidad}</td>
                      <td>{task.tipo_molienda}</td>
                      <td>{task.estado}</td>
                      <td> 
                      {task.estado === 1 ? (
                        <button
                        className="btn-tertiary"
                        onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                      >
                        Activar
                      </button>
                      
                        ) : (
                          <button
                          className="btn-secondary"
                          onClick={() => { setUpdateModal(true); activarMuestra(task.id)}}
                        >
                          Desactivar
                        </button>
                          
                        )}  
                      </td>
                      <td>
                        <button className="btn-reg-mue"
                          onClick={() => {
                            toggleModal(2);   
                            buscarMuestra(task.id);
                          }}
                          >
                        Editar</button>
                      </td>
                      <td>
                        <button
                                      type="button"
                                      className="btn-primary"
                                      onClick={() => { toggleModal(3) ,buscarMuestra(task.id);}}
                                  >Mas
                                  </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
        </table>
      </div>


      </div>

      </div>

    );
  };








  export default  Muestra;

