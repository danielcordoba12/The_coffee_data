import React, { useEffect } from "react";
import '../style/loginfrom.css';
import { faUser, faHelmetSafety, faClockRotateLeft, faMugSaucer, faToolbox, faMagnifyingGlassChart, faChartColumn, faPhone, faSliders } from '@fortawesome/free-solid-svg-icons';
import api from "../services/api";

const LoginForm = () => {
    useEffect(() => {
        window.addEventListener("load", function () {
            let sourcers = document.getElementById("sourcers");
            let script = document.createElement("script");
            script.src = "../public/js/loginfrom.js";
            sourcers.appendChild(script)
        })
    }, [])

    return (
        <>

        <img src="../../public/img/fondo2.jpg" alt="" className="fondo" />
            <header>
                <h2 className="logo">
                    <img src="img/logotrans.png" alt="logo " width="200px" />
                </h2>
                <nav className="navigation">
                    
                    <button className="btnlogin-popup">login</button>
                </nav>
            </header>

            <div className="wrapper">
                <span className="icon-close">
                    <ion-icon name="close-outline"></ion-icon>
                </span>

                <div className="form-box login">
                    <h2><img src="img/nombrelogo.png" alt="logo " width="250px" /></h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail-outline"></ion-icon></span>
                            <input type="email" required />
                            <label>Correo</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                            <input type="password" required />
                            <label>Contraseña</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Recordar
                            </label>
                            <a href="#">olvidaste tu contraseña</a>
                        </div>

                        <button type="buttom" className="btn">login</button>

                       
                    </form>
                </div>
            </div>
            <div id="sourcers">

            </div>
        </>
    );
};

export default LoginForm;
