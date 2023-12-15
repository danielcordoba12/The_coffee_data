import React,{useEffect,useState} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

// import listarResultado from "../../public/js/resultados.js";



function Muestra() {
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

    <div>
        <Table responsive="sm">
        <thead>
        <tr>
            <th>Defecto</th>
            <th>Cantidad</th>
        </tr>
        </thead>
        <tbody id="tablaResultado"></tbody >
    
      </Table>
    
    </div>



    <div id="sourcers">
        
    </div>
    </>

    );


}

export default Muestra;

