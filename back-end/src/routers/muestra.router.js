import {Router} from "express";
import { check } from "express-validator";
import { guardarMuestra,actualizarMuestra,buscarMuestra,listarMuestras,desactivarMuestra,activarMuestra } from "../controllers/muestras.controller.js";
import {validarMuestra} from "../validation/muestras.validator.js";
import { validartoken } from "../controllers/autenticacion.controller.js";

const muestraRoute = Router()

muestraRoute.post("/registrar",guardarMuestra);
muestraRoute.put("/actualizar/:id",actualizarMuestra);
muestraRoute.get("/buscar/:id",buscarMuestra);
muestraRoute.get("/listar",validartoken,listarMuestras);
muestraRoute.patch("/desactivar/:id",desactivarMuestra);
muestraRoute.patch("/activar/:id",activarMuestra);


export default muestraRoute;