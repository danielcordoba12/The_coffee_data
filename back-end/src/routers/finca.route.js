    import{Router} from 'express';
    import { check } from 'express-validator';

    import{buscarFinca,guardarFinca,actualizarFinca,desactivarFinca,listarFinca,ActivarFinca} from '../controllers/finca.controller.js';
    import { validartoken } from '../controllers/autenticacion.controller.js';
    import { validarFinca } from '../validation/fincas.validator.js';
    const fincaRoute= Router();

    fincaRoute.get('/listar',listarFinca);
    fincaRoute.get('/buscar/:id',buscarFinca);
    fincaRoute.post('/registrar/',validarFinca,guardarFinca);
    fincaRoute.put('/actualizar/:id',validarFinca,actualizarFinca);
    fincaRoute.patch('/desactivar/:id',desactivarFinca);
    fincaRoute.patch('/activar/:id',ActivarFinca);



    export default fincaRoute;
