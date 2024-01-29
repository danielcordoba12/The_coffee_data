
import { Route, Routes } from 'react-router-dom'
import Muestra from './components/Resultados'
import Dashboard from './components/dashboard'
import Finca from './components/fincas'
import LoginForm from './components/login'
import Resultado from './components/Resultados'
import Lote from './components/Lotes'
import Cafe from './components/cafe'
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
        <Route path='/finca' element={<Finca/>}/>
        <Route path='/lote' element={<Lote/>}/>
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
        <Route path='/cafe' element={<Cafe/>}/>
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
