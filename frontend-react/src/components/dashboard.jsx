import React,{useEffect,useState} from "react";
import '../style/dashboard.css'
import { Outlet,Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faHelmetSafety,faClockRotateLeft,faUsers,faToolbox,faMagnifyingGlassChart,faChartColumn,faPhone,faSliders,faVials}  from'@fortawesome/free-solid-svg-icons'
// import {faUser} from '@fortawesome/free-brands-svg-icons'
import api from "../services/api";



function Dashboard() {
    return(
        <>

        <img src="../../public/img/fondo.png" alt="" className="fondo" />
        <div className="main-container-dasboard">

            <div className="nav-header">
                <div className="header">


                    <div className="container-logo">
                        <div className="logo">
                            <svg class="logoSena" xmlns="http://www.w3.org/2000/svg" id="a" viewBox="0 0 63.67 62.2">
                            <path class="b" d="M32,0c3.77,0,6.85,3.1,6.85,6.9s-3.07,6.9-6.85,6.9-6.85-3.1-6.85-6.9S28.23,0,32,0" />
                            <path class="b"
                                d="M7.06,22.26v.03c-.02,.12-.03,.2-.03,.25,0,.36,.2,.62,.6,.8,.41,.17,1.03,.26,1.88,.26,.65,0,1.15-.07,1.52-.21,.37-.14,.55-.34,.55-.59,0-.38-.73-.68-2.17-.92-.17-.03-.3-.05-.38-.06-.09-.02-.23-.04-.41-.07-2.3-.38-3.78-.79-4.44-1.23-.32-.22-.56-.47-.73-.76-.16-.29-.24-.62-.24-.99,0-.9,.53-1.59,1.59-2.06,1.06-.47,2.61-.71,4.64-.71s3.5,.22,4.47,.66c.97,.44,1.45,1.12,1.45,2.04v.11h-3.81v-.04c0-.32-.19-.55-.58-.72-.39-.16-.95-.25-1.7-.25-.58,0-1.03,.06-1.33,.17-.32,.12-.47,.28-.47,.49,0,.38,.83,.71,2.49,.97,.32,.05,.57,.09,.75,.12,1.18,.2,2.03,.37,2.53,.51,.5,.14,.93,.31,1.3,.5,.4,.22,.72,.5,.94,.84,.22,.34,.33,.71,.33,1.12,0,.93-.58,1.64-1.73,2.15-1.15,.5-2.81,.75-4.97,.75s-3.69-.24-4.64-.72c-.96-.48-1.43-1.25-1.43-2.32v-.14H7.06Zm10.44,3.02v-9.14h10.87v1.97h-6.79v1.46h6.27v1.95h-6.27v1.77h7.04v2h-11.12Zm12.83,0v-9.14h5.16l5.53,6.14v-6.14h3.92v9.14h-5.36l-5.35-6.16v6.16h-3.91Zm25.15-3.65l-1.95-3.32-2.06,3.32h4.02Zm-6.22,3.65h-4.09l6.32-9.14h4.53l6.03,9.14h-4.54l-.92-1.65h-6.33l-.98,1.65Z" />
                            <path class="b"
                                d="M12.08,57.52l-3.65-3.43,11.1-19.29c.6-1.05-.15-2.37-1.36-2.37H0v-4.83H29.24L12.08,57.52Z" />
                            <path class="b"
                                d="M51.6,57.52l3.65-3.43-11.1-19.29c-.6-1.05,.15-2.37,1.36-2.37h18.17v-4.83h-29.24l17.16,29.92Z" />
                            <path class="b"
                                d="M31.8,32.7s.04-.07,.04-.07l16.48,27.28-4.38,2.28-10.62-17.81c-.63-1.05-2.14-1.05-2.76,0-3.54,5.98-10.55,17.81-10.55,17.81l-4.28-2.12s15.19-25.87,16.07-27.37" />
                            </svg>
                        </div>
                    </div>

                    <div className="empty"></div>   
                    <div className="container-title-dasboard">
                        <h1 className="title-dasboard">The Coffee data</h1>
                    </div>

                    <div className="empty"></div>   

                    <div className="container-username">
                        <div className="container-icon">
                            <FontAwesomeIcon icon={faUser} className="FaUser" />
                        </div>
                        <div className="username">
                            <h2>Daniel Cordoba</h2>
                        </div>
                    </div>


                </div>
            </div>
            <nav className="nav">
            
                <div className="lista-items">
                    <ul>
                        <li className="first-icon">
                            
                            <FontAwesomeIcon icon={faHelmetSafety} className="icon " />
                            Administrador
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faClockRotateLeft} className="icon"/>
                            Historia
                        </li>
                        <li>
                            <Link to={"/Usuario/listar"}>
                                <FontAwesomeIcon icon={faUsers}  className="icon"/>
                                Usuarios
                            </Link>
                        </li>
                        <li>
                            <Link to={"/finca/listar"}>
                                <FontAwesomeIcon icon={faToolbox} className="icon"/>
                                Fincas
                            </Link>
                        </li>
                        <li>
                            <Link to={"/lote/listar"}>
                                <FontAwesomeIcon icon={faMagnifyingGlassChart} className="icon"/>
                                Lotes
                            </Link>
                        </li>
                        <li>
                            <Link >
                                <FontAwesomeIcon icon={faChartColumn} className="icon"/>
                                Veredas
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Analisis"}>
                                <FontAwesomeIcon icon={faPhone}className="icon" />
                                Analisis
                            </Link>
                        </li>
                        <li>
                            <Link to={"/listar/muestra"}>
                                <FontAwesomeIcon icon={faVials}  className="icon"/>
                                Muestras
                            </Link>
                        </li>
                        <li className="li-dasboard">
                            <Link to={"/Resultado"} style={{ textDecoration: 'none', color: 'black !important' }}>
                                <FontAwesomeIcon icon={faSliders} className="icon"/>
                                Resultados
                            </Link>
                        </li>
                        


                    </ul>
                </div>
            </nav>
        </div>

        </>
        
    );    
}

export default Dashboard;