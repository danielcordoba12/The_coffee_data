import { Router } from "express";
import { buscarmunicipio, listarmunicipio, guardarmunicipio,actualizarmunicipio } from "../controllers/municipio.controller.js";
import { validarMunicipios } from "../validation/municipio.validation.js";
import { validartoken } from "../controllers/autenticacion.controller.js";

const municipioRoute= Router();

municipioRoute.get('/listar',listarmunicipio);

municipioRoute.get('/buscar/:id',buscarmunicipio);

municipioRoute.post('/registrar',validarMunicipios,guardarmunicipio);


municipioRoute.put('/Actualizar/:id',validarMunicipios,actualizarmunicipio);

export default  municipioRoute;