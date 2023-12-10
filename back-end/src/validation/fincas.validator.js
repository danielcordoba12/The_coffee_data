import { check } from "express-validator";

export const validarFinca = [
  check('fecha_creacion')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('nombre')
    .notEmpty().withMessage('Esta casilla no puede estar vacía'),

  check('longitud')
    .notEmpty().withMessage('Esta casilla no puede estar vacía'),

  check('latitud')
    .notEmpty().withMessage('Esta casilla no puede estar vacía'),

  check('usuarios_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0'),

  check('municipios_id')
    .notEmpty().withMessage('Ingrese un ID válido')
    .isNumeric().withMessage('Ingrese un ID válido')
    .custom(value => value > 0).withMessage('Ingrese un ID válido mayor a 0'),

  check('noombre_vereda')
    .notEmpty().withMessage('Esta casilla no puede estar vacía')
];