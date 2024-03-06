import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import "../style/maquetado.css";

const maquetado = () => {
  return (
    <div className="contenedor-principal">
  <div className="analytics-container">
    <div className="analytics-item">
      <p className="name">Analytics</p>
      <p className="value">201</p>
      <p className="description">Orders</p>
    </div>
  </div>
  <div className="order-container">
    <div className="order-item">
      <p className="name">Approved</p>
      <p className="value">36</p>
    </div>
  </div>
  <div className="additional-container">
  <div className="new-order-container">
    <div className="new-order-item">
      <p className="new-name">Approved</p>
      <p className="new-value">36</p>
    </div>
  </div>
  <div className="new-order-container">
    <div className="new-order-item">
      <p className="new-name">Users</p>
      <p className="new-value">36,394949</p>
    </div>
  </div>
</div>
  <div className="other-data">
    <div className="data-item">
      <p className="name">Month total</p>
      <p className="value">25,410</p>
    </div>
  </div>
  <div className="other-data">
    <div className="data-item">
      <p className="name">Car</p>
      <p className="value">Customer order</p>
    </div>
  </div>
  <div className="double-width-container">
    <div className="analytics-item">
      <p className="name">Analytics</p>
      <p className="value">201</p>
      <p className="description">Orders</p>
    </div>
  </div>
  <div className="additional-container">
  <div className="new-order-container2">
    <div className="new-order-item">
      <p className="new-name">Approved</p>
      <p className="new-value">36</p>
    </div>
  </div>
  <div className="new-order-container2">
    <div className="new-order-item">
      <p className="new-name">Users</p>
      <p className="new-value">36,394949</p>
    </div>
  </div>
  </div>
</div>


  );
}

export default maquetado;