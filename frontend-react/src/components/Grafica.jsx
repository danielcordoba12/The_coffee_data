import React, { useState, useEffect ,useRef} from 'react';
import ReactEchartsCore from 'echarts-for-react';
import * as echarts from 'echarts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import '../style/grafica.css';
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
  const tableRef = useRef();


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

    // Configura tus opciones de gráfico
  const option = {
  title: {
    text: 'Resultados'

  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
    yAxis: {
    type: 'value'
    },
    series: [
    {
        name: 'Email',
        type: 'line',
        stack: 'a',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Union Ads',
        type: 'line',
        stack: 'b',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Video Ads',
        type: 'line',
        stack: 'c',
        data: [150, 232, 201, 154, 190, 330,310]
    },
    {
        name: 'Direct',
        type: 'line',
        stack: 'd',
        data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
        name: 'Search Engine',
        type: 'line',
        stack: 'e',
        data: [320, 332, 301, 334, 390, 330, 320]
    }
    
    ],
    textStyle: {
        color: 'white',  // Cambia el color del texto 
    },
};

    return (
        <>        
        {/* <img src="../../public/img/fondo.png" alt="" className="fondo-muestra" /> */}


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
            theme="dark"
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
          <th>ID</th>
          <th>Muestra</th>
          <th>Cantidad</th>
          <th>Usuario</th>
          <th>Finca</th>
          <th>Lote</th>
          <th>Tipo analisis</th>
          <th>Fecha</th>

          </tr>
        </thead>
        <tbody>
                {resultado.map((task,index) => (
                  <tr key={task.id}>
                    <td>{task.muestra}</td>
                    <td>{task.valor}</td>
                    <td>{task.usuario}</td>
                    <td>{task.finca}</td>
                    <td>{task.lote}</td>
                    <td>{task.tipo_analisis}</td>
                    <td>{formatDate(task.fecha_creacion)}</td>
                    <td>
                      <ToggleButtonExample index={index} />
                    </td>

                  </tr>
                ))}
              </tbody>
      </table>
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

export default Grafica;
