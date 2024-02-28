import '../style/dashboard.css'
import { useState } from 'react';
import { Outlet,Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faHelmetSafety,faBars,faUsers,faToolbox,faMagnifyingGlassChart,faChartColumn,faPhone,faSliders,faVials, }  from'@fortawesome/free-solid-svg-icons'



function Dashboard() {
    const [menuDesplegado, setMenuDesplegado] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipHovered, setTooltipHovered] = useState(false);
    const [tooltipStates, setTooltipStates] = useState({});

    const menuWidth = menuDesplegado ? '220px' : '55px';

    const DesplegarMenu = () => {
        setMenuDesplegado(!menuDesplegado);
    };



    const handleTooltipEnter = (index) => {
        setTooltipStates({ ...tooltipStates, [index]: true });
    };

    const handleTooltipLeave = (index) => {
        setTooltipStates({ ...tooltipStates, [index]: false });
    };


    function Tooltip({ children, content, className }) {
        return (
            <div
                className={className}
                onMouseEnter={() => setTooltipHovered(true)}
                onMouseLeave={() => setTooltipHovered(false)}
            >
                {children}
                {tooltipHovered && <span className="tooltip-content">{content}</span>}
            </div>
        );
    }   

    const items = [
        { label: "Administrador", icon: faHelmetSafety, to: "/", tooltipContent: "Administrador", className: "first-icon" },
        { label: "Usuarios", icon: faUsers, to: "/Usuario/listar", tooltipContent: "Ver usuarios" },
        { label: "Fincas", icon: faToolbox, to: "/finca", tooltipContent: "Ver fincas" },
        { label: "Lotes", icon: faMagnifyingGlassChart, to: "/lote", tooltipContent: "Ver lotes" },
        { label: "Cafe", icon: faChartColumn, to: "/cafe", tooltipContent: "Ver café" },
        { label: "Analisis", icon: faPhone, to: "/analisis/listar", tooltipContent: "Ver análisis" },
        { label: "Muestras", icon: faVials, to: "/listar/muestra", tooltipContent: "Ver muestras" },
        { label: "Resultado", icon: faVials, to: "/resultado", tooltipContent: "Ver resultados" },
        { label: "Grafica", icon: faVials, to: "/grafica", tooltipContent: "Ver gráficas" },
        { label: "Municipios", icon: faSliders, to: "/municipio", tooltipContent: "Ver municipios", className: "li-dasboard" },
        { label: "Variedad", icon: faSliders, to: "/variedad", tooltipContent: "Ver variedades", className: "li-dasboard" },
    ];
    // const DesplegarMenu= () =>{
        
    //     if (menuDesplegado == true){
    //         nav.style.width = 55 + "px";
    //         // mainConterDasboard.style.overflow= "hidden";
    //         // tooltipLi.style.opacity= "1";

    //         menuDesplegado = !menuDesplegado;
    //         // tooltip_li.style.display = "none" ;



    //     }else {
    //         nav.style.width = 520 + "px";
    //         // mainConterDasboard.style.overflow= "hidden";
    //         // tooltipLi.style.opacity= "0";    
            

    //         menuDesplegado = !menuDesplegado;




    //     }

        
        
        // // };
        // function Tooltip({ children, content, className }) {
        //     return (
        //         <div
        //             className={className}
        //             onMouseEnter={() => setTooltipHovered(true)}
        //             onMouseLeave={() => setTooltipHovered(false)}
        //         >
        //             {children}
        //             {tooltipHovered && <span className="tooltip-content">{content}</span>}
        //         </div>
        //     );
        // }
        const handleMouseEnter = () => {
            if (!menuDesplegado) {
                setShowTooltip(true);
            }
        };
    
        const handleMouseLeave = () => {
            setShowTooltip(false);
        };
    
      

    return(
        <>

        <div className="main-container-dasboard" id="mainConterDasboard">

            <div className="nav-header">
                <div className="header">


                    <div className="container-logo">
                        <div className="logo">
                            <svg className="logoSena" xmlns="http://www.w3.org/2000/svg" id="a" viewBox="0 0 63.67 62.2">
                            <path className="b" d="M32,0c3.77,0,6.85,3.1,6.85,6.9s-3.07,6.9-6.85,6.9-6.85-3.1-6.85-6.9S28.23,0,32,0" />
                            <path className="b"
                                d="M7.06,22.26v.03c-.02,.12-.03,.2-.03,.25,0,.36,.2,.62,.6,.8,.41,.17,1.03,.26,1.88,.26,.65,0,1.15-.07,1.52-.21,.37-.14,.55-.34,.55-.59,0-.38-.73-.68-2.17-.92-.17-.03-.3-.05-.38-.06-.09-.02-.23-.04-.41-.07-2.3-.38-3.78-.79-4.44-1.23-.32-.22-.56-.47-.73-.76-.16-.29-.24-.62-.24-.99,0-.9,.53-1.59,1.59-2.06,1.06-.47,2.61-.71,4.64-.71s3.5,.22,4.47,.66c.97,.44,1.45,1.12,1.45,2.04v.11h-3.81v-.04c0-.32-.19-.55-.58-.72-.39-.16-.95-.25-1.7-.25-.58,0-1.03,.06-1.33,.17-.32,.12-.47,.28-.47,.49,0,.38,.83,.71,2.49,.97,.32,.05,.57,.09,.75,.12,1.18,.2,2.03,.37,2.53,.51,.5,.14,.93,.31,1.3,.5,.4,.22,.72,.5,.94,.84,.22,.34,.33,.71,.33,1.12,0,.93-.58,1.64-1.73,2.15-1.15,.5-2.81,.75-4.97,.75s-3.69-.24-4.64-.72c-.96-.48-1.43-1.25-1.43-2.32v-.14H7.06Zm10.44,3.02v-9.14h10.87v1.97h-6.79v1.46h6.27v1.95h-6.27v1.77h7.04v2h-11.12Zm12.83,0v-9.14h5.16l5.53,6.14v-6.14h3.92v9.14h-5.36l-5.35-6.16v6.16h-3.91Zm25.15-3.65l-1.95-3.32-2.06,3.32h4.02Zm-6.22,3.65h-4.09l6.32-9.14h4.53l6.03,9.14h-4.54l-.92-1.65h-6.33l-.98,1.65Z" />
                            <path className="b"
                                d="M12.08,57.52l-3.65-3.43,11.1-19.29c.6-1.05-.15-2.37-1.36-2.37H0v-4.83H29.24L12.08,57.52Z" />
                            <path className="b"
                                d="M51.6,57.52l3.65-3.43-11.1-19.29c-.6-1.05,.15-2.37,1.36-2.37h18.17v-4.83h-29.24l17.16,29.92Z" />
                            <path className="b"
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
            <div className="container-outlet">

                <nav className={`nav ${menuDesplegado ? 'menu-desplegado' : ''}`} id="nav" style={{ width: menuWidth }}>
                    <div className="lista-items">
                    <FontAwesomeIcon icon={faBars} className="icon-menu" id="iconMenu" onClick={DesplegarMenu} />
                        <ul id='listaItemsUl' className='listaItemsUl'>
                            <li className="first-icon">
                                
                                <FontAwesomeIcon icon={faHelmetSafety} className="icon " />
                                <p id="paragraph">Administrador</p>
                            </li>

                            <li>
                                <Link to={"/home/usuario/listar"}>
                                    <FontAwesomeIcon icon={faUsers}  className="icon"/>
                                    <p id="paragraph">Usuarios</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/finca"}>
                                    <FontAwesomeIcon icon={faToolbox} className="icon"/>
                                    <p>Fincas</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/lote"}>
                                    <FontAwesomeIcon icon={faMagnifyingGlassChart} className="icon"/>
                                    <p>Lotes</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/cafe"}>
                                    <FontAwesomeIcon icon={faChartColumn} className="icon"/>
                                    <p>Cafe</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/analisis"}>
                                    <FontAwesomeIcon icon={faPhone}className="icon" />
                                    <p>Analisis</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/listar/muestra"}>
                                    <FontAwesomeIcon icon={faVials}  className="icon"/>
                                    <p>Muestras</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/home/analisis"}>
                                    <FontAwesomeIcon icon={faPhone}className="icon" />
                                    <p>Analisis</p>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to={"/resultado"}>
                                    <FontAwesomeIcon icon={faVials}  className="icon"/>
                                    <p>Resultado</p>
                                </Link>
                            </li><li>
                                <Link to={"/home/grafica"}>
                                    <FontAwesomeIcon icon={faVials}  className="icon"/>
                                    <p>Grafica</p>
                                    
                                </Link>
                            </li>
                        
                            <li className="li-dasboard">
                                <Link to={"/home/municipio"} style={{ textDecoration: 'none', color: 'black !important' }}>
                                    <FontAwesomeIcon icon={faSliders} className="icon"/>
                                    <p>Municipios</p>
                                </Link>
                                {/* {!showTooltip && (
                                    <span className="tooltip">Contenido del tooltip</span>
                                )} */}
                            </li>


                            <li className="li-dasboard">
                                <Link to={"/home/variedad"} style={{ textDecoration: 'none', color: 'black !important' }}>
                                    <FontAwesomeIcon icon={faSliders} className="icon"/>
                                    <p>Variedad</p>
                                </Link>
                            </li>
                                
                            
                            {/* {items.map((item, index) => (
                                    <li key={index} className={item.className}>
                                        <Link to={item.to}>
                                            <Tooltip content={item.tooltipContent} className="tooltip">
                                                <FontAwesomeIcon icon={item.icon} className="icon" />
                                            </Tooltip>
                                            <p>{item.label}</p>
                                        </Link>
                                    </li>
                                ))} */}


                        </ul> 
            </div>

            </nav>
            <div className="content-container">
                <Outlet/>
            </div>
        </div>

        
            </div>


        </>
        
    );    
}

export default Dashboard;