import { Router } from "express";
import { buscarlote, listarlote, guardarlote, actualizarlote, desactivarlote, Activarlote,listarPorFinca } from "../controllers/lote.controller.js";
import { validartoken } from "../controllers/autenticacion.controller.js";
// import {validatorUser} from '../validator/usuario.js';
import { validarLote } from "../validation/lote.validator.js";

const loteRoute= Router();

loteRoute.get('/listar',validartoken,listarlote);

loteRoute.get('/buscar/:id',buscarlote);

loteRoute.post('/registrar',guardarlote);

loteRoute.put('/Actualizar/:id',actualizarlote);

loteRoute.patch('/Desactivar/:id',desactivarlote);

loteRoute.patch('/activar/:id',Activarlote);

loteRoute.get('/listarPorFinca/:id',listarPorFinca);



export default  loteRoute;