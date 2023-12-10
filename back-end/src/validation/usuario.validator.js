import { check } from "express-validator";

export const validatorUsuario = [
  check('nombre')
    .notEmpty().withMessage('Ingrese un nombre con mínimo 4 caracteres y máximo 10')
    .isLength({ min: 10, max: 50 }),

  check('apellido')
    .notEmpty().withMessage('Ingrese un apellido con mínimo 4 caracteres y máximo 10')
    .isLength({ min: 4, max: 30 }),

  check('documento')
    .notEmpty().withMessage('Ingrese un documento')
    .isNumeric().withMessage('El documento debe ser numérico')
    .isLength({ max: 10 }).withMessage('Ingrese un documento con máximo 10 dígitos'),

  check('telefono')
    .notEmpty().withMessage('Ingrese un teléfono')
    .isNumeric().withMessage('El teléfono debe ser numérico')
    .isLength({ min: 10, max: 15 }).withMessage('Ingrese un teléfono con mínimo 10 dígitos y máximo 15'),

  check('correo')
    .notEmpty().withMessage('Ingrese un correo electrónico')
    .isEmail().withMessage('Ingrese un correo electrónico válido'),

  check('contraseña')
    .notEmpty().withMessage('Ingrese una contraseña')
    .isLength({ min: 5, max: 15 }).withMessage('Ingrese una contraseña con mínimo 5 caracteres y máximo 15'),

  check('tipo_identificacion')
    .notEmpty().withMessage('Ingrese un tipo de identificación')
    .matches(/^(tarjeta de identidad|cedula de ciudadania)$/).withMessage('Ingrese un tipo de identificación válido: tarjeta de identidad o cedula de ciudadania'),

  check('rol')
    .notEmpty().withMessage('Ingrese un tipo de rol')
    .matches(/^(catador|cafetero|administrador)$/).withMessage('Ingrese un tipo de rol válido: catador, cafetero o administrador'),

  check('cargo')
    .notEmpty().withMessage('Ingrese un cargo')
    .matches(/^(instructor|aprendiz|cliente|administrador)$/).withMessage('Ingrese un cargo válido: instructor, aprendiz, cliente o administrador')
];