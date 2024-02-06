
import React, { useEffect, useState } from "react";
import '../style/RegistrarMuestra.css'
import Sweet from "../helpers/Sweet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX }  from'@fortawesome/free-solid-svg-icons'




function Resultado() {
  const [datos, setDatos] = useState([]);
  const [nuevosDatos, setNuevosDatos] = useState([]);
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
      setShowModal1(!showModal1);
    } else if (modalId === 2) {
      setShowModal2(!showModal2);
    } else if (modalId === 3) {
      setShowModal3(!showModal3);
    }
  };

  const hideAllModals = () => {
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
  };


  useEffect(()=>{
    listarResultado()
  },[]);


  const inicializarDatos = () => {
      const nuevosDatos = Array.from({ length: 25 }, (_, index) => ({
        valor: "",
      analisis_id: 3,
      variables_id: (index + 1).toString(),
      // variables_id: 1,
      fecha:"2024-01-27T00:40:33.000Z",
      // fecha: fechaActual,

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
  const camposEntrada = (index, field, value) => {
    setResultadoSeleccionado((resultadoSellecionado) => {
      const nuevosDatos = resultadoSellecionado.map((dato, i) =>
        i === index ? { ...dato, [field]: value } : dato
      );
      console.log("Nuevo estado:", nuevosDatos);
      return nuevosDatos;
    });
  };


  //     // Si el índice y el objeto en ese índice ya existen, actualiza el valor del campo.
  //     const nuevosDatos = [...prevDatos];
  //     nuevosDatos[index] = { ...nuevosDatos[index], [field]: value };
  //     console.log("Nuevo estado:", nuevosDatos);
  //     return nuevosDatos;
  //   });
  // };



  const generarInputs = () => {
    const filas = [];
    const numColumnas = 9;

    for (let i = 0; i < datos.length; i += numColumnas) {
      const fila = datos.slice(i, i + numColumnas);

      filas.push(
        <div className="columna" key={i}>
          {fila.map((dato, j) => (
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
  const generarInputs2 = () => {
    const filas = [];
    const numColumnas = 9;
  
    for (let i = 0; i < resultadoSellecionado.length; i += numColumnas) {
      const fila = resultadoSellecionado.slice(i, i + numColumnas);
  
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
                  className='input'
                  placeholder=""
                  onChange={(e) => {
                    console.log("Input change detected");
                    camposEntrada(index, "valor", e.target.value);
                  }}
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label'>
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
    const numColumnas = 9;

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
                  className='input'
                  placeholder=""
                  readOnly
                />
                <label htmlFor={`input-${dato.variables_id}`} className='label'>
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






  const GuardarResultados = async () => {
    try {
      const datosConAnalisisId = datos.map((dato) => ({
        ...dato,
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
    // console.log("hola mundo" + JSON.stringify({datosConAnalisisId}));


      if (response.status === 200) {
        const result = await response.json();
        console.log("Resultado del servidor:", result);
        Sweet.registroFallido();
      }

      if (response.status === 400) {
        console.error("Error al procesar la solicitud", response.statusText);
        Sweet.registroFallido();
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


  function buscarResultado(id) {
    fetch(`http://localhost:4000/resultado/buscar/${id}`,{
      method:'GET',
      headers: {
        'Content-type': 'application/json',
      },
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

    fetch(`http://localhost:4000/resultado/update/${id}`, {
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
        listarResultado();
      })
      .catch((error) => {
        console.error("Error al procesar la solicitud", error);
        Sweet.actualizacionFallida();
      });
  };



  return (
    <div>
      <div className={`main-content-registrar ${showModal1 ? 'show' :  ''}`} id="modalInfo1" showModal={showModal1}>

      <h1 className="title-registrar-muestras">Registrar Resultado</h1>
      <form className="formulario-muestra" method="post">
        {generarInputs()}
        <div className="buttons">
          <button className="button button-aceptar" type="button" onClick={GuardarResultados}>
            Enviar
          </button>
          
          <button className="button button-cancel" type="button" onClick={hideAllModals}>
            Cancelar
          </button>
        </div>
      </form>
    </div>


    

    <div className={`main-content-registrar ${showModal2 ? 'show' :  ''}`} id="modalInfo2" showModal={showModal2}>

      <h1 className="title-registrar-muestras">Actualizar Resultado</h1>
      <form className="formulario-muestra" method="post">
        {generarInputs2()}
        <div className="buttons">
          <button className="button button-aceptar" type="button" onClick={() => actualizarResultado(resultadoSellecionado[3])}>
            Actualizar
          </button>
          
          <button className="button button-cancel" type="button" onClick={hideAllModals}>
            Cancelar
          </button>
        </div>
      </form>
    </div>


<div>

<div className={`main-content-registrar ${showModal3 ? 'show' :  ''}`} id="modalInfo3" showModal={showModal3}>
      <div className="container-tittle">
      <h1 className="title-registrar-muestras">Visualizar Muestra</h1>

      </div>
      <form className="formulario-muestra" method="post">

        {generarInputs3()}
        <div className="buttons">          
          <button className="button button-cancel" type="button" onClick={hideAllModals}>
            Cancelar
          </button>
        </div>
        
      </form>
    </div>
<img src="../../public/img/fondo.png" alt="" className="fondo-muestra" />

<div className="main-container">
  <button className="btn-reg-mue" onClick={() => setShowModal1(!showModal1)}>
      Registrar resultado
  </button>

  <table className="table-muestra">
    <thead>
      <tr>
        <th>ID</th>
        <th>Muestra</th>
        <th>Cantidad</th>
        <th>analisis</th>
        <th>Fecha</th>
        <th>Fecha</th>
        <th>Actualizar</th>
        <th>Mas</th>


      </tr>
    </thead>
    <tbody>
            {resultado.map((task,index) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                {/* <td>{formatDate(task. fecha_creacion)}</td> */}
                <td>{task.muestra}</td>
                <td>{task.valor}</td>
                <td>{task.analisis_id}</td>
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
                      toggleModal(2);
                      buscarResultado(task.analisis_id);
                    }}
                    >
                  Editar</button>
                </td>

                <td>
                  <button
                                type="button"
                                className="btn-primary"
                                onClick={() => { toggleModal(3), buscarResultado(task.analisis_id) ;} }
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

