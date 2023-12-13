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
import ListarMunicipio from './components/municipiolistar'
import RegistrarMunicipio from './components/municipioregistrar'
import Editarmunicipio from './components/municipioeditar'
import ListarVariedad from './components/variedadlistar'
import Registrarvariedad from './components/variedadregistrar'
import Editarvariedad from './components/variedadeseditar'
import Listarcafe from './components/cafelistar'
import RegistrarCafe from './components/caferegistrar'
import Editarcafe from './components/cafeeditar'



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
        <Route path='/municipio/listar' element={<ListarMunicipio/>}/>
        <Route path='/municipio/registrar' element={<RegistrarMunicipio/>}/>
        <Route path='/municipio/editar/:id' element={<Editarmunicipio/>}/>
        <Route path='/variedad/listar' element={<ListarVariedad/>}/>
        <Route path='/variedad/registrar' element={<Registrarvariedad/>}/>
        <Route path='/variedad/editar/:id' element={<Editarvariedad/>}/>
        <Route path='/cafe/listar' element={<Listarcafe/>}/>
        <Route path='/cafe/registrar' element={<RegistrarCafe/>}/>
        <Route path='/cafe/editar/:id' element={<Editarcafe/>}/>


        <Route path='/Usuario/actualizar' element={<EditarUsuario/>}/>
      </Routes>
    </>
  )
}

export default App
