import { Router } from 'express';
import { validarusuario, obtenerDatosUsuario } from '../controllers/autenticacion.controller.js';

const autRoute = Router();

// Ruta para validar usuario al iniciar sesión
autRoute.post('/validar', validarusuario);

// Ruta para obtener los datos completos del usuario
autRoute.get('/cambioperfil', obtenerDatosUsuario); // Cambiado a método GET ya que estamos obteniendo datos

export default autRoute;
