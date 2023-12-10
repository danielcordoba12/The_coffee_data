import { Router } from "express";

import {guardartokenUsu} from "../controllers/token_usuario.controller.js";

const tokenRoute = Router();


tokenRoute.post("/registrar",guardartokenUsu);





export default tokenRoute;  