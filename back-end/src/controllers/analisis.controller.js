import {pool} from '../database/conexion.js';
import { validationResult } from 'express-validator';

export const guardarAnalisis = async (req,res)=>{

    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let data = req.body;
        console.log('user',data);
        
        let sql = 'INSERT INTO analisis(calidad,tipo_analisis_id, muestras_id, usuarios_id) VALUES (?,?,?,?)';
        const [rows] = await pool.query(sql,[data.calidad,data.tipo_analisis_id,data.muestras_id,data.usuarios_id]);

        if(rows.affectedRows>0){
            res.status(200).json({
                "status": 200,
                "menssage":"Registro de analisis exitoso..!"
            });


        }else{
            res.status(400).json({
                "status":401,
                "menssage":"No se registro"
            });
        } 
    }catch(error){
        res.status(500).json({
            "status":500,
            "menssage":"error en el sevidor"+error
        });

    }
};


export const buscaranalisis = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query("select * from analisis where id =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar analisis:" + err
        });
    }

};

export const listarAnalisis = async(req,res)=>{
    try{
        const [result] = await pool.query(`SELECT usuarios.nombre AS nombre_usuario, 
       fecha_analisis, 
       calidad, 
       tipos_analisis.nombre AS nombre_tipo_analisis, 
        muestras_id
        FROM usuarios, analisis, tipos_analisis
        WHERE usuarios.id = analisis.usuarios_id 
        AND tipos_analisis.id = analisis.tipo_analisis_id
        ORDER BY analisis.estado DESC;
;
        `);
            res.status(200).json(result);
    
        }catch(err){
        res.status(500).json({
            menssage:'error en listar analisis de la base de datos:'+err
        })
    }
};


export const desactivarAnalisis = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update analisis set estado = 0 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 100,
                "message": "El analisis ya esta desactivada"
            }
            );
        }
        else if(rows.changedRows >= 1){
        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El analisis se desactivo con exito"  
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "El analisis no se desactivo"
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

export const activarAnalisis = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update analisis set estado = 1 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 200,
                "message": "El analisis ya se encuentra activa " 
            }
            );
        }
        else if(rows.changedRows >= 1){

        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El analisis se activo con exito" 
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "El analisis no se activo"
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

export const actualizarAnalisis = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let id = req.params.id;
        let data = req.body;

        let sql = `UPDATE analisis SET fecha_analisis='${data.fecha_analisis}',calidad='${data.calidad}',tipo_analisis_id='${data.tipo_analisis_id}',muestras_id='${data.muestras_id}',usuarios_id='${data.usuarios_id}' WHERE id= ${id}`
    
        // let sql = `update usuarios SET nombres ='${nombres}',direccion='${direccion}',telefono='${telefono}',correo ='${correo}' where  idusuario=${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "¡Registro de Analisis actualizado..!"
            }
            );
            }else{
                res.status(400).json({
                "status": 400,
                "message": "¡El analisis no fue actualizado"});
            }
            } catch (e) {
                res.status(500).json({
                "status": 500,
                "message": "Error en el servidor..! " +e});

            }
};

 

