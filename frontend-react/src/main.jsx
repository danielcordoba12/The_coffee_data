import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from "./main/Main.jsx"
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
)
