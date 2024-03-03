import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/dashboard';
import Resultado from './components/Resultados';
import Finca from './components/fincas';
import Lote from './components/Lotes';
import Analisis from './components/Analisiss';
import Registrarusuarios from './components/usuariosRegistrar';
import EditarUsuario from './components/editarusuario';
import ListarUsuarios from './components/listarusuario';
import Municipio from './components/Municipio';
import Variedad from './components/variedad';
import Cafe from './components/cafe';
import ListarMuestra from './components/ListarMuestra';
import EditarMestra from './components/EditarMuestra';
import Grafica from './components/Grafica';
import Inicio from './components/login/Inicio';
import Maquetado from './components/maquetado';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      {/* <Route /> */}
      <Route path="/home" element={<Dashboard />} >
        <Route path="resultado" element={<Resultado />} />
        <Route path="finca" element={<Finca />} />
        <Route path="lote" element={<Lote />} />
        <Route path="analisis" element={<Analisis />} />
        <Route path="usuario" element={<Registrarusuarios />} />
        <Route path="usuario/listar" element={<ListarUsuarios />} />
        <Route path="usuario/actualizar/:id" element={<EditarUsuario />} />
        <Route path="municipio" element={<Municipio />} />
        <Route path="variedad" element={<Variedad />} />
        <Route path="cafe" element={<Cafe/>} />
        <Route path="listar/muestra" element={<ListarMuestra />} />
        <Route path="editar/muestra/:id" element={<EditarMestra />} />
        <Route path="grafica" element={<Grafica />} />
        <Route path="/home" element={<Maquetado />} />


        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

// Componente para manejar rutas no encontradas
function NotFound() {
  return <h1>404 - Página no encontrada</h1>;
}

export default App;
