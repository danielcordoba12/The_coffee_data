import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Muestra from './components/Resultados'
import Dashboard from './components/dashboard'
import Finca from './components/fincas'
import Registrar from './components/fincaRegistrar'
import LoginForm from './components/login'
import GuardarResultado from './components/registrarResultados'
import Listarlote from './components/lotelistar'
import Registrarlote from './components/loteRegistrar'
import EditarLote from './components/editarlote'
import EditarFinca from './components/EditarFinca'
import Registrarusuarios from './components/usuariosRegistrar'
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
import RegistrarAnalisis from './components/Analisiss'
import ListarAnalisis from './components/ListarAnalisis'
import EditarAnalisis from './components/EditarAnalisis'



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
        <Route path='/analisis/registrar' element={<RegistrarAnalisis/>}/>
        <Route path='/analisis/update/:id' element={<EditarAnalisis/>}/>
        <Route path='/analisis/listar' element={<ListarAnalisis/>}/>
        <Route path='/'  element={<LoginForm/>}/>
        <Route path='/usuario'  element={<Registrarusuarios/>}/>
        <Route path='/usuario/listar' element={<ListarUsuarios/>}/>
        <Route path='/usuario/actualizar/:id' element={<EditarUsuario/>}/>
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
