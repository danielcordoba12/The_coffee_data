
import { Route, Routes } from 'react-router-dom'
import Muestra from './components/Resultados'
import Dashboard from './components/dashboard'
import Finca from './components/fincas'
import LoginForm from './components/login'
import Resultado from './components/Resultados'
import Lote from './components/Lotes'
import Cafe from './components/cafe'
import Municipio from './components/Municipio'
import Variedad from './components/variedad'
import ListarMuestra from './components/ListarMuestra'
import ModalMuestra from './components/ModalMuestra'
import EditarMestra from './components/EditarMuestra'
import Registrarusuarios from './components/usuariosRegistrar'
import EditarUsuario from './components/editarusuario'
import ListarUsuarios from './components/listarusuario'
import RegistrarAnalisis from './components/Analisiss'
import ListarAnalisis from './components/ListarAnalisis'
import EditarAnalisis from './components/EditarAnalisis'
import Grafica from './components/Grafica'







function App(){
  return(
    <>
      <Routes>
      <Route path='/' element={<Dashboard/>}>
        <Route path='/resultado' element={<Resultado/>}/>
        <Route path='/finca/listar' element={<Finca/>}/>
        <Route path='/finca' element={<Finca/>}/>
        <Route path='/lote' element={<Lote/>}/>
        <Route path='/analisis/registrar' element={<RegistrarAnalisis/>}/>
        <Route path='/analisis/update/:id' element={<EditarAnalisis/>}/>
        <Route path='/analisis/listar' element={<ListarAnalisis/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
        <Route path='/usuario'  element={<Registrarusuarios/>}/>
        <Route path='/usuario/listar' element={<ListarUsuarios/>}/>
        <Route path='/usuario/actualizar/:id' element={<EditarUsuario/>}/>
        <Route path='/municipio' element={<Municipio/>}/>
        <Route path='/variedad' element={<Variedad/>}/>
        <Route path='/cafe' element={<Cafe/>}/>
        <Route path='/listar/muestra' element={<ListarMuestra/>}/>
        {/* <Route path='/ModalMuestra/:id' element={<ModalMuestra/>}/> */}
        <Route path='/editar/muestra/:id' element={<EditarMestra/>}/>
        <Route path='/grafica' element={<Grafica/>}/>


        </Route>


      </Routes>
    </>
  )
}

export default App 
