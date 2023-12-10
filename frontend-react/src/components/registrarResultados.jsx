import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";


function GuardarResultado(){
useEffect(() => {
    window.addEventListener("load", function () {
        let sourcers = document.getElementById("sourcers");
        let script = document.createElement("script");
        script.src = "../public/js/resultados.js";
        sourcers.appendChild(script)
    })
}, [])

return(
    <>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />

    <form className="tabla2"  method="post">
    <h1 className="text-center font-bold underline text-3xl p-3 m-2">Guardar resultado</h1>


    <div className="div-input">
        <input type="text" id="nombre" name="nombre"  placeholder="" />
        <label htmlFor="nombre">Cantidad</label>
    </div>
    <div className="div-input">
        <input type="text" id="longitud" name="longitud"  placeholder="" />
        <label htmlFor="longitud">Analisis</label>
    </div>
    <div className="div-input">
        <input type="text" id="latitud" name="latitud" placeholder="" />
        <label htmlFor="latitud">Defecto</label>
    </div>

    
    <div className="div-input">
        <input type="date" id="fecha_creacion" name="fecha_creacion"  placeholder="" />
        
    </div>

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline"
        type="submit">Guardar resultado</button>
</form>
</>
)

}

export default GuardarResultado;