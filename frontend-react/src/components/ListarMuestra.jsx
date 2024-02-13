  import React, { useEffect, useRef, useState } from "react"
  import '../style/RegistrarMuestra.css';
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faX }  from'@fortawesome/free-solid-svg-icons'
  // import '../style/RegistrarMuestra.css'
  import Api from "../services/api";
  import Sweet from "../helpers/Sweet";

  

  async function verificarCodigo(codigo, data) {
    try {
      if (data && data.length > 0) {
        for (const muestra of data) { 
          if (muestra.codigo === codigo) {
            return true;
          }
        }
        return false;
      } else {
        const response = await fetch('http://localhost:4000/muestra/listar', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
        const newData = await response.json();
  
        for (const muestra of newData) {
          if (muestra.codigo === codigo) {
            return true;
          }
        }
        return false;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }

  const Muestra = () => {
    const[muestra, setMuestra] = useState([]);
    const [showModal,setShowModal] = useState(false);
    // const [showModal2, setShowModal2] = useState(false);
    const [showModal1, setShowModal1] = useState(false);  
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [cafe,setCafes] = useState([]);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const modalMuestraRef = useRef(null);
    let modalVisible = false; 
    const [muestraSeleccionada,setMuestraSeleccionada] = useState({});
    const [selectedCafeId, setSelectedCafeId] = useState(null);
    const [codigo, setCodigo] = useState('');


    const codigo_externo = useRef(null);
    const consecutivo_informe = useRef(null);
    const muestreo = useRef(null);
    const preparacion_muestra = useRef(null);
    const cantidad = useRef(null);
    const tipo_molienda = useRef(null);
    const tipo_fermentacion = useRef(null);
    const densidad_cafe_verde = useRef(null);
    const fecha_procesamiento = useRef(null);
    const tipo_tostion = useRef(null);
    const tiempo_fermentacion = useRef(null);
    const codigo_muestra = useRef(null);
    const actividad_agua = useRef(null);
    const tiempo_secado = useRef(null);
    const presentacion = useRef(null);
    const cafes_id = useRef(null);
    const fecha_creacion = useRef(null);



    function formatDate(dateString) {
      if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
      const fecha = new Date(dateString);
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    }


    // useEffect(()=>{
    //   listarMuestra()
    // },[]);




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


    
  useEffect(() => {
    generarCodigoUnicoNoRepetido();
  }, []);

  const generarCodigoUnico = () => {
    let parte1 = 'INF-';
    let parte2 = Math.floor(Math.random() * 100); 
    let parte3 = 'A';

    parte3 = String.fromCharCode(parte3.charCodeAt(0) + parte2 % 26);

    return parte1 + (parte2 < 10 ? '0' + parte2 : parte2) + parte3;
  };

  const generarCodigoUnicoNoRepetido = async () => {
    let nuevoCodigo;
    do {
      nuevoCodigo = generarCodigoUnico();
    } while (await verificarCodigo(nuevoCodigo));

    console.log(nuevoCodigo);
    setCodigo(nuevoCodigo);
  };
  

  

  // useEffect(() => {
    const listarMuestra = async () => {

      try{
        const response = await Api.get("muestra/listar");
        setMuestra(response.data);
        console.log("Muestras", response.data);

      } catch (error) {
        console.error("Error listando municipios", error);
      }
    };
    // }, [])
    useEffect(() => {
      listarMuestra();
    }, []);
    
  
  const filtrarOpciones = (event) => {
    setFiltro(event.target.value.toLowerCase());
    setMostrarOpciones(true);
  };
  const handleClickOpcion = (cafe) => {
    // Actualizamos el filtro con el valor seleccionado
    setFiltro(`${cafe.documento}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`);
    setMostrarOpciones(false);
  };


      
  // async function listarMuestra(){
  //   try {
  //     // console.log(Api)
  //     const response = await  fetch('http://localhost:4000/muestra/listar', {
  //       method: "get",
  //       headers: {
  //           "content-type": "application/json",
  //       },
  //     })
  //     const data= await response.json();
  //       setMuestra(data);
  //       console.log(data)

  //     }catch(e){
  //       console.log(e + "error")

  //     }
  // }

  const RegistrarMuestra = async (data) => {
    const headers = {
        headers: {
            token: "xd",
        },
    };
    console.log("Esto es data:", data);

    try {
        await Api.post("muestra/registrar", data, headers);
        Sweet.registroExitoso();
        closeRegistrarModal();  
        // Recargar la lista de cafes después del registro
        const response = await Api.get("muestra/listar");
        setCafes(response.data);
    } catch (error) {
        console.error("Error al registrar el cafe:", error);
    }
};
    // function RegistrarMuestra(){


    //   let fecha_creacion = document.getElementById('fecha_creacion').value
    //   let codigo_externo = document.getElementById('codigo_externo').value
    //   let consecutivo_informe = document.getElementById('consecutivo_informe').value
    //   let muestreo = document.getElementById('muestreo').value
    //   let preparacion_muestra = document.getElementById('preparacion_muestra').value
    //   let cantidad = document.getElementById('cantidad').value
    //   let tipo_molienda = document.getElementById('tipo_molienda').value
    //   let tipo_fermentacion = document.getElementById('tipo_fermentacion').value
    //   let densidad_cafe_verde = document.getElementById('densidad_cafe_verde').value
    //   let fecha_procesamiento = document.getElementById('fecha_procesamiento').value
    //   let tipo_tostion = document.getElementById('tipo_tostion').value
    //   let tiempo_fermentacion = document.getElementById('tiempo_fermentacion').value
    //   let codigo_muestra = document.getElementById('codigo_muestra').value
    //   let actividad_agua = document.getElementById('actividad_agua').value
    //   let tiempo_secado = document.getElementById('tiempo_secado').value
    //   let presentacion = document.getElementById('presentacion').value;
    //   let cafes_id = document.getElementById('cafes_id').value
    //   // console.log("este es data" ,cafes_id.value ,"d")

    //   console.log("fecha_creacion:", fecha_creacion);
    //   console.log("codigo_externo:", codigo_externo);
    //   console.log("presentacion:", presentacion);

    //   // const  validacion = true


    //   fetch('http://localhost:4000/muestra/registrar', {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({fecha_creacion,codigo_externo,consecutivo_informe,muestreo,preparacion_muestra,cantidad,tipo_molienda,tipo_fermentacion,densidad_cafe_verde,fecha_procesamiento,tipo_tostion,tiempo_fermentacion,codigo_muestra,actividad_agua,tiempo_secado,presentacion,cafes_id})
    //   })

    //     .then((res) => res.json())
    //     .then(data => {


    //         if(data.status == 200) {
    //           Sweet.registroExitoso();
    //           hideAllModals();

    //         }
    //         if(data.status  == 400) {
    //           Sweet.registroFallido();
    //         }
    //       listarMuestra();

    //     })
    //     .catch(error => {
    //       console.error("Error del servidor" + error);
    //     })
    // }
  
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
    useEffect(() => {
      const buscarcafe = async () => {
          try {
              const response = await Api.get('cafe/listar');
              setCafes(response.data);
              console.log(response)
          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      }
      buscarcafe();
    }, []);

    const openModal = async (cafeId) => {
      setSelectedCafeId(cafeId);
      try {
          const response = await Api.get(`/cafe/buscar/${cafeId}`);
          setModalCafe(response.data);
      } catch (error) {
          console.error('Error buscando el cafe', error);
      }
  };
    
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
            <label className='label-modal'>Cafe </label>
                {cafe.filter(cafe => cafe.id === muestraSeleccionada.cafes_id).map((cafe) => (
                    <div
                        key={cafe.id}
                        className="custom-dropdown-option"
                        // onClick={() => handleClickOpcion(lote)}
                    >
                        <div className='value'>{`${cafe.id}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`}</div>
                    </div>
                ))}

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
            onClick={() => { actualizarMuestra(muestraSeleccionada.id), hideAllModals}}
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
      onSubmit={(e) => {
        e.preventDefault();
        RegistrarMuestra({
            // lotes_id: lotes_id.current.value,
            // variedades_id: variedades_id.current.value,
            fecha_creacion : fecha_creacion.current.value,
            codigo_externo : codigo_externo.current.value,
            consecutivo_informe : consecutivo_informe.current.value,
            muestreo : muestreo.current.value,
            preparacion_muestra : preparacion_muestra.current.value,
            cantidad : cantidad.current.value,
            tipo_molienda : tipo_molienda.current.value,
            tipo_fermentacion : tipo_fermentacion.current.value,
            densidad_cafe_verde : densidad_cafe_verde.current.value,
            fecha_procesamiento : fecha_procesamiento.current.value,
            tipo_tostion : tipo_tostion.current.value,
            tiempo_fermentacion : tiempo_fermentacion.current.value,
            codigo_muestra : codigo_muestra.current.value,
            actividad_agua : actividad_agua.current.value,
            tiempo_secado : tiempo_secado.current.value,
            presentacion : presentacion.current.value,
            // cafes_id : cafes_id.current.value,
            cafes_id : cafes_id.current.value.split('')[0]
        });
    }}
      // onSubmit={handleSubmit}
      
      method="POST" >
      <div className="columna">
      <div className='container-input'>
    <input
      type="text"
      className='input'
      placeholder=''
      id="cafes_id"
      name="cafes_id"
      ref={cafes_id}
      value={filtro}
      onChange={filtrarOpciones}
      autoComplete="off" // Desactivar autocompletado
    />
    <label htmlFor="cafes_id" className='label'>Cafe</label>
    {mostrarOpciones && (
      <div className="custom-dropdown">
        {cafe.map((cafe) => (
          (cafe.documento.toLowerCase().includes(filtro) ||
            cafe.nombre_usuario.toLowerCase().includes(filtro) ||
            cafe.numero_lote.toLowerCase().includes(filtro) ||
            cafe.nombre_variedad.toLowerCase().includes(filtro)) && (
            <div
              key={cafe.id}
              className="custom-dropdown-option"
              onClick={() => handleClickOpcion(cafe)}
            >
              
              {`${cafe.id}-${cafe.documento}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`}
            </div>
          )
        ))}
      </div>
    )}
  </div>
        <div className='container-input'>
          <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' ref={fecha_creacion} placeholder='' />
          <label htmlFor="fecha_creacion" className='label'>Campo 1:</label>
          
        </div>
        <div className='container-input'>
          <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder=''  ref={codigo_externo} value={codigo}  />
          <label htmlFor="codigo_externo" className='label'>Codigo externo</label>
        </div>
        <div className='container-input'>
          <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' ref={consecutivo_informe} placeholder=''  onBlur={(e) => console.log(e.target.value)}/>
          <label htmlFor="consecutivo_informe" className='label'>Consecutivo informe</label>
        </div>
        <div className='container-input'>
          <input type="text" id="muestreo" name="muestreo" className='input' ref={muestreo} placeholder=''  />
          <label htmlFor="muestreo" className='label'>Muestreo</label>
        </div>
        <div className='container-input'>
          <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' ref={preparacion_muestra} placeholder=''  />
          <label htmlFor="preparacion_muestra" className='label'>Preparacion de la muestra</label>
        </div>
        <div className='container-input'>
          <input type="text" id="cantidad" name="cantidad" className='input' ref={cantidad} placeholder=''   />
          <label htmlFor="cantidad" className='label'>Cantidad</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' ref={tipo_molienda}  placeholder=''  />
          <label htmlFor="tipo_molienda" className='label'>Tipo de molienda</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input'  ref={tipo_fermentacion} placeholder=''   />
          <label htmlFor="tipo_fermentacion" className='label'>Tipo de fermentacion</label>
        </div>
        
      </div>

      <div className="columna">
        <div className='container-input' >
          <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' ref={densidad_cafe_verde} placeholder=''  />
          <label htmlFor="densidad_cafe_verde" className='label'>Densidad de cafe verde</label>
        </div>
        <div className='container-input'>
          <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input' ref={fecha_procesamiento }  placeholder='' />
          <label htmlFor="fecha_procesamiento"  className='label'>Fecha de procesamiento</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_tostion" name="tipo_tostion" className='input' ref={tipo_tostion} placeholder='' />
          <label htmlFor="tipo_tostion" className='label'>Tipo de tostion</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input' ref={tiempo_fermentacion}  placeholder=''  />
          <label htmlFor="tiempo_fermentacion" className='label'>Tiempo fermentacion</label>
        </div>
        <div className='container-input'>
          <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' ref={codigo_muestra} placeholder=''  />
          <label htmlFor="codigo_muestra"className='label'>Codigo de muestra</label>
        </div>
        <div className='container-input'>
          <input type="text" id="actividad_agua" name="actividad_agua" className='input' ref={actividad_agua} placeholder=''/>
          <label htmlFor="actividad_agua" className='label'>Actividad agua</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_secado" name="tiempo_secado" className='input'  ref={tiempo_secado} placeholder='' />
          <label htmlFor="tiempo_secado" className='label'>Tiempo de secado</label>
        </div>
        <div className='container-input'>
          <input type="text" id="presentacion" name="presentacion" className='input'  ref={presentacion} placeholder='' />
          <label htmlFor="presentacion" className='label'>Presentacion</label>
        </div>
        <button className="btn-reg-mue" type="button" onClick={hideAllModals}> 
          Cancelar
      </button>
        <button  className='button' onClick={hideAllModals} type="submit">Enviar</button>


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
              <th>Muestra</th>
              <th>Propietario</th>
              <th>Finca</th>
              <th>Lote</th>
              <th>Variedad</th>
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
                      <td>{task.usuario}</td>
                      <td>{task.Finca}</td>
                      <td>{task.Lote}</td>
                      <td>{task.variedad}</td>
                      <td>{task.estado}</td>
                      <td> 
                        {task.estado === 0 ? (
                          <button
                          className="btn-tertiary"
                          onClick={() => { setUpdateModal(true); activarMuestra(task.id)}}
                        >
                          Activar
                        </button>

                        
                          ) : (
                            <button
                            className="btn-secondary"
                            onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
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
                                      onClick={() => { toggleModal(3) ,buscarMuestra(task.id)}}
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

