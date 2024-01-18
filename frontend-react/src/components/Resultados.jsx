// import React,{useEffect,useState} from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import Table from 'react-bootstrap/Table';

// // import listarResultado from "../../public/js/resultados.js";



// function Resultado() {
//         const [showModal1, setShowModal1] = useState(true);
//         const [showModal2, setShowModal2] = useState(true);
//         const [showModal3, setShowModal3] = useState(true);
//         const [index, setIndex] = useState(0);

//         const hideAllModals = () => {
//             setShowModal1(false);
//             setShowModal2(false);
//             setShowModal3(false);
//             };


//         // const [datos,setDatos] = useState(Array(18).fill({valor : '', analisis_id:'',varibles_id:'',fecha: ''}));

//         const [datos, setDatos] = useState([]);

//                               // Función para inicializar los datos
//             const inicializarDatos = () => {
//               const nuevosDatos = Array.from({length : 25},(_, index)=>({
//                 valor: '' ,
//                 analisis_id: 1,
//                 variables_id: (index+1).toString(),
//                 fecha: ''
//               }))
//               setDatos(nuevosDatos);

//             };
//             // const [datos, setDatos] = useState(
//             //   Array.from({ length: 18 }, (_, index) => ({
//             //     valor: '',
//             //     analisis_id: 1,
//             //     varibles_id: '',
//             //     fecha: '2024-01-15T15:38:19.052Z',
//             //   }))
//             // );

//                // Asignar valores del 1 al 18
//               // for (let i = 0; i < nuevosDatos.length; i++) {
//               //   nuevosDatos[i].valor = (i + 1).toString(); // Asigna el valor como una cadena
//               // }


//             useEffect(() => {
//               // Llamar a la función para inicializar los datos cuando el componente se monta
//               inicializarDatos();
//             }, []);

//         const GuardarResultados =  async () => {
//             try {
//                   const fechaActual = new Date().toISOString();
//                                 // Mapear los datos y agregar el analisis_id
//                   const datosConAnalisisId = datos.map((dato) => ({
//                     ...dato,
//                     analisis_id: 1, // Reemplaza "tuValorDeAnalisisId" con el valor real del analisis_id
//                     fecha:fechaActual,
//                   }));

//                   // Actualizar el estado con los nuevos datos
//                   setDatos(datosConAnalisisId);
//                 const response = await fetch('http://localhost:4000/resultado/registrar',{
//                     method : "POST",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(datosConAnalisisId),
//             });
//             if(response.status == 200) {
//                 const result = await response.json ();
//                 console.log("Resultado del servidor:" , result)
//             }
//             if(response.status == 400){
//                 console.error('Error al procesar la solicitud' ,response.statusText );
//             }
//         }catch (error) {
//             console.error("Error al procesar la solicitud", error);
//         }
//         };

//         // let newDatos = [...datos];

//         const camposEntrada = (index, field, value) => {
//           if (index !== undefined && datos[index] !== undefined) {
//             setDatos(prevDatos => {
//               const newDatosCopy = [...prevDatos];

//               // Verifica si la propiedad field existe en el objeto
//               if (newDatosCopy[index].hasOwnProperty(field)) {
//                 // Asigna el valor a la propiedad correspondiente
//                 newDatosCopy[index][field] = value;
//               }

//               return newDatosCopy;
//             });
//           }
//         };





//         const datosMuestra = [
//             { id: 'PesoC.P.S', label: 'Campo 1:' },
//             { id: 'PesoCisco', label: 'Codigo externo' },
//             { id: 'PesoAlmendra', label: 'Hola mundo' },
//             { id: 'Peso_Defectos_Totales', label: 'Hola mundo' },
//             { id: 'Peso_Almendra_Sana', label: 'Hola mundo' },
//             { id: 'Negro_total', label: 'Hola mundo' },
//             { id: 'vinagre', label: 'Hola mundo' },
//             { id: 'Veteado', label: 'Hola mundo' },
//             { id: 'Sobresecado', label: 'Hola mundo' },



//             // Agrega los demás campos aquí
//             ];

//             const datosMuestra2 = [
//             { id: 'Picado_Insectos', label: 'Tiempo de secado' },
//             { id: 'Inmaduro', label: 'Presentacion' },
//             { id: 'flojo', label: 'Presentacion' },
//             { id: 'Malla18 ', label: 'Presentacion' },
//             { id: 'Malla17', label: 'Presentacion' },
//             { id: 'Malla16 ', label: 'Presentacion' },
//             { id: 'presentacion', label: 'Presentacion' },
//             { id: 'Humedad', label: 'Presentacion' },
//             { id: 'MermaTrilla', label: 'Hola mundo' },


//             // Agrega los demás campos aquí
//             ];
//             const datosMuestra3 = [
//               { id: 'almendra_Sana', label: 'Tiempo de secado' },
//               { id: 'Factor_Rendimiento', label: 'Tiempo de secado' },
//               { id: 'Cardenillo', label: 'Presentacion' },
//               { id: 'Cristalizado', label: 'Presentacion' },
//               { id: 'ambar', label: 'Presentacion' },
//               { id: 'mordido', label: 'Presentacion' },
//               { id: 'averanado', label: 'Presentacion' },



//               // Agrega los demás campos aquí
//               ];

//               const generarInputs = (datosArray, index) => {
//                 const datos = datosArray[0];
//                 return datos.map((dato, i) => (
//                   <div className='container-input' key={`${index}-${i}-${dato.id}`}>
//                     {dato.id === 'fecha_creacion' ? (
//                       <input
//                         type='date'
//                         id={dato.id}
//                         name={dato.id}
//                         className= 'input '
//                         placeholder=''
//                         onChange={(e) => camposEntrada(index, 'variables_id', e.target.value)}
//                       />
//                     ) : (
//                       <input
//                         type='text'
//                         id={dato.id}
//                         name={dato.id}
//                         className="input"
//                         placeholder=''
//                         onChange={(e) => {
//                           console.log("Valor de entrada:", e.target.value);
//                           camposEntrada(index, 'variables_id', e.target.value);
//                         }}
//                       />
//                     )}
//                     <label htmlFor={dato.id} className='label'>
//                       {dato.label}
//                     </label>
//                   </div>
//                 ));
//               };






//             // const FormularioMuestra = () => {
//             //     return (
//             //       <div className={`main-content-registrar ${showModal1 ? 'show' : ''}`} id='modalInfo1'>
//             //         <h1 className='title-registrar-muestras'>Registrar Muestra</h1>

//             //         <form className='formulario-muestra' method='post'>
//             //           <div className='columna'>{generarInputs(datosMuestra)}</div>
//             //           <div className='columna'>{generarInputs(datosMuestra2)}</div>
//             //           <div className='columna'>{generarInputs(datosMuestra3)}</div>

//             //           {/* Agrega los botones y otros elementos aquí */}

//             //         </form>
//             //       </div>
//             //     );
//             //   };
//               return (
//                 <div className={`main-content-registrar ${showModal1 ? 'show' : ''}`} id='modalInfo1'>
//                   <h1 className='title-registrar-muestras'>Registrar Muestra</h1>

//                   <form className='formulario-muestra' method='post'>
//                     <div className='columna'>{generarInputs([datosMuestra], index)}</div>
//                     <div className='columna'>{generarInputs([datosMuestra2], index)}</div>
//                     <div className='columna'>{generarInputs([datosMuestra3], index)}</div>


//                     <button className='btn-reg-mue' type='button' onClick={hideAllModals}>
//                       Cancelar
//                     </button>
//                     <button className='button' type='button'  onClick={GuardarResultados}  >
//                       Enviar
//                     </button>
//                   </form>
//                 </div>
//               );


// }

// export default Resultado;
import React, { useEffect, useState } from "react";
import '../style/RegistrarMuestra.css'



function Resultado() {
  const [datos, setDatos] = useState([]);
  const [resultado,setResultado] = useState([]);
  const [resultadoSellecionado,setResultadoSeleccionado] = useState([])
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  



  const fechaActual = new Date().toISOString();

  function formatDate(dateString) {
    if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
    const fecha = new Date(dateString);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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



  const inicializarDatos = () => {
      const nuevosDatos = Array.from({ length: 25 }, (_, index) => ({
        valor: "",
      analisis_id: 1,
      variables_id: (index + 1).toString(),
      // variables_id: 1,
      fecha: fechaActual,
    }));
    setDatos(nuevosDatos);
  };

  useEffect(() => {
    inicializarDatos();
  }, []);

  const labelText = [
    'value: Peso C.P.S (g)',
    'Humedad (%)',
    'Peso Cisco (g)',
    'Merma por trilla (%)',
    'Peso total de la almendra (g)',
    'Porcentaje de almendra sana (%)',
    'Peso defectos totales (g)',
    'Factor de rendimiento (Kg C.P.S)',
    'Peso de almendra sana (g)',
    'Porcentaje de defectos totales (%)',
    'Negro total o parcial (g)',
    'Cardenillo (g)',
    'Vinagre (g)',
    'Cristalizado (g)',
    'Veteado (g)',
    'Ámbar o mantequillo (g)',
    'Sobresecado (g)',
    'Mordido o cortado (g)',
    'Picado por insectos (g)',
    'Averanado o arrugado (g)',
    'Inmaduro o paloteado(g)',
    'Aplastado (g)',
    'Flojo (g)',
    'Decolorado o reposado (g)',
    'Malla 18 (g)',
    'Malla 15 (g)',
    'Malla 17 (g)',
    'Malla 14 (g)',
    'Malla 16 (g)',
    // Otras mallas o campos pueden agregarse según sea necesario
  ];


  const camposEntrada = (index, field, value) => {
    if (index !== undefined && datos[index] !== undefined) {
      setDatos((prevDatos) => {
        const nuevosDatos = [...prevDatos];
        nuevosDatos[index] = { ...nuevosDatos[index], [field]: value };
        console.log("Nuevo estado:", nuevosDatos); // Agrega este console.log
        return nuevosDatos;
      });
    }
  };
  const  soloValor = () => {

        // console.log(resultado);

      }
    soloValor();

  const generarInputs = () => {
    const filas = [];
    const numColumnas = 9;

    for (let i = 0; i < datos.length; i += numColumnas) {
      const fila = datos.slice(i, i + numColumnas);

      filas.push(
        <div className="columna" key={i}>
          {fila.map((dato, j) => (
            // <div className={`main-content-registrar ${showModal1 ? 'show' :  ''}`}   id="modalInfo1 "   >
              // <div className="columna">
              <div className="container-input" key={dato.variables_id}>
                <input
                  type="text"
                  id={`input-${dato.variables_id}`}
                  value={dato.valor}
                  className='input'
                  placeholder=""
                  onChange={(e) => camposEntrada(i + j, "valor", e.target.value)}
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label'>
                  {labelText[i + j ]}</label>
              </div>
            // </div>
          ))}
        </div>
      );
    }

    return filas;
  };
  const generarInputs3 = () => {
    const filas = [];
    const numColumnas = 9;

    for (let i = 0; i < datos.length; i += numColumnas) {
      const fila = datos.slice(i, i + numColumnas);

      filas.push(
        <div className="columna" key={i}>
          {fila.map((dato, j) => (
            // <div className={`main-content-registrar ${showModal1 ? 'show' :  ''}`}   id="modalInfo1 "   >
              // <div className="columna">
              <div className="container-input" key={dato.variables_id}>
                <input
                  type="text"
                  id={`input-${dato.variables_id}`}
                  value={resultadoSellecionado.valor}
                  className='input'
                  placeholder=""
                  onChange={(e) => camposEntrada(i + j, "valor", e.target.value)}
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label'>
                  {labelText[i + j ]}</label>
              </div>
            // </div>
          ))}
        </div>
      );
    }
    // console.log("Este es la informacion " , )

    return filas;
  };
  
    
  


  const GuardarResultados = async () => {
    try {
      const datosConAnalisisId = datos.map((dato) => ({
        ...dato,
        analisis_id: 1,
        fecha: fechaActual,
      }));

      // setDatos(datosConAnalisisId);
      // const datosValidos = datosConAnalisisId.filter(dato => dato.valor !== null || dato.valor !== undefined);

      const response = await fetch("http://localhost:4000/resultado/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({datosConAnalisisId}),
      });
    console.log("hola mundo" + JSON.stringify({datosConAnalisisId}));


      if (response.status === 200) {
        const result = await response.json();
        console.log("Resultado del servidor:", result);
      }

      if (response.status === 400) {
        console.error("Error al procesar la solicitud", response.statusText);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
    }

  };

  async function listarResultado(){
    try{

      const response = await fetch('http://localhost:4000/resultado/listar',{
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
      const data = await response.json();
      setResultado(data)
      // return data
    }catch(e){
      console.error("Error" + e);
    }
  }
  listarResultado();

    function buscarResultado(id) {
          fetch(`http://localhost:4000/resultado/buscar/${id}`,{
            method:'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setResultadoSeleccionado(data[0]); })
            .catch((error) => {
              console.error(error);
            });
        }
  return (
    <div>  
      <div className={`main-content-registrar ${showModal1 ? 'show' :  ''}`}   id="modalInfo1 "   >
      <h1 className="title-registrar-muestras">Registrar Muestra</h1>
      <form className="formulario-muestra" method="post">
        {generarInputs()}
        <button className="button" type="button" onClick={GuardarResultados}>
          Enviar
        </button>
      </form>
    </div>
    

<div>

<div id="modalInfo3" className={`modal-info ${showModal3 ? 'show' : ''}`}  showModal={showModal3} >
      <h1 className="title-registrar-muestras">Registrar Muestra</h1>
      <form className="formulario-muestra" method="post">
        {generarInputs3()}
        <button className="button" type="button" onClick={GuardarResultados}>
          Enviar
        </button>
      </form>
    </div>
<img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

<div className="main-container">
  <button className="btn-reg-mue" onClick={() => setShowModal1(!showModal1)}>
      Registrar muestra
  </button>

  <table className="table-muestra">
    <thead>
      <tr>
        <th>ID</th>
        <th>Defecto</th>
        <th>Cantidad</th>
        <th>analisis</th>
        <th>Fecha</th>
        <th>Fecha</th>
        <th>Fecha</th>
        <th>Mas</th>
        

      </tr>
    </thead>
    <tbody>
            {resultado.map((task,index) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                {/* <td>{formatDate(task. fecha_creacion)}</td> */}
                <td>{task.variable}</td>
                <td>{task.valor}</td>
                <td>{task.analisis}</td>
                <td>{formatDate(task.fecha_creacion)}</td>
                <td>
                {task.estado === 1 ? (
                    <button
                      className="btn-secondary"
                      // onClick={() => { setUpdateModal(true); desactivarMuestra(task.id)}}
                    >
                      Desactivar
                    </button>
                  ) : (
                    <button
                      className="btn-tertiary"
                      // onClick={() => { setUpdateModal(true); activarMuestra(task.id)}}
                    >
                      Activar
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn-reg-mue"
                    onClick={() => {
                      // toggleModal(2);
                      buscarMuestra(task.id);
                    }}
                    >
                  Editar</button>
                </td>
                <td>
                  <button
                                type="button"
                                className="btn-primary"
                                onClick={() => { toggleModal(3) ,buscarResultado(task.id);} }
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
}

export default Resultado;

