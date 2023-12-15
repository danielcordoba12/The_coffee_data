import{Router} from 'express';
import { check } from 'express-validator';

import{buscarCafe,guardarCafe,actualizarCafe,estadoCafe,listarcafe,ActivarCafe} from '../controllers/cafe.controller.js';
import { validarCafe } from '../validation/cafe.validator.js';
import { validartoken } from "../controllers/autenticacion.controller.js";

const cafeRoute= Router();

cafeRoute.get('/listar',listarcafe);
cafeRoute.get('/buscar/:id',buscarCafe);
cafeRoute.post('/registrar',guardarCafe);
cafeRoute.put('/actualizar/:id',actualizarCafe);
cafeRoute.patch('/desactivar/:id',estadoCafe);
cafeRoute.patch('/activar/:id',ActivarCafe);



export default cafeRoute;
