import {check} from 'express-validator';

export const validarusuario=
[
    check('correo','El correo es requerido..').isEmail(),
    check('nombres','El nombre es requerido..').isLength({max:50}).notEmpty(),
    check('rol','el rol es requerido..').isIn(['administrador','usuario'])
];


