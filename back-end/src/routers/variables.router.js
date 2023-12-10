import { Router } from "express";

import { guardarVariable } from "../controllers/variables.controller.js";

const variablesRoute = Router()

variablesRoute.post('/registrar',guardarVariable);

export default variablesRoute