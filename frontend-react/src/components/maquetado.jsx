import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
import "../style/maquetado.css";

const maquetado = () => {
  return (
    <div className="contenedor-principal">
  <div className="analytics-container">
    <div className="analytics-item">
      <p className="name"><a href="/home/Usuario/listar">Usuarios</a></p>
    </div>
  </div>
  <div className="order-container">
    <div className="order-item">
      <p className="name"><a href="/home/finca">Fincas</a></p>
    </div>
  </div>
  <div className="additional-container">
  <div className="new-order-container">
    <div className="new-order-item">
      <p className="new-name"><a href="/home/lote">Lotes</a></p>

    </div>
  </div>
  <div className="new-order-container">
    <div className="new-order-item">
      <p className="new-name"><a href="/home/cafe">Café</a></p>
    </div>
  </div>
</div>
  <div className="other-data">
    <div className="data-item">
      <p className="name"><a href="/home/listar/muestra">Muestras</a></p>
    </div>
  </div>
  <div className="other-data">
    <div className="data-item">
      <p className="name"><a href="/home/analisis">Análisis</a></p>
    </div>
  </div>
  <div className="double-width-container">
    <div className="analytics-item">
      <p className="name"><a href="/home/resultado">Resultado</a></p>
    </div>
  </div>
  <div className="additional-container">
  <div className="new-order-container2">
    <div className="new-order-item">
      <p className="new-name"><a href="/home/grafica">Grafica</a></p>

    </div>
  </div>
  <div className="new-order-container2">
    <div className="new-order-item">
      <p className="new-name"><a href="/home/variedad">Variedad</a></p>
    </div>
  </div>
  </div>
</div>


  );
}

export default maquetado;