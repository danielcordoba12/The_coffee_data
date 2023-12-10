
import { Router } from 'express';
// import {validarusuario} from '../validation/usuario.js';
import {validarusuario} from '../controllers/autenticacion.controller.js';

const autRoute= Router();

autRoute.post('/validar',validarusuario);
// validarusuario
export default autRoute;
