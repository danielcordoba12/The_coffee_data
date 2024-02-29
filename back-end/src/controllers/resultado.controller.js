import {pool} from '../database/conexion.js';
import { validationResult } from 'express-validator';

export const guardarResultado = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        // let data = req.body;
        let data = req.body.datosConAnalisisId;
        console.log('data', data);

        // let sql = 'INSERT INTO resultados(valor, analisis_id, variables_id, fecha_creacion) VALUES (?, ?, ?, ?)';
        // const [rows] = await pool.query(sql, [data.valor, data.analisis_id, data.variables_id, data.fecha]);

        let resultadoExitoso = true; // Variable para verificar si al menos un resultado fue exitoso

        for (const dato of data) {
            const sql = 'INSERT INTO resultados(valor, analisis_id, variables_id, fecha_creacion) VALUES (?, ?, ?, ?)';
            const [rows] = await pool.query(sql, [dato.valor, dato.analisis_id, dato.variables_id, dato.fecha]);
    
        if (rows.affectedRows <= 0) {
            // Si no se registró un resultado, establece resultadoExitoso a false
            resultadoExitoso = false;
            break; // Puedes salir del bucle, ya que no tiene sentido seguir si falló una inserción
            }
        }

        // if (rows.affectedRows > 0) {
        if (resultadoExitoso) {
            res.status(200).json({
                "status": 200,
                "message": "Registro de resultado exitoso..!"
            });
        } else {
            res.status(400).json({
                "status": 401,
                "message": "No se registró el resultado"
            });
        }
    } catch (error) {
    console.log(datos)

        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor" + error
        });
    }
};


export const buscarResultado = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query(`SELECT r.id,r.valor, t.id AS Analisis, v.nombre AS variable,r.fecha_creacion FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id join analisis as t on r.analisis_id = t.id WHERE analisis_id =  ${id} ORDER BY r.fecha_creacion;`);


    //     const [result] = await pool.query(`    
    
    //     SELECT 
    //     r.analisis_id,
    //     r.variables_id,
    //     r.id,
    //     r.valor
    // FROM resultados r
    // WHERE r.analisis_id = ${id}
    // ORDER BY r.analisis_id, r.variables_id, r.id;
    
    // `);

    
//     const [result] = await pool.query(`    

//     SELECT 
//     Analisis,
//     GROUP_CONCAT(variables_id) AS variables_id,
//     GROUP_CONCAT(valores) AS valores,
//     GROUP_CONCAT(variables) AS variables,
//     GROUP_CONCAT(fecha_creacion) AS fechas_creacion
// FROM (
//     SELECT 
//         r1.analisis_id AS Analisis,
//         r1.variables_id,
//         r1.valor AS valores,
//         v.nombre AS variables,
//         r1.fecha_creacion AS fecha_creacion,
//         ROW_NUMBER() OVER(PARTITION BY r1.analisis_id ORDER BY r1.fecha_creacion) AS row_num
//     FROM 
//         resultados AS r1 
//     JOIN 
//         variables AS v ON r1.variables_id = v.id 
//     WHERE 
//         r1.analisis_id = 1  -- Reemplaza "1" con el valor de r1.analisis_id que deseas filtrar
// ) AS subquery
// WHERE 
//     row_num <= 25
// GROUP BY 
//     Analisis;

// `);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: "Error en listar resultado:" + err
        });
    } 
};


export const listarResultados = async (req, res) => {
    try {
        // const [result] = await pool.query("SELECT r.id,r.valor, r.analisis_id as analisis, v.nombre AS variable,r.fecha_creacion FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id join tipos_analisis as t on r.analisis_id = t.id;");
        // const [result] = await pool.query("SELECT r.analisis_id, MAX(r.id) as id, MAX(r.valor) as valor, MAX(r.fecha_creacion) as fecha_creacion, v.nombre AS variable FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id JOIN analisis as t ON r.analisis_id = t.id GROUP BY r.analisis_id;");
        // const [result] = await pool.query("SELECT r.analisis_id, MAX(r.id) as id, MAX(r.valor) as valor, MAX(r.fecha_creacion) as fecha_creacion, v.nombre AS variable FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id JOIN analisis as t ON r.analisis_id = t.id GROUP BY r.fecha_creacion;");


        const [result] = await pool.query("SELECT r.analisis_id, MAX(r.id) as id, MAX(r.valor) as valor, MAX(r.fecha_creacion) as fecha_creacion,m.consecutivo_informe AS muestra, v.nombre AS variable, u.nombre AS usuario,f.nombre AS finca, l.nombre AS lote , ta.nombre AS tipo_analisis FROM resultados AS r JOIN variables AS v ON r.variables_id  = v.id  JOIN analisis as t ON r.analisis_id = t.id JOIN muestras as m ON t.muestras_id = m.id  JOIN cafes AS c ON m.cafes_id = c.id JOIN lotes AS l ON c.lotes_id = l.id  JOIN  fincas AS f ON l.fincas_id = f.id JOIN usuarios AS u ON f.usuarios_id = u.id JOIN tipos_analisis AS ta ON t.tipo_analisis_id = ta.id  GROUP BY r.fecha_creacion ORDER BY id;");
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: 'Error en listar resultados de la base de datos:' + err
        });
    }
};


export const eliminarResultado = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM resultados WHERE id = ?`;

        const [rows] = await pool.query(sql, [id]);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El resultado se eliminó con éxito"
            });
        } else {
            res.status(400).json({
                "status": 401,
                "message": "El resultado no fue eliminado"
            });
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor" + e
        });
    }
};


// export const actualizarResultado = async (req, res) => {
//     try {
//         // let error1 = validationResult(req);
//         // if (!error1.isEmpty()){
//         //     return res.status(400).json(error1);
//         // }
//         let id = req.params.id;
//         let { valor, analisis_id, variables_id, fecha_creacion } = req.body;

//         let sql = `UPDATE resultados SET valor = ?, analisis_id = ?, variables_id = ?, fecha_creacion = ? WHERE id = ?`;

//         const [rows] = await pool.query(sql, [valor, analisis_id, variables_id, fecha_creacion, id]);

//         if (rows.affectedRows > 0) {
//             res.status(200).json({
//                 "status": 200,
//                 "message": "¡Registro de Resultado actualizado..!"
//             });
//         } else {
//             res.status(400).json({
//                 "status": 400,
//                 "message": "¡El resultado no fue actualizado"
//             });
//         }
//     } catch (e) {
//         res.status(500).json({
//             "status": 500,
//             "message": "Error en el servidor..! " + e
//         });
//     }


// };
export const actualizarResultado = async (req, res) => {
    try {
    const datosActualizados = req.body.datosActualizados;

    // await pool.beginTransaction();

    for (const dato of datosActualizados) {
        const sql = 'UPDATE resultados SET valor = ? WHERE id = ?';
        await pool.query(sql, [dato.valor, dato.id]);
    }

    // await pool.commit();

    res.status(200).json({
        status: 200,
        message: 'Actualización de resultados exitosa..!',
    });
    } catch (error) {
    // await pool.rollback();

    res.status(500).json({
        status: 500,
        message: 'Error en el servidor' + error,
        });
    }
};

