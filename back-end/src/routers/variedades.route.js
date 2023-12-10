    import{Router} from 'express';
    import { check } from 'express-validator';

    import{guardarVariedad,actualizarVariedad,listarVariedad,buscarvariedad} from '../controllers/variedades.controller.js';
    import { validatorVariedades } from '../validation/variedades.validator.js';
    import { validartoken } from "../controllers/autenticacion.controller.js";
    const variedadesRoute= Router();

   

    variedadesRoute.post('/registrar',validartoken,validatorVariedades,guardarVariedad);
    variedadesRoute.put('/actualizar/:id',validartoken,validatorVariedades,actualizarVariedad);
    variedadesRoute.get('/listar',listarVariedad);
    variedadesRoute.get('/buscar/:id',buscarvariedad);



    export default variedadesRoute;
