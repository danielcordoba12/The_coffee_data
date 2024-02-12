import { pool } from "../database/conexion.js";
// import { validationResult } from "express-validator";


    export const guardarMuestra = async (req, res) => {
        try {
            // let error1 = validationResult(req);
            // if (!error1.isEmpty()){
            //     return res.status(400).json(error1);
            // }
            let data = req.body;
                console.log(data)


            let sql = `INSERT INTO muestras ( fecha_creacion, codigo_externo, consecutivo_informe,muestreo, preparacion_muestra, cantidad, tipo_molienda, tipo_fermentacion, densidad_cafe_verde, fecha_procesamiento, tipo_tostion, tiempo_fermentacion, codigo_muestra, actividad_agua, tiempo_secado, presentacion, cafes_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const [rows] = await pool.query(sql, [ data.fecha_creacion,data.codigo_externo,data.consecutivo_informe,data.muestreo,data.preparacion_muestra,data.cantidad,data.tipo_molienda,data.tipo_fermentacion,data.densidad_cafe_verde,data.fecha_procesamiento,data.tipo_tostion,data.tiempo_fermentacion,data.codigo_muestra,data.actividad_agua,data.tiempo_secado,data.presentacion,data.cafes_id ]); 
            
            if (rows.affectedRows > 0) {
                res.status(200).json({
                    "status": 200,
                    "message": "La muestras se registro con exito"   
                }
                );
            } else {
                res.status(401).json({
                    "status": 401,
                    "message": "La muestra no se registro"
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
export const actualizarMuestra = async (req, res) => {
    try {
        // let error1 = validationResult(req);
        // if (!error1.isEmpty()){
        //     return res.status(400).json(error1);
        // }
        let id = req.params.id;
        // let { fecha_creacion, cantidad,lotes_id} = req.body;
        let data = req.body;

        // let sql = `UPDATE muestras SET fecha_creacion='${data.fecha}',cantidad='${data.cantidad}',estado='${data.estado}',cafes_id='${data.cafe}' where id='${id}'`

        let sql =`UPDATE muestras SET fecha_creacion='${data.fecha_creacion}',codigo_externo='${data.codigo_externo}',consecutivo_informe='${data.consecutivo_informe}',muestreo='${data.muestreo}',preparacion_muestra='${data.preparacion_muestra}',cantidad='${data.cantidad}',tipo_molienda='${data.tipo_molienda}',tipo_fermentacion='${data.tipo_fermentacion}',densidad_cafe_verde='${data.densidad_cafe_verde}',fecha_procesamiento='${data.fecha_procesamiento}',tipo_tostion='${data.tipo_tostion}',tiempo_fermentacion='${data.tiempo_fermentacion}',codigo_muestra='${data.codigo_muestra}',actividad_agua='${data.actividad_agua}',tiempo_secado='${data.tiempo_secado}',presentacion='${data.presentacion}',cafes_id='${data.cafes_id}' WHERE id =${id}`

        console.log("user",sql);

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestra se actuaizo con exito"
            }
            );
        } else {
            res.status(401).json({
                "status": 400,
                "message": "El usuario no fue actualizado"

            }
            );
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor " + e
        }
        );

    }
}
export const buscarMuestra = async (req, res) => {
    try {
        let id = req.params.id;

        // const [result] = await pool.query("SELECT  m.id,  m.fecha_creacion,  m.cantidad, l.nombre as lote, f.nombre as finca,  CONCAT(u.nombre, ' ', u.apellido) as propietario, m.estado, m.cafes_id  FROM  muestras m  JOIN cafes c ON m.cafes_id = c.id  JOIN lotes l ON c.lotes_id = l.id  JOIN fincas f ON l.fincas_id = f.id  JOIN usuarios u ON f.usuarios_id = u.id   WHERE  m.id =" +id);

        const [result] = await pool.query("select * from muestras where id="+id)

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar la muestra :" + err
        });
    }

};
// export const listarMuestras = async (req, res) => {

//     try {
//         // const [result] = await pool.query("SELECT m.id, m.fecha_creacion, m.cantidad, l.nombre as lote,f.nombre as finca, concat(u.nombre,' ',u.apellido)  as propietario,m.estado,m.cafes_id from muestras m join cafes c on m.cafes_id = c.id JOIN lotes l ON c.lotes_id = l.id JOIN fincas f ON l.fincas_id = f.id JOIN usuarios u ON f.usuarios_id = u.id ");
//         const [result] =await pool.query("select * from muestras order by estado desc ");
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).json({
//             massage: "Error en listar muestra :" + err
//         });
//     }
// }
export const listarMuestras = async (req, res) => {

    try {
        // const [result] = await pool.query("SELECT m.id, m.fecha_creacion, m.cantidad, l.nombre as lote,f.nombre as finca, concat(u.nombre,' ',u.apellido)  as propietario,m.estado,m.cafes_id from muestras m join cafes c on m.cafes_id = c.id JOIN lotes l ON c.lotes_id = l.id JOIN fincas f ON l.fincas_id = f.id JOIN usuarios u ON f.usuarios_id = u.id ");
        const [result] =await pool.query("select m.id AS id, m.fecha_creacion,c.id AS cafe, l.nombre as Lote, f.nombre AS Finca,m.estado,m.codigo_externo, u.nombre AS usuario, v.nombre AS variedad from muestras as m JOIN cafes AS c ON m.cafes_id = c.id  JOIN lotes AS l ON c.lotes_id = l.id JOIN fincas AS f ON l.fincas_id = f.id JOIN usuarios AS u ON f.usuarios_id = u.id  JOIN variedades AS v ON c.variedades_id = v.id");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar muestra :" + err
        });
    }
}


export const desactivarMuestra = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update muestras set estado = 0 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 100,
                "message": "Al muestra ya esta desativada"
            }
            );
        }
        else if(rows.changedRows >= 1){
        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestras se desactivo con exito"  
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "La muestra no se desactivo"
            }
            );
        }
    }  
    } catch (error) {
        res.status(500).json({
            "status": 500,
            "message": "error en en el servidor" + error
        }
        );
        
    }
}
export const activarMuestra = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update muestras set estado = 1 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 200,
                "message": "La muestras ya se encuentra activa " 
            }
            );
        }
        else if(rows.changedRows >= 1){

        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestras se activo con exito" 
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "La muestra no se activo"
            }
            );
        }
    }  
    } catch (error) {
        res.status(500).json({
            "status": 500,
            "message": "error en en el servidor" + error
        }
        );
        
    }
}