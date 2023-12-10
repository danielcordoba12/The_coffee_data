import { check } from "express-validator";

export const validarAnalisis = [
  check('fecha_analisis')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('calidad')
    .notEmpty().withMessage('Ingrese una calidad válida')
    .matches(/^(bueno|muy bueno|excelente|extraordinario)$/).withMessage('Ingrese una calidad válida: bueno, muy bueno, excelente o extraordinario'),


  check('tipo_analisis_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0'),

  check('muestras_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0'),

  check('usuarios_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0')
];