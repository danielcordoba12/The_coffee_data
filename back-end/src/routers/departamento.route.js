import { Router } from "express";
import { listardepartamento } from "../controllers/departamento.controller.js"


const departamentoRoute= Router();

departamentoRoute.get('/listar',listardepartamento);


export default  departamentoRoute;