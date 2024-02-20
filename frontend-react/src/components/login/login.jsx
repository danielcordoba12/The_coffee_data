import React, { useState } from "react";
import "../../style/loginfrom.css";
import "../../../public/js/loginfrom.js";
import { faUser, faHelmetSafety, faClockRotateLeft, faMugSaucer, faToolbox, faMagnifyingGlassChart, faChartColumn, faPhone, faSliders } from '@fortawesome/free-solid-svg-icons';
import api from "../../services/api";
import Sweet from "../../helpers/Sweet";

const LoginForm = () => {
    const [documento, setDocumento] = useState("");
    const [contraseña, setContraseña] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5173/validacion/validar", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numero_documentos: documento,
                user_password: contraseña,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200){
                console.log(data.token);
                localStorage.setItem("token" , data.token);
                window.location.reload();
            } else {
                Sweet.error(data.message);
            }
        });
        
        console.log("documento", documento);
        console.log("contraseña", contraseña);
    }

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
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="numero_documentos"></ion-icon></span>
                            <input type="text" required value={documento} onChange={(e) => setDocumento(e.target.value)} />
                            <label>documento</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                            <input type="password" required value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                            <label>contraseña</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Recordar
                            </label>
                            <a href="#">olvidaste tu contraseña</a>
                        </div>

                        <button type="submit" className="btn">login</button>
                    </form>
                </div>
            </div>
            <div id="sourcers"></div>
        </>
    );
};

export default LoginForm;
