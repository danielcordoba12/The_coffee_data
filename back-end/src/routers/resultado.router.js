import { Router } from "express";

import { guardarResultado, buscarResultado,listarResultados,eliminarResultado,actualizarResultado } from "../controllers/resultado.controller.js";
import { validarResultado } from "../validation/resultado.validator.js";
import { validartoken } from "../controllers/autenticacion.controller.js";

const resultadoRoute = Router();


resultadoRoute.post("/registrar",validartoken,validarResultado,guardarResultado);
resultadoRoute.get("/listar",listarResultados);
resultadoRoute.get("/buscar/:id",buscarResultado);
resultadoRoute.put("/update/:id",validartoken,validarResultado,actualizarResultado);
resultadoRoute.delete("/delete/:id",eliminarResultado);





export default resultadoRoute;   