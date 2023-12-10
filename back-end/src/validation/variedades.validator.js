import { check } from "express-validator";

export const validatorVariedades = [
  check('fecha_creacion')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('nombre')
    .notEmpty().withMessage('Este campo no puede ir vacío')
];
