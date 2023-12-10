import React,{useEffect,useRef} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../style/analisis.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faHelmetSafety,faClockRotateLeft,faMugSaucer,faToolbox,faMagnifyingGlassChart,faChartColumn,faPhone,faSliders}  from'@fortawesome/free-solid-svg-icons'

function Analisiss() {
  return (
    <>

        <img src="../../public/img/fondo.png" alt="hiiiiii" className="fondo3" />
        <header>

            <h1>ADMIN</h1>
        </header>
        <nav className="navbar">
               <div className="list-items">
                   <ul>
                       <li>
                           <FontAwesomeIcon icon={faHelmetSafety} className="icon" />
                           Administrador
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faClockRotateLeft} className="icon"/>
                           Historia
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faMugSaucer} className="icon"/>
                           Mi producto
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faToolbox} className="icon"/>
                           Servicio
                       </li>
                       <li>
                       <FontAwesomeIcon icon={faMagnifyingGlassChart} className="icon"/>
                           Analisis
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faChartColumn} className="icon"/>
                           Comparacion
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faPhone}className="icon" />
                           Contacto
                       </li>
                       <li>
                           <FontAwesomeIcon icon={faSliders} className="icon"/>
                           Configuracion
                       </li>


                   </ul>
               </div>
           </nav>

    

          
     
    </>  
  );
}

export default Analisiss;