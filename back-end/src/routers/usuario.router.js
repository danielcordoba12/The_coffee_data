
import {Router} from "express";

import {guardarUsuario,listarUsuario,ActivarUsuario,desactivarUsuario,CambioPerfilUsuario,buscarUsuarios,actualizarUsuario,listarcatadores} from "../controllers/usuarios.controller.js";
import { validatorUsuario } from "../validation/usuario.validator.js";
import { validartoken } from "../controllers/autenticacion.controller.js";


const usuarioRoute = Router();

usuarioRoute.post("/registrar",guardarUsuario);
usuarioRoute.get("/listarusuario",listarUsuario);
usuarioRoute.get("/buscarusuario/:id",buscarUsuarios);
usuarioRoute.patch("/activar/:id",ActivarUsuario); 
usuarioRoute.patch("/desactivar/:id",desactivarUsuario);
usuarioRoute.put("/actualizar/:id",actualizarUsuario); 
usuarioRoute.put("/cambio/:id",CambioPerfilUsuario);
usuarioRoute.get("/listar/catador",listarcatadores);







export default usuarioRoute;