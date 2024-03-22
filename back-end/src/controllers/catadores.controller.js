import { pool } from '../database/conexion.js';


export const guardarCatador = async (req, res) => {
    try {
        // let error1 = validationResult(req);
        // if (!error1.isEmpty()){
        //     return res.status(403).json(error1);
        // }
        let data = req.body;
        // console.log("user",data);

        let sql= 'INSERT INTO usuarios(analisis_id, usuarios_id) VALUES (?,?)'; 
 
        const [rows] = await pool.query(sql, [data.analisis_id, data.usuarios_id]); 
        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El catador se registro con exito"   
            }
            );

        } else {
            res.status(200).json({
                "status": 200,
                "message": "No se registro el catador"
            }
            );
        }  



    } catch (error) {
        res.status(200).json({
            "status": 200,
            "message": "error en en el servidor" + error 
        }
        );
        
    }
};

export const listar= async (req, res) => {

    try {     
        const [result] = await pool.query(`SELECT ca.id, ca.analisis_id, u.nombre AS nombre, u.apellido AS apellidos, ca.estado FROM  catadores ca JOIN usuarios u ON u.id = ca.usuarios_id  `);
        if (result.length > 0) {
            res.status(200).json(result);
            } else {
                res.status(401).json({
                    result : result,
                    status: false,
                    message: "No se encontraron catadores."
            });
    
            }
    } catch (err) {
        res.status(500).json({
            massage: "Error al  listar catadores :" + err
        });
    }
};

export const buscarCatador = async (req, res) => {
    try {
        let id = req.params.id;
        // const [result] = await pool.query("SELECT ca.id, ca.analisis_id, u.nombre AS Catador FROM catadores ca JOIN usuarios u ON u.id = ca.id WHERE ca.analisis_id = " + id);
        const [result] = await pool.query("SELECT ca.id, ca.analisis_id, u.nombre AS nombre, u.apellido AS apellidos, ca.estado FROM  catadores ca JOIN usuarios u ON u.id = ca.usuarios_id  WHERE ca.analisis_id = " + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(200).json({
            massage: "Error en listar usuario: " + err
        });
    }
};

export const desactivarCatadores = async (req, res) => {
    try {
        const id = req.params.id;
        const id2 = req.params.id2;


        await pool.query('UPDATE catadores SET estado = 0 WHERE id  = ?', [id]);

        const [resultCatadores] = await pool.query('SELECT COUNT(*) AS total FROM catadores WHERE analisis_id  = ? AND estado != 0', [id2]);

        if (resultCatadores[0].total === 0) {
            const [resultAnalisis] = await pool.query('UPDATE  analisis SET estado = 0 WHERE id = ?', [id2]);

            if (resultAnalisis.changedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "No se encontró el análisis para desactivar"
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Se desactivó el análisis"
            });
        }


        return res.status(200).json({
            status: 200,
            message: "Se desactivo el catador"
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor: " + error.message
        });
    }
};


export const activarCatadores = async (req, res) => {
    try {
        const id = req.params.id;
        const id2 = req.params.id2;

        // Activar el estado del catador a 1
        await pool.query('UPDATE catadores SET estado = 1 WHERE id = ?', [id]);

        // Activar el estado del análisis a 1
        const [result] = await pool.query('UPDATE analisis SET estado = 1 WHERE id = ?', [id2]);

        if (result.changedRows === 0) {
            return res.status(200).json({
                status: 200,
                message: "No se encontró el análisis para activar"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Se activó el catador y el análisis"
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor: " + error.message
        });
    }
};
