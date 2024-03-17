import {Router} from "express";

import { guardarCatador,listar } from "../controllers/catadores.controller.js";

const catadorRoute = Router();

catadorRoute.get ("/listar",listar);
catadorRoute.post ("/guardar",guardarCatador);


export default catadorRoute