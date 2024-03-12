  import React, { useEffect, useRef, useState } from "react"
  import '../style/RegistrarMuestra.css';
  import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import {faX }  from'@fortawesome/free-solid-svg-icons'
  // import '../style/RegistrarMuestra.css'
  import Api from "../services/api";
  import { localhost } from "../services/api";
  import Sweet from "../helpers/Sweet";
  import esES from "../languages/es-ES.json"
  import $ from "jquery";
  import "bootstrap";
  import "datatables.net";
  import "datatables.net-bs5";


  import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
  import "datatables.net-responsive";
  import "datatables.net-responsive-bs5";


  // import 'bootstrap/dist/css/bootstrap.min.css';
  // import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  // import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
  // import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';


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
        const response = await fetch(`http://${localhost}:4000/muestra/listar`, {
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

  const Muestra = (user) => {
    const[muestra, setMuestra] = useState([]);
    // const [showModal,setShowModal] = useState(false);
    // const [showModal2, setShowModal2] = useState(false);
    const[showModal ,setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false);  
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [cafe,setCafes] = useState([]);
    const [muestraSeleccionada,setMuestraSeleccionada] = useState({});
    const [selectedCafeId, setSelectedCafeId] = useState(null);
    const [dataSelect, setDataSelect] = useState({});
    const tableRef = useRef();
    // const [codigo,setCodigo] = useState({})


    const cafes_id = useRef(null);
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
    const openRegistrarModal = () => {
      setShowModal(true);
      console.log("modal" , showModal);
      console.log("si estoy funcionando");
  };

  const toggleModal = (modalId) => {
    if (modalId === 1) {
      console.log("modal" , modalId);
      setShowModal1(true);
    }
    else if (modalId === 2) {
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


    
  // useEffect(() => {
  //   generarCodigoUnicoNoRepetido();
  // }, []);

  const generarCodigoUnico = () => {
    let parte1 = 'INF-';
    let parte2 = Math.floor(Math.random() * 100); 
    let parte3 = 'A';

    parte3 = String.fromCharCode(parte3.charCodeAt(0) + parte2 % 26);

    return parte1 + (parte2 < 10 ? '0' + parte2 : parte2) + parte3;
  };

  // const generarCodigoUnicoNoRepetido = async () => {
  //   let nuevoCodigo;
  //   do {
  //     nuevoCodigo = generarCodigoUnico();
  //   } while (await verificarCodigo(nuevoCodigo));

  //   console.log(nuevoCodigo);
  //   setCodigo(nuevoCodigo);
  // };
  

  


  ////////////////////////////////////////////////DATA TABLE//////////////////////////////////////////

  useEffect(()=> {
    if (muestra.length > 0 ) {
      if($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        columnDefs:[
          {
            targets:-1,
            responsivePriority:1
          },
          {
            targets:-2,
            responsivePriority:1
          },
          {
            targets:-3,
            responsivePriority:1
          }
        ],
        responsive:true,
        language: esES,
        paging: true,
        lengthMenu:[
          [7,10,50,-1],
          ['7 Filas','10 Filas','50 Filas','Ver Todo']
        ]
      });

    }
  },[muestra])

  // useEffect(() => {
    const listarMuestra = async () => {

      try{
        const response = await Api.get("muestra/listar", {
          headers: {
            token :localStorage.getItem("token")
          }
        });
        
        setMuestra(response.data);
        console.log("respuesta", response.data);

      } catch (error) {
        console.error("Error listando municipios", error);
      }
    };
    // }, [])
    useEffect(() => {
      listarMuestra();
    }, []);
    

  const inputRef = useRef(null);

    const handleOptionClick = (key) => {
        const textoSeleccionado = `${key.documento}, ${key.nombre_finca}, ${key.nombre_usuario}, ${key.numero_lote}, ${key.nombre_variedad}`;
        inputRef.current.value = textoSeleccionado;
    };
    
  // const filtrarOpciones = (event) => {
  //   setFiltro(event.target.value.toLowerCase());
  //   setMostrarOpciones(true);
  // };
  // const handleClickOpcion = (cafe) => {
  //   // Actualizamos el filtro con el valor seleccionado
  //   setFiltro(`${cafe.documento}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`);
  //   setMostrarOpciones(false);
  // };


  function clearFocusInput(Element) {
    let inputSearch = document.getElementById(Element)

    if (inputSearch) {
        
        let divOptions = inputSearch.parentNode.querySelectorAll(".select-options-cafe");
        if(divOptions.length > 0){
            divOptions[0].style.display = "none"
        }
        let select = inputSearch.parentNode.querySelectorAll(".option-select-cafe")
        for (let s = 0; s < select.length; s++) {
            let elementValue = inputSearch.getAttribute("id")
            
            if(dataSelect[inputSearch.getAttribute("id")].value == select[s].getAttribute("data-id")){
                select[s].classList.add("option-select-cafe")
            }else{
                select[s].classList.remove("option-select-cafe")
            }
            
        }
    }
}

      
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
  useEffect(() => {
    let inputRegister = document.querySelectorAll(".input-register");
    let h6Error = document.querySelectorAll(".h6-error");

    for (let x = 0; x < inputRegister.length; x++) {
        inputRegister[x].addEventListener("change", function () {
            let h6Error = document.querySelectorAll(".h6-error");

            if (h6Error[x]) {
                h6Error[x].style.display = "none"
            }
        })
        inputRegister[x].addEventListener("input", function () {
            let h6Error = document.querySelectorAll(".h6-error");

            if (h6Error[x]) {
                h6Error[x].style.display = "none"
            }
        })
    }

},[showModal])
// const data = await Api.post("muestra/registrar", muestraData, headers);

const RegistrarMuestra = async (data) => {
  const muestraData = {
      ...data
  };

  const headers = {
      headers: {
          token: "xd",
      },
  };
  try {
      const data = await Api.post("muestra/registrar", muestraData, headers);
      console.log(data,"ahhhh")
      if (data.data.status == false) {
          let keys = Object.keys(data.data.errors)
          let h6Error = document.querySelectorAll(".h6-error");
          for (let x = 0; x < h6Error.length; x++) {
              h6Error[x].remove()
          }
          for (let x = 0; x < keys.length; x++) {
              let h6 = document.createElement("h6")
              h6.innerHTML = data.data.errors[keys[x]]
              h6.classList.add("h6-error")
              if (document.getElementById(keys[x])) {
                console.log("Si se enontro a", keys[x]);
                  let parent = document.getElementById(keys[x]).parentNode
                  parent.appendChild(h6)
              }
          }
      } else {
          Sweet.registroExitoso();
          hideAllModals();
          listarMuestra();  
          // closeRegistrarModal();
          // const response = await Api.get("finca/listar");
          setCafes(response.data);
          // location.href = "/finca"
      }
  } catch (error) {
      console.error("Error al registrar la muestra:", error);
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
      fetch(`http://${localhost}:4000/muestra/buscar/${id}`,{
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
          fetch(`http://${localhost}:4000/muestra/desactivar/${id}`,{
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
          fetch(`http://${localhost}:4000/muestra/activar/${id}`,{
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

    // function actualizarMuestra(id) {
    //   fetch( `http://localhost:4000/muestra/actualizar/${id}`,{
    //     method:'PUT',
    //     headers:{
    //       'Content-type': 'application/json'

    //   },
    //   body: JSON.stringify(muestraSeleccionada),
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // console.log(data.status);

    //       if (data.status == 200) {
    //         Sweet.actualizacionExitosa();
    //         toggleModal(2)
            
    //       }
    //       if (data.status == 401) {

    //         Sweet.actualizacionFallida();

    //       }
    //       // hideAllModals();
    //       listarMuestra();
    //       // setUpdateModal(false);
    //       // removeModalBackdrop();
    //       // const modalBackdrop = document.querySelector('.modal-backdrop');
    //       // if (modalBackdrop) {
    //       //   modalBackdrop.remove();
    //       // }
    //     })
    //       .catch(error => {
    //         console.error('Error:', error);
		// 	});
    // }
    async function actualizarMuestra (id) {
      alert("muestraSeleccionada");
      console.log(muestraSeleccionada,"ahhhh")
      try {
      console.log("este es la info de actualizar" ,muestraSeleccionada);

          const data = await Api.put(`/muestra/actualizar/${id}`,muestraSeleccionada);
          console.log(data, "muestra")
          if (data.data.status == false) {
              let keys = Object.keys(data.data.errors)
              let h6Error = document.querySelectorAll(".h6-error");
              for (let x = 0; x < h6Error.length; x++) {
                  h6Error[x].remove()
              }
              console.log(data.data)
              for (let x = 0; x < keys.length; x++) {
                  let h6 = document.createElement("h6")
                  h6.innerHTML = data.data.errors[keys[x]]
                  h6.classList.add("h6-error")
                  if (document.getElementById(keys[x])) {
                      let parent = document.getElementById(keys[x]).parentNode
                      parent.appendChild(h6)
                  }

              }
          } else {
              Sweet.actualizacionExitosa();
              hideAllModals();
          }
                      // Recargar la lista de lotes después de la actualización
                      // const response = await Api.get("lote/listar");
                      // setLotes(response.data);
                  } catch (error) {
      console.log("este es la info de actualizar" ,muestraSeleccionada);

                      console.error("Error al actualizar lote: ", error);
                  }
              };
    
    

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

  useEffect(()=>{
    window.addEventListener("click",function(e){
      let divOptions = document.querySelectorAll(".div-input-search-select");
      for (let s = 0; s < divOptions.length; s++) {
        if(!e.target == divOptions[s] || !divOptions[s].contains(e.target)){
          let options = divOptions[s].querySelectorAll(".select-options-cafe")
          console.log(options[0])
          if(options.length> 0){
            options[0].style.display = "none"
          } 
        }
      }
    })
  },[])
  useEffect(() => {

    let inputSearch = document.querySelectorAll(".input-search-cafe")

    if (inputSearch.length > 0) {
        for (let s = 0; s < inputSearch.length; s++) {

            inputSearch[s].addEventListener("input", function () {
                let parent = inputSearch[s].parentNode
                if (parent) {
                    let selectOptionsInput = parent.querySelectorAll(".select-options-cafe");
                    if (selectOptionsInput[0]) {
                        selectOptionsInput[0].style.display = "block"
                        let options = selectOptionsInput[0].querySelectorAll("div");
                        for (let o = 0; o < options.length; o++) {
                            if (options[o].innerHTML.toLowerCase().includes(inputSearch[s].value.toLowerCase())) {
                                options[o].style.display = "block"
                            } else {
                                options[o].style.display = "none"
                            }
                            if (options[o].innerHTML.toLowerCase() == inputSearch[s].value.toLowerCase()) {
                                let focusSelect = document.querySelectorAll(".option-select-cafe")
                                if (focusSelect.length > 0) {
                                    console.log(focusSelect[0].classList)
                                    focusSelect[0].classList.remove("option-select-cafe")
                                }
                                inputSearch[s].value = options[o].innerHTML
                                if(!dataSelect[inputSearch[s].getAttribute("data-id")]){
                                    dataSelect[inputSearch[s].getAttribute("data-id")] = {}
                                }
                                dataSelect[inputSearch[s].getAttribute("data-id")].value = options[o].getAttribute("data-id")
                                options[o].classList.add("option-select-cafe")
                            } else {
                                options[o].classList.remove("option-select-cafe")
                            }
                        }
                    }
                }
            })
        }
    }
},[showModal1])
    
    return (

      <div>
        {showModal3 ? 
          <div id="modalInfo3" className="modal-info"   >
          {/* <h1 className='title-registrar-resultado'>Datos muestra</h1>  */}
    
        <form className="formulario-muestra"  method="post">
          <div className="btn-x" onClick={hideAllModals}>
              <FontAwesomeIcon icon={faX} className="faX"/>
          </div>
        <table className="info-complete">
            <tbody>
            <tr>
                <td>
                <div className="columna">
    
                <div className='container-input'>
    
                  <label className='label'>Cafe </label>
                      {cafe.filter(cafe => cafe.id === muestraSeleccionada.cafes_id).map((cafe) => (
                          <div
                              key={cafe.id}
                              className="custom-dropdown-options"
                              // onClick={() => handleClickOpcion(lote)}
                          >
                              <div className='input input-register  '>{`${cafe.id}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`}</div>
                          </div>
                      ))}
    
                </div> 
                <div className='container-input'>
                    <input  className='input input-register' value={formatDate(muestraSeleccionada.fecha_creacion)}/>
                    <label className='label'>Fecha de creacion</label>
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.codigo_externo} />
                  <label className='label'>Codigo externo</label>
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.consecutivo_informe} />
                  <label className='label'>Consecutivo Informe</label>
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.muestreo} />
                  <label className='label'>Muestreo</label>
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.preparacion_muestra} />
                  <label className='label'>Preparacion muestra</label>
    
    
                </div><div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.cantidad} />
                  <label className='label'>Cantidad</label>
    
    
                </div><div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.tipo_molienda} />
                  <label className='label'>Tipo de molienda</label>
    
    
                </div><div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.tipo_fermentacion} />
                  <label className='label'>Tipo de fermentacion</label>
    
    
                </div>
                
                </div>
              </td>
              <td>
                <div className="columna">
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.densidad_cafe_verde} />
                  <label className='label'>Densidad de cafe verde</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={formatDate(muestraSeleccionada.fecha_procesamiento)} />
                  <label className='label'>Fecha de procesamiento</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.tipo_tostion} />
                  <label className='label'>Tipo de tostion</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.tiempo_fermentacion} />
                  <label className='label'>tiempo fermentacion</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.codigo_muestra} />
                  <label className='label'>Codigo de muestra</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.actividad_agua} />
                  <label className='label'>Actividad agua</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.tiempo_secado} />
                  <label className='label'>Tiempo de secado</label>
    
    
                </div>
                <div className='container-input'>
                  <input type="text" className="input-register" value={muestraSeleccionada.presentacion} />
                  <label className='label'>Presentacion</label>
    
    
                </div>
                <div className='container-input'>
                    <input 
                      type="text" 
                      className="input-register" 
                      value={muestraSeleccionada.estado === 0 ? 'Inactivo' : 'Activo'} 
                      disabled={muestraSeleccionada.estado === 0} // Desactiva si el estado es 0
                    />
                  <label className='label'>Estado</label>
                  
    
                </div>
              
    
                </div>
              </td>
              
              
            </tr>
          </tbody>
        </table>
      </form>
    
    </div>
        : ""}
            

{showModal2 ?  <div className= {`main-content-actualizar `}  id="modalInfo2" >
<h1 className='title-registrar-resultado'>Actualizar muestra</h1> 


    <form className="formulario-muestra info-complete"  >
      <div className="columna">
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="date" id="fecha_creacion" name="fecha_creacion" className='input' placeholder='' value={formatDate(muestraSeleccionada.fecha_creacion)} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, fecha_creacion: e.target.value})}/>
          <label className='label'>Fecha de creacion</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="codigo_externo" name="codigo_externo" className='input' placeholder='' value={muestraSeleccionada.codigo_externo || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, codigo_externo: e.target.value})}/>
          <label className='label'>Codigo externo</label>

        </div>
        
        <div className='container-input'>
        {/* <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled /> */}
          <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input' placeholder=''  value={muestraSeleccionada.consecutivo_informe || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada , consecutivo_informe: e.target.value})}/>
          <label className='label'>Consecutivo Informe</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="muestreo" name="muestreo" className='input' placeholder='' value={muestraSeleccionada.muestreo} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, muestreo: e.target.value})}/>
          <label className='label'>Muestreo</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input' placeholder=''value={muestraSeleccionada.preparacion_muestra || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, preparacion_muestra: e.target.value})}/>
          <label className='label'>Preparacion muestra</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="cantidad" name="cantidad" className='input' placeholder='' value={muestraSeleccionada.cantidad || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, cantidad: e.target.value})}/>
          <label className='label'>Cantidad</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_molienda" name="tipo_molienda" className='input' placeholder='' value={muestraSeleccionada.tipo_molienda || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_molienda: e.target.value})}/>
          <label className='label'>Tipo de molienda</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input' placeholder=''value={muestraSeleccionada.tipo_fermentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_fermentacion: e.target.value})}/>
          <label className='label'>Tipo de fermentacion</label>

        </div>
        <div className='container-input' >
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input' placeholder='' value={muestraSeleccionada.densidad_cafe_verde || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, densidad_cafe_verde: e.target.value})}/>
          <label className='label'>Densidad de cafe verde</label>

        </div>
      </div>

      <div className="columna">
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input'  placeholder='' value={formatDate(muestraSeleccionada.fecha_procesamiento || '')  } onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, fecha_procesamiento: e.target.value})}/>
          <label className='label'>Fecha de procesamiento</label>

        </div>
        <div className='container-input'>
        <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tipo_tostion" name="tipo_tostion" className='input'  value={muestraSeleccionada.tipo_tostion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tipo_tostion: e.target.value})}/>
          <label className='label'>Tipo de tostion</label>
          
        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input'  placeholder='' value={muestraSeleccionada.tiempo_fermentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tiempo_fermentacion: e.target.value})}/>
          <label className='label'>tiempo fermentacion</label>

        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="codigo_muestra" name="codigo_muestra" className='input' placeholder=''  value={muestraSeleccionada.codigo_muestra || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, codigo_muestra: e.target.value})}/>
          <label className='label'>Codigo de muestra</label>

        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="actividad_agua" name="actividad_agua" className='input' placeholder=''  value={muestraSeleccionada.actividad_agua || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, actividad_agua: e.target.value})}/>
          <label className='label'>Actividad agua</label>

        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="tiempo_secado" name="tiempo_secado" className='input' placeholder='' value={muestraSeleccionada.tiempo_secado || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, tiempo_secado: e.target.value})}/>
          <label className='label'>Tiempo de secado</label>

        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="presentacion" name="presentacion" className='input' placeholder='' value={muestraSeleccionada.presentacion || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, presentacion: e.target.value})}/>
          <label className='label'>Presentacion</label>

        </div>
        <div className='container-input'>
          <input type="hidden" value={muestraSeleccionada.id || ''} onChange={(e) => setMuestraSeleccionada({...muestraSeleccionada,id:e.target.value})} disabled />
          <input type="text" id="cafes_id" name="cafes_id" className='input' placeholder='' value={muestraSeleccionada.cafes_id || ''} onChange={(e)=> setMuestraSeleccionada({ ...muestraSeleccionada, cafes_id: e.target.value})}/>
        </div>
        <div className="container-button">
      <button  className='button' type="button"            
            onClick={() => { actualizarMuestra(muestraSeleccionada.id); hideAllModals}}
      >Actualizar</button>
      
      <button  className='button' type="button"
        onClick={hideAllModals}>
      Cancelar</button>


          </div>
      </div>


    </form>
  </div>: ""}
       
       {showModal1 ?
        <div className={`main-content-registrar`}   id="modalInfo1 "   >
      <h1 className='title-registrar-resultado'>Registrar muestra</h1> 

        {/* {showModal && ( */}
           {/* Registrar Muestra */}
          {/* // <div className="main-content-registrar" > */}
    <h1 className='title-registrar-muestras'>Registrar Muestra</h1>

      <form className="formulario-muestra"
      onSubmit={(e) => {
        e.preventDefault();
        RegistrarMuestra({
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
              cafes_id: dataSelect.cafes_id ? dataSelect.cafes_id.value : "" 
        });
    }}
      
      method="POST" >
      <div className="columna">
      <div className='container-input div-input-search-select'>

                  <input className="input-search-cafe " type="text" id="cafes_id" />
      
                        <label htmlFor="cafes_id" className='label'>Cafe</label>
                        <div className="select-options-cafe" >
                            {cafe.map((key, index) => (
                                (
                                    <div className="option-select-cafe" data-id={key.id} onClick={() => {document.getElementById("cafes_id").value = key.documento+ ", " + key.nombre_usuario + ", "  + key.nombre_finca + ", " +key.numero_lote + ", " + key.nombre_variedad; !dataSelect.cafes_id ? dataSelect.cafes_id = {} : ""; dataSelect.cafes_id.value = key.id; clearFocusInput("cafes_id") }} key={key.id}>{key.documento+ ", " + key.nombre_usuario + ", "  + key.nombre_finca + ", " +key.numero_lote + ", " + key.nombre_variedad} </div>
                                )
                            ))}
                        </div>

  </div>
        <div className='container-input'>
          <input type="date" id="fecha_creacion" name="fecha_creacion" className='input input-register' ref={fecha_creacion} placeholder='' />
          <label htmlFor="fecha_creacion" className='label-muestra'>Campo 1:</label>
          
        </div>
        <div className='container-input'>
          <input type="text" id="codigo_externo" name="codigo_externo" className='input input-register' placeholder=''  ref={codigo_externo}   />
          <label htmlFor="codigo_externo" className='label'>Codigo externo</label>
        </div>
        <div className='container-input'>
          <input type="text" id="consecutivo_informe" name="consecutivo_informe" className='input input-register' ref={consecutivo_informe} placeholder=''  onBlur={(e) => console.log(e.target.value)}/>
          <label htmlFor="consecutivo_informe" className='label'>Consecutivo informe</label>
        </div>
        <div className='container-input'>
          <input type="text" id="muestreo" name="muestreo" className='input input-register' ref={muestreo} placeholder=''  />
          <label htmlFor="muestreo" className='label'>Muestreo</label>
        </div>
        <div className='container-input'>
          <input type="text" id="preparacion_muestra" name="preparacion_muestra" className='input input-register' ref={preparacion_muestra} placeholder=''  />
          <label htmlFor="preparacion_muestra" className='label'>Preparacion de la muestra</label>
        </div>
        <div className='container-input'>
          <input type="text" id="cantidad" name="cantidad" className='input input-register' ref={cantidad} placeholder=''   />
          <label htmlFor="cantidad" className='label'>Cantidad</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_molienda" name="tipo_molienda" className='input input-register' ref={tipo_molienda}  placeholder=''  />
          <label htmlFor="tipo_molienda" className='label'>Tipo de molienda</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_fermentacion" name="tipo_fermentacion" className='input input-register'  ref={tipo_fermentacion} placeholder=''   />
          <label htmlFor="tipo_fermentacion" className='label'>Tipo de fermentacion</label>
        </div>
        
      </div>

      <div className="columna">
        <div className='container-input' >
          <input type="text" id="densidad_cafe_verde" name="densidad_cafe_verde" className='input input-register' ref={densidad_cafe_verde} placeholder=''  />
          <label htmlFor="densidad_cafe_verde" className='label'>Densidad de cafe verde</label>
        </div>
        <div className='container-input'>
          <input type="date" id="fecha_procesamiento" name="fecha_procesamiento" className='input input-register' ref={fecha_procesamiento }  placeholder='' />
          <label htmlFor="fecha_procesamiento"  className='label'>Fecha de procesamiento</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tipo_tostion" name="tipo_tostion" className='input input-register' ref={tipo_tostion} placeholder='' />
          <label htmlFor="tipo_tostion" className='label'>Tipo de tostion</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_fermentacion" name="tiempo_fermentacion" className='input input-register' ref={tiempo_fermentacion}  placeholder=''  />
          <label htmlFor="tiempo_fermentacion" className='label'>Tiempo fermentacion</label>
        </div>
        <div className='container-input'>
          <input type="text" id="codigo_muestra" name="codigo_muestra" className='input input-register' ref={codigo_muestra} placeholder=''  />
          <label htmlFor="codigo_muestra"className='label'>Codigo de muestra</label>
        </div>
        <div className='container-input'>
          <input type="text" id="actividad_agua" name="actividad_agua" className='input input-register' ref={actividad_agua} placeholder=''/>
          <label htmlFor="actividad_agua" className='label'>Actividad agua</label>
        </div>
        <div className='container-input'>
          <input type="text" id="tiempo_secado" name="tiempo_secado" className='input input-register'  ref={tiempo_secado} placeholder='' />
          <label htmlFor="tiempo_secado" className='label'>Tiempo de secado</label>
        </div>
        <div className='container-input'>
          <input type="text" id="presentacion" name="presentacion" className='input input-register'  ref={presentacion} placeholder='' />
          <label htmlFor="presentacion" className='label'>Presentacion</label>
        </div>
        <button className="btn-reg-mue" type="button" onClick={hideAllModals}> 
          Cancelar
      </button>
        <button  className='btn-reg-mue'  type="submit">Enviar</button>


      </div>


    </form>
  </div>        : ""}
        
  {/* )} */}
        
        
        
        <div>
      {/* <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" /> */}

      <div className="main-container">
      <h1 className='title-registrar'>Listar Muestra</h1> 

        <button className="btn-reg-mue" onClick={() => toggleModal(1)}>
            Registrar muestra
        </button>

        <div className="container-fluid w-full">
        {/* <table className="table-muestra"> */}
        <table className=" bg-white table table-stiped table-bordered border display responsive nowrap b-4"
        ref={tableRef}
        cellPadding={0}
        width= "100%">

          <thead className="text-center text-justify">
            <tr>
              <th>ID</th>
              <th>Fecha de creacion</th>
              <th>Muestra</th>
              <th>Propietario</th>
              <th>Finca</th>
              <th>Lote</th>
              <th>Variedad</th>
              <th>Estado</th>
              {user.user ? user.user.rol == 'administrador' ? 
                <th>Estado</th>
              : '' : ''}

              {user.user ? user.user.rol == 'administrador' ? 

              <th>Actualizar</th>
              : '' : ''}

              {user.user ? user.user.rol == 'administrador' ? 
                <th>Mas</th>
              : '' : ''}

            </tr>
          </thead>
          <tbody>
                {muestra. length >0 ? muestra 
                  .map((task,index) => (
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
                          className="btn-activar"
                          onClick={() => { setUpdateModal(true); activarMuestra(task.id)}}
                        >
                          Activar
                        </button>

                        
                          ) : (
                            <button
                            className="btn-desactivar"
                            onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                          >
                            Desactivar
                          </button>
                            
                          )}  
                      </td>
                      {user.user ? user.user.rol == 'administrador' ? 

                      <td>

                        <button className="btn-reg-mue"
                          onClick={() => {
                            toggleModal(2);   
                            buscarMuestra(task.id);
                          }}
                          >
                        Editar</button>

                      </td>
                      : '' : ''}
                      {user.user ? user.user.rol == 'administrador' ? 

                      <td>

                        <button
                            type="button"
                            className="btn-reg-mue"
                            onClick={() => { toggleModal(3) ,buscarMuestra(task.id)}}
                            >Mas
                        </button>

                      </td>
                      : '' : ''}

                      
                      


                    </tr>
                  ))

                :  <tr><td colSpan={999999999999} className="p-5 text-center">{muestra.message}</td></tr>}
                                  </tbody>
        </table>
        </div>
      </div>


      </div>

      </div>

    );
  };



  export default  Muestra;

