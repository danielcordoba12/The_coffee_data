import {Router} from "express";

import { guardarCatador,listar, buscarCatador,desactivarCatadores    } from "../controllers/catadores.controller.js";

const catadorRoute = Router();

catadorRoute.get ("/listar",listar);
catadorRoute.get ("/buscar/:id",buscarCatador);
catadorRoute.post ("/guardar",guardarCatador);
catadorRoute.patch('/analisis/:id/catadores/:id2', desactivarCatadores);

export default catadorRoute