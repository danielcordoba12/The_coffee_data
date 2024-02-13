import { Router } from "express";

import { guardarAnalisis,actualizarAnalisis,listarAnalisis,buscaranalisis,desactivarAnalisis,activarAnalisis,listarPropietario} from "../controllers/analisis.controller.js";
import { validartoken } from "../controllers/autenticacion.controller.js";
import { validarAnalisis } from "../validation/analisis.validator.js";
const analisisRoute = Router();


analisisRoute.post("/registrar",guardarAnalisis);
analisisRoute.get("/listar", listarAnalisis);
// analisisRoute.get("/listarp", listarPropietario);
analisisRoute.get("/buscar/:id",buscaranalisis);
analisisRoute.put("/update/:id",actualizarAnalisis);
analisisRoute.patch("/desactivar/:id",desactivarAnalisis);
analisisRoute.patch("/activar/:id",activarAnalisis);


export default analisisRoute;   