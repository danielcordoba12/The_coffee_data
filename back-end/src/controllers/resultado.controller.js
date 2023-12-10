import {pool} from '../database/conexion.js';
import { validationResult } from 'express-validator';

export const guardarResultado = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let data = req.body;
        console.log('data', data);

        let sql = 'INSERT INTO resultados(valor, analisis_id, variables_id, fecha_creacion) VALUES (?, ?, ?, ?)';
        const [rows] = await pool.query(sql, [data.valor, data.analisis_id, data.variables_id, data.fecha]);
        
        if (rows.affectedRows > 0) {
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
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor" + error
        });
    }
};


export const buscarResultado = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query("SELECT r.valor, t.nombre AS Analisis, v.nombre AS variable,r.fecha_creacion FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id join tipos_analisis as t on r.analisis_id = t.id WHERE analisis_id = ?", [id]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: "Error en listar resultado:" + err
        });
    }
};


export const listarResultados = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT r.valor, r.analisis_id as analisis, v.nombre AS variable,r.fecha_creacion FROM resultados AS r JOIN variables AS v ON r.variables_id = v.id join tipos_analisis as t on r.analisis_id = t.id;");
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


export const actualizarResultado = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let id = req.params.id;
        let { valor, analisis_id, variables_id, fecha_creacion } = req.body;

        let sql = `UPDATE resultados SET valor = ?, analisis_id = ?, variables_id = ?, fecha_creacion = ? WHERE id = ?`;

        const [rows] = await pool.query(sql, [valor, analisis_id, variables_id, fecha_creacion, id]);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "¡Registro de Resultado actualizado..!"
            });
        } else {
            res.status(400).json({
                "status": 400,
                "message": "¡El resultado no fue actualizado"
            });
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor..! " + e
        });
    }
};
