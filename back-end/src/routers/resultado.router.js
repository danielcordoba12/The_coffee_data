import { Router } from "express";

import { guardarResultado, buscarResultado,listarResultados,eliminarResultado,actualizarResultado,promedioResultado } from "../controllers/resultado.controller.js";
import { validarResultado } from "../validation/resultado.validator.js";
import { validartoken } from "../controllers/autenticacion.controller.js";

const resultadoRoute = Router();


resultadoRoute.post("/registrar",guardarResultado);
resultadoRoute.get("/listar",validartoken,listarResultados);
resultadoRoute.get("/buscar/:id",buscarResultado);
resultadoRoute.put("/update/:id",actualizarResultado);
resultadoRoute.delete("/delete/:id",eliminarResultado);
resultadoRoute.get("/promedio/:id",promedioResultado);






export default resultadoRoute;   