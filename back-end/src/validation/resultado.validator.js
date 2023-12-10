import { check } from "express-validator";

export const validarResultado = [
  check('valor')
    .isInt().withMessage('Verifique que el valor sea un número entero')
    .custom(value => value > 0).withMessage('Verifique que el valor sea mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('analisis_id')
    .isNumeric().withMessage('Ingrese un ID válido, mayor a 0')
    .custom(value => value > 0).withMessage('Ingrese un ID válido, mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('variables_id')
    .isNumeric().withMessage('Ingrese un ID válido, mayor a 0')
    .custom(value => value > 0).withMessage('Ingrese un ID válido, mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('fecha')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .notEmpty().withMessage('Este campo no puede estar vacío'),
];
