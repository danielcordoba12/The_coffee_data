import { Router } from "express";

import {guardarTipoanalisis} from "../controllers/tipo_analisis.controller.js";

const tokenRoute = Router();


tokenRoute.post("/registrar",guardarTipoanalisis);





export default tokenRoute;  