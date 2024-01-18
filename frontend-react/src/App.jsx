
import { Route, Routes } from 'react-router-dom'
import Muestra from './components/Resultados'
import Dashboard from './components/dashboard'
import Finca from './components/fincas'
import Registrar from './components/fincaRegistrar'
import LoginForm from './components/login'
import Resultado from './components/Resultados'
import Listarlote from './components/lotelistar'
import Registrarlote from './components/loteRegistrar'
import EditarFinca from './components/EditarFinca'
import ListarMuestra from './components/ListarMuestra'
import ModalMuestra from './components/ModalMuestra'
import EditarMestra from './components/EditarMuestra'
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


import carrusel from './components/RegistrarMuestra'


function App(){
  return(
    <>
      <Routes>
      <Route path='/' element={<Dashboard/>}>
        <Route path='/Resultado' element={<Muestra/>}/>
        <Route path='/resultado/guardar' element={<Resultado/>}/>
        <Route path='/finca/listar' element={<Finca/>}/>
        <Route path='/finca/registrar' element={<Registrar/>}/>
        <Route path='/finca/editar/:id' element={<EditarFinca/>}/>
        <Route path='/lote/listar' element={<Listarlote/>}/>
        <Route path='/lote/registrar' element={<Registrarlote/>}/>
        <Route path='/analisis/registrar' element={<RegistrarAnalisis/>}/>
        <Route path='/analisis/update/:id' element={<EditarAnalisis/>}/>
        <Route path='/analisis/listar' element={<ListarAnalisis/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
        <Route path='/usuario'  element={<Registrarusuarios/>}/>
        <Route path='/usuario/listar' element={<ListarUsuarios/>}/>
        <Route path='/usuario/actualizar/:id' element={<EditarUsuario/>}/>
        <Route path='/municipio/listar' element={<ListarMunicipio/>}/>
        <Route path='/municipio/registrar' element={<RegistrarMunicipio/>}/>
        <Route path='/municipio/editar/:id' element={<Editarmunicipio/>}/>
        <Route path='/variedad/listar' element={<ListarVariedad/>}/>
        <Route path='/variedad/registrar' element={<Registrarvariedad/>}/>
        <Route path='/variedad/editar/:id' element={<Editarvariedad/>}/>
        <Route path='/cafe/listar' element={<Listarcafe/>}/>
        <Route path='/cafe/editar/:id' element={<Editarcafe/>}/>
        <Route path='/cafe/registrar' element={<RegistrarCafe/>}/>
        <Route path='/carrusel' element={<carrusel/>}/>
        <Route path='/listar/muestra' element={<ListarMuestra/>}/>
        <Route path='/ModalMuestra/:id' element={<ModalMuestra/>}/>
        <Route path='/editar/muestra/:id' element={<EditarMestra/>}/>


        </Route>


      </Routes>
    </>
  )
}

export default App 
