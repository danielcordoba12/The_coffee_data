import React, { useEffect, useState ,useRef} from "react";
import '../style/RegistrarMuestra.css'
import Sweet from "../helpers/Sweet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX }  from'@fortawesome/free-solid-svg-icons'
import Api from "../services/Api";
import esES from "../languages/es-ES.json"
import { localhost } from "../services/Api";
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
// import "datatables.net-bs5/css/DataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
// import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";




function Resultado(user) {
  const [datos, setDatos] = useState([]);
  const [nuevosDatos, setNuevosDatos] = useState([]);
  const [resultado,setResultado] = useState([]);
  const [resultadoSellecionado,setResultadoSeleccionado] = useState([])
  const [analisis , setAnalisi] = useState([])
  const [catador , setCatador] = useState([])
  const [catadorId , setCatadorId] = useState("")
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const tableRef = useRef();
  const [cafesId, setCafesId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dataSelect, setDataSelect] = useState({});
  const [filtro, setFiltro] = useState('');




  const fechaActual = new Date().toISOString();

  function formatDate(dateString) {
    if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
    const fecha = new Date(dateString);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function convertirFechaSQL(fechaISO) {
    // Crear un objeto Date a partir de la cadena de fecha ISO
    const fecha = new Date(fechaISO);

    // Obtener los componentes de fecha y hora
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');

    // Crear la cadena de fecha en formato SQL
    const fechaSQL = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 console.log("esta es frcha ", fechaSQL);
    return fechaSQL;
}

  const toggleModal = (modalId) => {
    if (modalId === 1) {
      setShowModal1(true);
    } else if (modalId === 2) {
      setShowModal2(true);
    } else if (modalId === 3) {
      setShowModal3(true);
    }
  };

  const hideAllModals = () => {
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
  };


  useEffect(()=>{
    // listarResultado();
    listarCatador();
  },[]);


  const inicializarDatos = () => {
      const nuevosDatos = Array.from({ length: 30 }, (_, index) => ({
        valor: "",
      analisis_id: "",
      variables_id: (index + 1).toString(),
      // variables_id: 1,
      // fecha:"2024-01-27T00:40:33.000Z",
      fecha: fechaActual,

    }));
    setDatos(nuevosDatos);
  };

  useEffect(() => {
    inicializarDatos();
  }, []);

  

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




useEffect(()=>{
  window.addEventListener("click",function(e){
    let divOptions = document.querySelectorAll(".div-input-search-select");
    for (let s = 0; s < divOptions.length; s++) {
      if(!e.target == divOptions[s] || !divOptions[s].contains(e.target)){
        let options = divOptions[s].querySelectorAll(".select-options-cafe")
        // console.log(options[0])
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


  const labelText = [
    'Peso C.P.S ',
    'Peso Cisco',
    'Peso total de la almendra',
    'Peso defectos totales ',
    'Peso de almendra sana',
    'Negro total o parcial ',
    'Vinagre (g) ',
    'Vetado',
    'Sobresecado',
    'Picado por insectos  ',
    'Inmaduro ',
    'Flojo ',
    'Malla 18 ',
    'Malla 17 ',
    'Malla 16 ',
    'Humedad',
    'Merma por trilla',
    'Porcentaje de almendra sana ',
    'Factor de rendimiento ',
    'Porcentaje de defectos totales ',
    'Cristalizado',
    'Cardenillo  ',
    'Ámbar',
    'Mordido',
    'Averanado ',
    'Aplastado ',
    'Decolorado ',
    'Malla 15  ',
    'Malla 14' ,
    'Mallas menores '
    // 'analisis'
    // Otras mallas o campos pueden agregarse según sea necesario
  ];



  // const camposEntrada = (index, field, value) => {
  //   setDatos((prevDatos) => {
  //     // Si el índice no está definido o el objeto en ese índice no existe, crea un nuevo objeto.
  //     if (index === undefined || prevDatos[index] === undefined) {
  //       const nuevosDatos = [...prevDatos];
  //       const nuevoObjeto = { valor: value, analisis_id: 3, variables_id: (index + 1).toString(), fecha: fechaActual };
  //       nuevosDatos[index] = nuevoObjeto;
  //       console.log("Nuevo estado1:", nuevosDatos);
  //       return nuevosDatos;
  //     }

  //     // Si el índice y el objeto en ese índice ya existen, actualiza el valor del campo.
  //     // const nuevosDatos = [...prevDatos];
  //     // nuevosDatos[index] = { ...nuevosDatos[index], [field]: value };
  //     // console.log("Nuevo estado:", nuevosDatos);
  //     // return nuevosDatos;
  //     // El anterio es el codigo a menudio funcionar
  //         const nuevosDatos = Array.isArray(resultadoSellecionado) ? [...resultadoSellecionado] : [resultadoSellecionado];
  //     nuevosDatos[index] = { ...nuevosDatos[index], [field]: value };
  //     console.log("Nuevo estado2:", nuevosDatos);
  //     return nuevosDatos;
  //   });
  // };


  // const camposEntrada = (index, field, value) => {
  //   setResultadoSeleccionado((resultadoSellecionado) => {
  //     if (index === undefined || resultadoSellecionado[index] === undefined) {
  //       const nuevosDatos = [...resultadoSellecionado];
  //       const nuevoObjeto = { valor: value, analisis_id: 3, variables_id: (index + 1).toString(), fecha: fechaActual };
  //       nuevosDatos[index] = nuevoObjeto;
  //       console.log("Nuevo estado1:", nuevosDatos);
  //       return nuevosDatos;
  //     }

  //     const nuevosDatos = resultadoSellecionado;
  //     nuevosDatos[index] = { ...nuevosDatos[index], [field]: value };
  //     console.log("Nuevo estado2:", nuevosDatos);
  //     console.log("Resultado seleccionado:", resultadoSellecionado);

  //     return nuevosDatos ;
  //   });
  // };




  

  const camposEntrada2 = (index, field, value) => {
  
    const nuevosDatos = datos.map((dato, i) =>
      i === index ? { ...dato, [field]: value } : dato
    );
    console.log("j",index,"i",field,"dato",value)

    // if(index == 3 ){
    //   const nuevosDatos = datos.map((dato, i) =>
    //   i === index ? { ...dato, [field]: 120 } : dato
      
    // );
    // nuevosDatos[3][field] = 120;
    // return nuevosDatos
      // setDatos(nuevosDatos)  
    // }

    if (index == index) { // Input 5

      function toNumber(value) {
        return isNaN(value) || value === '' ? 0 : parseFloat(value);
    }

    
      const valorInput1 = nuevosDatos[0].valor; // Valor del input 1
      const valorInput2 = nuevosDatos[1].valor; // Valor del input 2

      // const valorInput4 = nuevosDatos[4].valor; // Valor del input 2

/////////////DEFECTOS TOTALES////////////////////
      const valorInput7 = nuevosDatos[7].valor;
      const valorInput9 = nuevosDatos[9].valor;
      const valorInput10 = nuevosDatos[10].valor;
      const valorInput11 = nuevosDatos[11].valor;
      const valorInput23 = nuevosDatos[23].valor;
      const valorInput24 = nuevosDatos[24].valor;
      const valorInput25 = nuevosDatos[25].valor;

      const defectosTotales = toNumber(valorInput7) + toNumber(valorInput9) + toNumber(valorInput10) + toNumber(valorInput11) + toNumber(valorInput23) + toNumber(valorInput24) + toNumber(valorInput25);

      nuevosDatos[3].valor = defectosTotales
///////////////////////////////////////////////////////

  
//////////////////////////////////////MERMA POR TRILLA///////////////////
      const nuevoValorInput5 = /* Tu cálculo */( valorInput2 *  100) / valorInput1;


      nuevosDatos[16].valor = nuevoValorInput5 ;


/////////////////////////peso total almendra////////////////////////
      const nuevoValorInput6 = /* Tu cálculo */valorInput1 - valorInput2 ;
      nuevosDatos[2].valor = nuevoValorInput6;

////////////////////////////////PESO ALMENDRA SANA////////////////////////////////////
      nuevosDatos[4].valor = nuevoValorInput6 - defectosTotales   ;

      
/////////////////////////////////FACTOR DE RENDIMIENTO///////////////////////////

    const almendraSana = nuevosDatos[4].valor
    const factorRendimiento = (valorInput1 * 70) /  almendraSana;
    nuevosDatos[18].valor =  factorRendimiento.toFixed(0);


///////////////////////////////////////

  const porcentajeDefectos = /* Tu cálculo */( defectosTotales *  100) / valorInput1;
  nuevosDatos[19].valor = porcentajeDefectos;
  const PorcentajeAlmendraSana = /* Tu cálculo */( almendraSana *  100) / valorInput1;
  nuevosDatos[17].valor = PorcentajeAlmendraSana;


    }


    const inputElement = document.getElementById(`input-${datos[index].variables_id}`);
    if (inputElement) {
      inputElement.value = value;
    }
    console.log("nice2",nuevosDatos);


    setDatos(nuevosDatos);
  };

  const camposEntrada = (index, field, value) => {
    setResultadoSeleccionado((resultadoSellecionado) => {
      console.log("resulttados seleccionado", resultadoSellecionado);
      const nuevosDatos = resultadoSellecionado.map((dato, i) =>

        i === index ? { ...dato, [field]: value } : dato
        
      );
      return nuevosDatos;
    });
  };









  //////////////////////////////7Respaldo de generar inputs/////////////////////////////////////////////////

  // const generarInputs = () => {
  //   const filas = [];
  //   const numColumnas = 9;

  //   for (let i = 0; i < datos.length; i += numColumnas) {
  //     const fila = datos.slice(i, i + numColumnas);
  //     filas.push(
  //       <div className="columna" key={i}>
  //         {fila.map((dato, j) => (
  //             <div className="container-input" key={dato.variables_id}>
  //               <input
  //                 type="text"
  //                 id={`input-${dato.variables_id}`}
  //                 value={dato.valor}
  //                 className='input'
  //                 placeholder=""
  //                 onChange={(e) => camposEntrada2(i + j, "valor", e.target.value)}
  //               />
  //               <label htmlFor={`input-${dato.variables_id}`} className='label'>
  //                 {labelText[i + j ]}</label>
  //             </div>
  //           // </div>
  //         ))}
  //       </div>
  //     );
  //   }
  

  // // Agregar el input y su label al final
  // filas.push(
  //   <div className="columna" key="cafes_id">
  //     <div className="container-input">
  //       <input
  //         type="text"
  //         className='input'
  //         placeholder=''
  //         id="cafes_id"
  //         name="cafes_id"
  //         // ref={cafes_id}
  //         // value={filtro}
  //         // onChange={filtrarOpciones}
  //         autoComplete="off"
  //       />
  //       <label htmlFor="cafes_id" className='label'>Analisis</label>
  //       {/* {mostrarOpciones && (
  //         <div className="custom-dropdown">
  //           {cafe.map((cafe) => (
  //             (cafe.documento.toLowerCase().includes(filtro) ||
  //               cafe.nombre_usuario.toLowerCase().includes(filtro) ||
  //               cafe.numero_lote.toLowerCase().includes(filtro) ||
  //               cafe.nombre_variedad.toLowerCase().includes(filtro)) && (
  //               <div
  //                 key={cafe.id}
  //                 className="custom-dropdown-option"
  //                 onClick={() => handleClickOpcion(cafe)}
  //               >
  //                 {`${cafe.id}-${cafe.documento}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`}
  //               </div>
  //             )
  //           ))}
  //         </div>
  //       )} */}
  //     </div>
  //   </div>
  // );

  // return filas;
  // };
  
  ///////////////////////////////////////////////////77Fin de respaldo/////////////////////////////////////////////////////
  const generarInputs = () => {
    const filas = [];
    const numColumnas = 10;
    // let cafes_id = dataSelect.cafes_id;
    // console.log("este es cafes_id " + cafes_id);
    // setCafesId(dataSelect.cafes_id)
      // console.log("hola mundo");

    for (let i = 0; i < labelText.length; i += numColumnas) {
      
      const fila = datos.slice(i, i + numColumnas);
      // const fila = datos.slice(i, i + numColumnas);

      // for (let i = 0; i < datos.length; i += numColumnas) {
      
      //   const fila = datos.slice(i, i + numColumnas);
        // console.log("hola mundo");
      filas.push(

        
        <div className="columna" key={i}>
          
          {fila.map((dato, j) => (
        
            
            <div className="container-input" key={dato.variables_id}>
              <input
                type="text"
                id={`input-${dato.variables_id}`}
                value={dato.valor}
                // value={dato.valor}

                className="input"
                placeholder=""
                onChange={(e) => camposEntrada2(i + j, "valor", e.target.value)}
              />
              <label htmlFor={`input-${dato.variables_id}`} className="label">
                {           
                // console.log("j",j,"i",i,"dato",dato)
                // console.log("dato",dato.variables_id, dato.valor) 
                }
                {labelText[i + j]}
              </label>
            </div>
          ))}        
        </div>

      );

      
    }
  
  
    // Agregar una columna separada para el análisis
    // filas.push(
    //   <div className="columna" key="analisis">
    //     <div className="container-input div-input-search-select">
    //     <input className="input-search-cafe " type="text" id="cafes_id" />
    //                     <label htmlFor="cafes_id" className='label-analisis-resultado'>Analisis</label>
    //                     <div className="select-options-cafe" 

    //                     >
    //                         {analisis.length > 0 && analisis
    //                         .map((key, index) => (
    //                             (
    //                                 <div className="option-select-cafe" data-id={key.id_analisis } onClick={() => { document.getElementById("cafes_id").value = key.id_analisis;!dataSelect.cafes_id ? dataSelect.cafes_id = {} : "".dataSelect.cafes_id.value = key.id; clearFocusInput("cafes_id") }} key={key.id_analisis}>
                                      
    //                                   {key.id_analisis + "," + key.codigo_externo+ ", " + key.nombre_usuario + ", "  + key.nombre_tipo_analisis } </div>
    //                             )
    //                         ))}
    //                     </div>
    //                     {

    //                     //  console.log("este es cafes_id " + cafes_id )
    //                     }
    //     </div>
    //   </div>
    // );
  
    return filas;
  };
  
  
  
  
  const generarInputs2 = () => {
    const filas = [];
    const numColumnas = 15;
  
    for (let i = 0; i < resultadoSellecionado.length; i += numColumnas) {
      const fila = resultadoSellecionado.slice(i, i + numColumnas);
      console.log("Resultado seleccionado",resultadoSellecionado);
      
  
      filas.push(
        <div className="columna" key={i}>
          {fila.map((dato, j) => {
            const index = i + j;
  
            return (
              <div className="container-input" key={dato.variables_id}>
                <input
                  type="text"
                  id={`input-${dato.variables_id}-${index}`}
                  value={dato.valor || ''}
                  className='input-actualizar'
                  placeholder=""
                  onChange={(e) => {
                    console.log("Input change detected");
                    camposEntrada(index, "valor", e.target.value);
                  }}
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label-actualizar'>
                  {labelText[index]}
                </label>
              </div>
            );
          })}
        </div>
      );
    }
  
    return filas;
  };




  const generarInputs3 = () => {
    const filas = [];
    const numColumnas = 15;

    for (let i = 0; i < datos.length; i += numColumnas) {
      const fila = datos.slice(i, i + numColumnas);

      filas.push(
        <div className="columna" key={i}>
          {fila.map((dato, j) => {
            const x = i + j ; // Inicia en 1 y llega hasta 25
              // console.log(resultadoSellecionado[j])
            return (
              <div className="container-input" key={dato.variables_id}>

                <input
                  type="text"
                  id={`input-${datos.variables_id}-${x}`}
                  value={resultadoSellecionado[x]?.valor || ''}
                  className='input-actualizar '
                  placeholder=""
                  readOnly
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label-actualizar'>
                  {labelText[i + j]}
                </label>
              </div>
            );
          })}
        </div>
      );
    }
    

    return filas;
  };



  ////////////////////////////////////////////////DATA TABLE//////////////////////////////////////////

  useEffect(()=> {
    if (catador.length > 0 ) {
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
        lengthMenu:[
          [7,10,50,-1],
          ['7 Filas','10 Filas','50 Filas','Ver Todo']
        ]
      });

    }
  },[resultado])


  const GuardarResultados = async () => {
    console.log("datos de resultado" ,datos )
    console.log("este es el id de cafes" + cafesId);


    try {
      const datosConAnalisisId = datos.map((dato) => ({
        ...dato,
        fecha: fechaActual,
        analisis_id: catadorId
      }));

      // setDatos(datosConAnalisisId);
      // const datosValidos = datosConAnalisisId.filter(dato => dato.valor !== null || dato.valor !== undefined);

      const response = await fetch(`http://${localhost}:4000/resultado/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({datosConAnalisisId}),
      });
    // console.log("hola mundo" + JSON.stringify({datosConAnalisisId}));


      if (response.status === 200) {
        const result = await response.json();
        console.log("Resultado del servidor:", result);
        Sweet.registroExitoso();
        hideAllModals()
        // listarResultado();
        listarCatador();

      }

      if (response.status === 400) {
        console.error("Error al procesar la solicitud", response.statusText);
        Sweet.registroFallido();
      }

    } catch (error) {
      console.error("Error al procesar la solicitud", error);
    }

  };

  // async function listarResultado(){
  //   try{

  //     const response = await fetch(`http://${localhost}:4000/resultado/listar`, {
  //       method: "GET",
  //       headers: {
  //         token: localStorage.getItem("token")
  //     }
  //     })
  //     const data = await response.json();
  //     setResultado(data)
  //     // return data
  //   }catch(e){
  //     console.error("Error" + e);
  //   }
  // }
  const listarCatador = async () => {
    try {
        const response = await Api.get('catador/listar');
        setCatador(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


  function buscarResultado(id,fecha_creacion) {
    fetch(`http://${localhost}:4000/resultado/buscar/${id}`,{
      headers: {
        'Content-type': 'application/json',
      },
      method:'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        // setResultadoSeleccionado(data); Este es la linea que funciona
        // setResultadoSeleccionado({
        //   ...data,
        //   id:id,
        //   // valor:resultadoSellecionado[j].valor,
        // })
        setResultadoSeleccionado(data)

      })
      .catch((error) => {
        console.error(error);
      });
      // console.log(dato)
  }


  const actualizarResultado = (id) => {
    // console.log("Respuesta desde el frontend")
    const datosActualizados = resultadoSellecionado.map((dato) => ({
      id: dato.id,
      valor: dato.valor,
      
    }));

    fetch(`http://${localhost}:4000/resultado/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ datosActualizados }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Actualización fallida');
        }
      })
      .then((result) => {
        console.log("Resultado del servidor:", result);
        Sweet.actualizacionExitosa();
        hideAllModals();
        // listarResultado(); 
        listarCatador();
      })
      .catch((error) => {
        console.error("Error al procesar la solicitud", error);
        Sweet.actualizacionFallida();
      });
  };


  useEffect(() => {
    const buscarUsuarios = async () => {
        try {
            const response = await Api.get('analisis/listar',{
              headers: {
                  token: localStorage.getItem("token")
              }
          });
            setAnalisi(response.data);
            console.log("Soy data de analisis", response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
    buscarUsuarios();
}, []);

  const filtrarOpciones = (event) => {
    setFiltro(event.target.value.toLowerCase());
    setMostrarOpciones(true);
  };
  // const handleClickOpcion = (cafe) => {
  //   // Actualizamos el filtro con el valor seleccionado
  //   setFiltro(`${cafe.documento}-${cafe.nombre_usuario}-${cafe.numero_lote}-${cafe.nombre_variedad}`);
  //   setMostrarOpciones(false);
  // };

  return (

    <div>
      
      {showModal1 ?
      <div className={`main-content-registrar`} id="modalInfo1" >
      <h1 className='title-registrar-resultado'>Registrar resultado</h1> 

      <form className="formulario-resultado"
      
      method="post">
        
        {generarInputs()}
  
        <div className="buttons">
          <button className="btn-reg-mue" type="button" onClick={GuardarResultados}>
            Enviar
          </button>
          
          <button className="btn-reg-mue" type="button" onClick={hideAllModals}>
            Cancelar
          </button>
        </div>
      </form>
    </div>

      : " "}
    
    {showModal2 ? 
      <div className="main-content-registrar"id="modalInfo2" >

      <h1 className='title-registrar-resultado'>Actualizar resultado</h1> 
      
        <form className="formulario-resultado" method="post">
          {generarInputs2()}
          <div className="buttons">
            <button className="btn-reg-mue" type="button" onClick={() => actualizarResultado(resultadoSellecionado[3])}>
              Actualizar
            </button>
            
            <button className="btn-reg-mue" type="button" onClick={hideAllModals}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    :""}
    


<div>

    {showModal3 ? 
      <div className="main-content-registrar" id="modalInfo3" >
      {/* <div className="container-tittle"> */}
      <h1 className='title-registrar-resultado'>Visualizar resultado</h1> 


      {/* </div> */}
      <form className="formulario-resultado" method="post">

        {generarInputs3()}
      
        <div className="buttons">          
          <button className="btn-reg-mue" type="button" onClick={hideAllModals}>
            Cancelar
          </button>
        </div>
        
      </form>
    </div>

    : ""}
{/* <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" /> */}

<div className="main-container">
<h1 className='title-registrar'>Listar resultados</h1> 


  <div className="container-fluid w-full">
  <table id="table-d" style={{ width: "100%" }} className="table table-hover rounded-3 overflow-hidden display responsive nowrap shadow" 
        ref={tableRef}
        cellPadding={0}
        width= "100%">
    <thead>
        <tr>
          <th>ID</th>
          <th>Analisis</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Estado</th>
          <th>Registrar</th>
          {user.user ? user.user.rol == 'administrador' || user.user.rol == 'catador' ? 
          <th>Actualizar</th>
          : '' : ''}
          <th>Mas</th>


        </tr>
      </thead>
      <tbody>
              {catador.length > 0 ? catador
              .map((task,index) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  {/* <td>{formatDate(task. fecha_creacion)}</td> */}
                  <td>{task.analisis_id}</td>
                  <td>{task.nombre}</td>
                  <td>{task.apellidos}</td>
                  <td>
                        {task.estado === 0 ? (
                                        <button
                                        className="btn-activar"
                                        onClick={() => {  handleEditUser3(task.analisis_id,task.id)}}
                                        >
                                        Finalizado
                                        </button>

                                        
                                        ) : (
                                            <button
                                            className="btn-desactivar"
                                            onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                                        >
                                            Pendiente
                                        </button>
                                            
                                        )}  
                  </td>
                  <td>
                  {user.user ? user.user.rol == 'administrador' || user.user.rol == 'catador' ? 
                    <button className="btn-reg-mue" onClick={() => {setShowModal1(!showModal1);
                    setCatadorId(task.id)}}>
                        Registrar resultado
                    </button>
                    : '' : ''}
                  </td>
                  {user.user ? user.user.rol == 'administrador' || user.user.rol == 'catador' ? 
                  <td>
                    <button className="btn-reg-mue"
                      onClick={() => {
                        toggleModal(2);
                        buscarResultado(task.id);
                      }}
                      >
                    Editar</button>
                  </td>
                  : '' : ''}

                  <td>
                    <button
                                  type="button"
                                  className="btn-reg-mue"
                                  onClick={() => { toggleModal(3); buscarResultado(task.id) ;} }
                              >Mas
                              </button>
                  </td>

                </tr>
              )): <tr><td colSpan={999999999999} className="p-5 text-center">{resultado.message}</td></tr>}
            </tbody>
    </table>
  </div>
</div>


</div>
</div>

  );
}

export default Resultado;

