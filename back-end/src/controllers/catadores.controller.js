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
        const [result] = await pool.query(`select analisis_id,usuarios_id from catadores`);
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