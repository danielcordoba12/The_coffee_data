import { check } from 'express-validator';

export const validarMuestra = [
  check('fecha_creacion')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('codigo_externo')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('consecutivo_informe')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('muestreo')
    .notEmpty().withMessage('Ingrese un tipo de muestreo válido'),

  check('preparacion_muestra')
    .notEmpty().withMessage('Ingrese un tipo de preparación válido'),

  check('cantidad')
    .isInt().withMessage('La muestra debe ser un número entero')
    .custom(value => value > 50).withMessage('Verifique que la muestra sea mayor a 50')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('tipo_molienda')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('tipo_fermentacion')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('densidad_cafe_verde')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('fecha_procesamiento')
    .notEmpty().withMessage('Ingrese una fecha válida en el formato año-mes-dia')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Ingrese una fecha válida en el formato año-mes-dia'),

  check('tipo_tostion')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('tiempo_fermentacion')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('codigo_muestra')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('actividad_agua')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('tiempo_secado')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('presentacion')
    .notEmpty().withMessage('Este campo no puede estar vacío'),

  check('cafes_id')
    .isNumeric().withMessage('Ingrese un ID válido, mayor a 0')
    .custom(value => value > 0).withMessage('Ingrese un ID válido, mayor a 0')
    .notEmpty().withMessage('Este campo no puede estar vacío')
];
