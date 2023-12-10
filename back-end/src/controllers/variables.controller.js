
import { pool } from "../database/conexion.js";

export const guardarVariable = async (req,res) =>{
    try{
        let data = req.body;

        let sql = 'INSERT INTO variables( nombre, tipos_analisis_id) VALUES (?,?)'

        const[rows] = await pool.query(sql,[data.nombre, data.tipos_analisis_id]);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La varible se registro exito"   
            }
            );

        } else {
            res.status(400).json({
                "status": 400,
                "message": "No se registro"
            }
            );
        }  



    } catch (error) {
        res.status(500).json({
            "status": 500,
            "message": "error en en el servidor" + error 
        }
        );
        
    }
}