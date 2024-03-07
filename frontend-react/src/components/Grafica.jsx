import React, { useState, useEffect ,useRef} from 'react';
import ReactEchartsCore from 'echarts-for-react';
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import '../style/grafica.css';
import Form from 'react-bootstrap/Form';
import esES from "../languages/es-ES.json"
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-bs5/css/DataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";




function Grafica() {

  

  const [showModal1, setShowModal1] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [resultadoSellecionado,setResultadoSeleccionado]=useState([]);
  const tableRef = useRef();
  const [selectedRows, setSelectedRows] = useState({});
  const [resultadoSelect,setResultadoSelect] = useState([]);


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
  // console.log("esta es frcha ", fechaSQL);
    return fechaSQL;
}

  const ids = Object.values(resultadoSelect).map(item => item.id);
  // console.log("hola desde buscar en el ids ",ids);


  // Obtener las fechas como un array
  const fechas = Object.values(resultadoSelect).map(item => convertirFechaSQL(item.fecha_creacion));

  


  function formatDate(dateString) {
    if (!dateString) return ''; // Manejar el caso de valor nulo o indefinido
    const fecha = new Date(dateString);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  const toggleModal = () => {
      setShowModal1(!showModal1);
      setShowContainer(!showModal1)
  };
  // const hideAllModals = () => {
  //   setShowModal1(false);
  // };



  useEffect(()=> {
    if (resultado.length > 0 ) {
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

  useEffect(()=>{
    listarResultado()
  },[]);

  
  

  // function buscarResultado(id,fecha_creacion) {
    function buscarResultado(id, fecha_creacion, callback) {
      const resultados = []; // Arreglo para almacenar los datos
  
      // Realizar las llamadas fetch
      Promise.all(id.map((id, index) => {
          return fetch(`http://localhost:4000/resultado/buscar/${id}?fecha_creacion=${fecha_creacion[index]}`, {
              method: 'GET',
              headers: {
                  'Content-type': 'application/json',
              },
          })
          .then(res => res.json())
          .then(data => resultados.push(data)) // Agregar los datos al arreglo resultados
          .catch(error => console.error(error));
      }))
      .then(() => {
          // Todas las llamadas fetch han terminado
          setResultadoSeleccionado(resultados); // Establecer resultadoSeleccionado con el arreglo resultados
          
          // const valores = resultados.flatMap(array => array.map(objeto => objeto.valor));

          const nuevasSeries = resultados.map((serie, index) => ({
            name: `Serie ${index + 1}`,
            type: 'line',
            stack: `stack-${index + 1}`,
            data: serie.map(data => data.valor),
            // Asignar un color diferente a cada serie
            itemStyle: {
              color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            }
          }));


          setOption(prevOption => ({
            ...prevOption,
            series: [
              ...nuevasSeries
            ]
          }));

      });
  }
  



  const handleCheckboxChange = (isChecked,id) => {
    console.log("este es id" , id);
    // console.log("este es index" , index);
    setSelectedRows(prevState => ({
      ...prevState,
      [id]: isChecked
    }));

  };

  const idcheck = (index,id,fecha_creacion) => {
    const isChecked = selectedRows[id];
    // if (isChecked) {
    //   console.log(`El checkbox en el id ${id} está seleccionado`, isChecked);
    // } else {
    //   console.log(`El checkbox en el id ${id} no está seleccionado` ,isChecked);
    // }
    if(index in resultadoSelect){  
      const newArray ={...resultadoSelect};
      delete newArray[index];
      setResultadoSelect(newArray)
    }else{
      setResultadoSelect(resultadoSelect =>({...resultadoSelect,
        [index]:{
          id:id,
          fecha_creacion:fecha_creacion
        }
      }));

    }
        // console.log("resultado", resultadoSelect);
        // console.log("analisis id", id); 



    // for (const key in resultadoSelect) {
    //   // console.log("key",key);
    //   if (resultadoSelect.hasOwnProperty(key)) {
    //     const item = resultadoSelect[key];
    //     const id = item.id;
    //     console.log("ID:", id);
    //   }
    // }
    

  }
  const data2  = [
    'Peso',
    'Humedad',
    'Peso Cisco',
    'Merma por trilla',
    'Peso total de la almendra ',
    'Almendra sana ',
    'Peso defectos totales ',
    'Factor de rendimiento',
    'Peso de almendra sana',
    'Porcentaje de defectos ',
    'Negro total o parcial ',
    'Cardenillo ',
    'Vinagre ',
    'Cristalizado ',
    'Veteado ',
    'Ámbar ',
    'Sobresecado (g)',
    'Mordido ',
    'Picado',
    'Averanado ',
    'Inmaduro ',
    'Aplastado',
    'Flojo',
    'Decolorado ',
    'Malla 18 ',
    'Malla 15 ',
    'Malla 17 ',
    'Malla 14 ',
    'Malla 16 ',
    // 'analisis'
    // Otras mallas o campos pueden agregarse según sea necesario
  ]

    // Configura tus opciones de gráfico
    const [option, setOption] = useState({
      backgroundColor: "white",
      title: {
        text: 'Resultados'
      },
      tooltip: {
        trigger: 'axis',
        // formatter: function(params) {
        //   let tooltipContent = `Punto ${params[0].dataIndex + 1}: ${params[0].value}<br>`;
        //   console.log("params ",params);
          
        //   // Verificar si hay información en data2 para mostrar en el tooltip
        //   // if (data2 && data2.length === params.length) {
        //     for (let i = 0; i < params.length; i++) {
        //       tooltipContent += `${data2[i]}: ${params[i].value}<br>`;
        //   return tooltipContent;

        //     }
        //   // }
          
        //   return tooltipContent;
        // }
        // formatter: function(params) {
        //   let tooltipContent = `Punto ${params[0].dataIndex + 1}: ${params[0].value}<br>`;
        //   const newData = params.map(param => {
        //     return {
        //       ...param,
        //       data: param.data
        //     };
        //   });
        //   // Ahora newData contiene los datos actualizados
        //   console.log(newData);
        //   return tooltipContent
        //   // Aquí puedes continuar con el formateo del tooltip usando newData
        //   // Por ejemplo, podrías acceder a newData[0].data para obtener el primer conjunto de datos
        // }
      },
      legend: {
        data2  : [
          'Peso',
          'Humedad',
          'Peso Cisco',
          'Merma por trilla',
          'Peso total de la almendra ',
          'Almendra sana ',
          'Peso defectos totales ',
          'Factor de rendimiento',
          'Peso de almendra sana',
          'Porcentaje de defectos ',
          'Negro total o parcial ',
          'Cardenillo ',
          'Vinagre ',
          'Cristalizado ',
          'Veteado ',
          'Ámbar ',
          'Sobresecado (g)',
          'Mordido ',
          'Picado',
          'Averanado ',
          'Inmaduro ',
          'Aplastado',
          'Flojo',
          'Decolorado ',
          'Malla 18 ',
          'Malla 15 ',
          'Malla 17 ',
          'Malla 14 ',
          'Malla 16 ',
          // 'analisis'
          // Otras mallas o campos pueden agregarse según sea necesario
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: false
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data : [
          'P',
          'H',
          'PS',
          'MT',
          'PTA ',
          'AS ',
          'PDT',
          'FT',
          'PAS',
          'PD',
          'NT ',
          'C ',
          'V ',
          'C ',
          'VE ',
          'Á',
          'S',
          'M ',
          'P',
          'A ',
          'I ',
          'A',
          'F',
          'D ',
          'M 18 ',
          'M 15 ',
          'M 17 ',
          'M 14 ',
          'M 16 ',
          // 'analisis'
          // Otras mallas o campos pueden agregarse según sea necesario
        ],
          axisLabel: {
            interval: 0
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'a',
          // data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'b',
          // data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'c',
          // data: [150, 232, 201, 154, 190, 330, 310]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'd',
          // data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'e',
          // data: [320, 332, 301, 334, 390, 330, 320]
        }
      ],
      textStyle: {
        color: 'black'
      },
    });
    return (
        <>        
        {/* <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" /> */}

        <h1 className='title-grafica'>Graficar</h1> 

        <button className="btn-reg-mue" onClick={() => toggleModal(1)}>
          Graficas resultado
        </button>
        <div className={`container ${showContainer ? 'show' : ''}`}>
      
        <ReactEchartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: '700px', width: '100%' }}
            theme="light"
        />
        </div>


    <div className={`main-content-graficar ${showModal1 ? 'show' : ''}`} id="modalInfo1">
    <div className="container-fluid w-full">

    <table className=" bg-white table table-stiped table-bordered border display responsive nowrap b-4"
        ref={tableRef}
        cellPadding={0}
        width= "100%">
          
        <thead>
          <tr>
          {/* <th>Index</th> */}
          {/* <th hidden>Index</th> */}
          <th>ID</th>
          <th>Muestra</th>
          <th>Cantidad</th>
          <th>Usuario</th>
          <th>Finca</th>
          <th>Lote</th>
          <th>Tipo analisis</th>
          <th>Fecha</th>
          <th>Fecha</th>
          <th>Graficar</th>
          <th>jjj</th>

          </tr>
        </thead>
        <tbody>
                {resultado.map((task,index) => (
                  
                  <tr key={task.id}>
                    {/* <td>{index}</td> */}
                    {/* <td hidden>{index}</td> */}
                    <td>{task.id}</td>
                    <td>{task.muestra}</td>
                    <td>{task.valor}</td>
                    <td>{task.usuario}</td>
                    <td>{task.finca}</td>
                    <td>{task.lote}</td>
                    <td>{task.tipo_analisis}</td>
                    <td>{task.analisis_id}</td>
                    <td>{formatDate(task.fecha_creacion)}</td>
                    <td>
                    <CheckApiExample
                      onChange={(isChecked) =>{ 
                        handleCheckboxChange( isChecked,task.analisis_id); 
                        idcheck(index,task.analisis_id,task.fecha_creacion)
                        }}/>
                    </td>
                    <td>
                      <button onClick={() => idcheck(task.id,task.fecha_creacion)}>holis</button>
                      
                    </td>

                  </tr>
                ))}
                
              </tbody>
              
      </table>

              {/* <button onClick={buscarResultado(resultadoSelect.id,resultadoSelect.fecha_creacion)}>Graficar </button> */}
              <button className='button-graficar'
              onClick={() => {
                buscarResultado(ids, fechas),
                toggleModal();
              }}>Graficar</button>
              




</div>
</div>

    </>

    );
}

function ToggleButtonExample({ index }) {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleButton
    className="mb-2"
    id="toggle-check"
    type="checkbox"
    variant="outline-dark"
    checked={checked}
    value="1"
    onChange={(e) => setChecked(e.currentTarget.checked)}
  >
    Checked
  </ToggleButton>
  );
}

function CheckApiExample({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <Form>
      <div className="text-primary">
        <Form.Check>
          <Form.Check.Input id="custom-checkbox" type="checkbox" className="" onChange={handleCheckboxChange} checked={isChecked} />
        </Form.Check>
      </div>
    </Form>
  );
}

  


export default Grafica;
