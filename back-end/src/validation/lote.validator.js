import { check } from "express-validator";

export const validarLote = [
  check('fecha_creacion')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-día')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-día'),

  check('nombre')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('longitud')
    .notEmpty().withMessage('Esta casilla no puede estar vacía'),

  check('latitud')
    .notEmpty().withMessage('Esta casilla no puede estar vacía'),

  check('fincas_id')
    .isNumeric().withMessage('Ingrese un ID válido, mayor a 0')
    .custom(value => value > 0).withMessage('Ingrese un ID válido, mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío'),
];
