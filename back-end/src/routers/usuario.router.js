
import {Router} from "express";

import {guardarUsuario,listarUsuario,ActivarUsuario,desactivarUsuario,buscarUsuarios,actualizarUsuario} from "../controllers/usuarios.controller.js";
import { validatorUsuario } from "../validation/usuario.validator.js";
import { validartoken } from "../controllers/autenticacion.controller.js";


const usuarioRoute = Router();

usuarioRoute.post("/registrar",validatorUsuario,guardarUsuario);
usuarioRoute.get("/listarusuario",listarUsuario);
usuarioRoute.get("/buscarusuario/:id",buscarUsuarios);
usuarioRoute.patch("/activar/:id",validartoken,ActivarUsuario); 
usuarioRoute.patch("/desactivar/:id",validartoken,desactivarUsuario);
usuarioRoute.put("/actualizar/:id",validatorUsuario,actualizarUsuario);







export default usuarioRoute;