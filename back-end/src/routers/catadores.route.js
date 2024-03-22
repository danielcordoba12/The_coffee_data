import {Router} from "express";

import { guardarCatador,listar, buscarCatador,desactivarCatadores, activarCatadores    } from "../controllers/catadores.controller.js";

const catadorRoute = Router();

catadorRoute.get ("/listar",listar);
catadorRoute.get ("/buscar/:id",buscarCatador);
catadorRoute.post ("/guardar",guardarCatador);
catadorRoute.patch('/desactivar/analisis/:id/catador/:id2', desactivarCatadores);
catadorRoute.patch('/activar/analisis/:id/catador/:id2', activarCatadores);


export default catadorRoute