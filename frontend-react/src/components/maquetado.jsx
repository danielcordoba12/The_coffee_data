import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/maquetado.css";

const maquetado = () => {
    return (
        <div className="contenedor-principal">
        <div className="contenedor-maquetado">
          <div className="contenedor-cuadrado">
            <div className="contenedor-pequeno"></div>
            <div className="contenedor-pequeno"></div>
          </div>
          <div className="contenedor-cuadrado">
            <div className="contenedor-pequeno"></div>
            <div className="contenedor-pequeno"></div>
          </div>
          <div className="contenedor-grande"></div>
          <div className="contenedor-grande"></div>
        </div>
        <div className="contenedor-maquetado">
          <div className="contenedor-cuadrado">
            <div className="contenedor-grande1"></div>
            <div className="contenedor-grande1"></div>

          </div>
          <div className="contenedor-cuadrado">
          <div className="contenedor-pequeno1"></div>
            <div className="contenedor-pequeno1"></div> 
            </div>
        </div>
        </div>
      );
    }

export default maquetado;