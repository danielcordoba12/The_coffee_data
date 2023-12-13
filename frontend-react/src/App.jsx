import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Muestra from './components/Resultados'
import Dashboard from './components/dashboard'
import Finca from './components/fincas'
import Registrar from './components/fincaRegistrar'
import Analisiss from './components/Analisiss'
import LoginForm from './components/login'
import GuardarResultado from './components/registrarResultados'
import Listarlote from './components/lotelistar'
import Registrarlote from './components/loteRegistrar'
import EditarLote from './components/editarlote'
import EditarFinca from './components/EditarFinca'
import Usuario from './components/usuariosRegistrar'
import EditarUsuario from './components/editarusuario'
import ListarUsuarios from './components/listarusuario'


function App(){
  return(
    <>
      <Routes>
      <Route path='/dasboard' element={<Dashboard/>}/>
        <Route path='/Resultado' element={<Muestra/>}/>
        <Route path='/resultado/guardar' element={<GuardarResultado/>}/>
        <Route path='/finca/listar' element={<Finca/>}/>
        <Route path='/finca/registrar' element={<Registrar/>}/>
        <Route path='/finca/editar/:id' element={<EditarFinca/>}/>
        <Route path='/lote/listar' element={<Listarlote/>}/>
        <Route path='/lote/registrar' element={<Registrarlote/>}/>
        <Route path='/lote/editar/:id' element={<EditarLote/>}/>
        <Route path='/Analisis' element={<Analisiss/>}/>
        <Route path='/'  element={<LoginForm/>}/>
        <Route path='/Usuario'  element={<Usuario/>}/>
        <Route path='/Usuario/listar' element={<ListarUsuarios/>}/>
        <Route path='/Usuario/actualizar' element={<EditarUsuario/>}/>
      </Routes>
    </>
  )
}

export default App
