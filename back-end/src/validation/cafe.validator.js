import { check } from "express-validator";

export const validarCafe = [
  check('lotes_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0'),

  check('variedades_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0')
];