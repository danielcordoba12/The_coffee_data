import { check } from "express-validator";

export const validarMunicipios = [
  check('nombre')
    .notEmpty().withMessage('Este campo no debe estar vacío'),

  check('fecha_creacion')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('departamentos_id')
    .isNumeric().withMessage('Ingrese un ID válido, mayor a 0')
    .custom(value => value > 0).withMessage('Ingrese un ID válido, mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío')
];
