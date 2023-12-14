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
import RegistrarMuestra from './components/RegistrarMuestra'
import ListarMuestra from './components/ListarMuestra'
import ModalMuestra from './components/ModalMuestra'
import EditarMestra from './components/EditarMuestra'


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
        <Route path='/loginfrom'  element={<LoginForm/>}/>
        <Route path='/registrar/muestra'  element={<RegistrarMuestra/>}/>
        <Route path='/listar/muestra'  element={<ListarMuestra/>}/>
        <Route path='/ModalMuestra/:id'  element={<ModalMuestra/>}/>
        <Route path='/editar/muestra/:id'  element={<EditarMestra/>}/>


      </Routes>
    </>
  )
}

export default App
