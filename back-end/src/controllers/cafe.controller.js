

import {pool} from '../database/conexion.js';
import {validationResult} from 'express-validator';

export const listarcafe= async (req,res)=>{
    try{
  
        const[result]= await pool.query("select c.id, c.estado, l.nombre as numero_lote, v.nombre as nombre_variedad from cafes c join lotes l on l.id = c.lotes_id join variedades v on v.id = c.variedades_id order by c.estado desc");
        res.status(200).json(result);
  
  
    }catch(err){
        res.status(500).json({ message:'erro en listarCafe: '+err});
    }
  };




export const buscarCafe= async (req,res)=>{ 
    try{
        let id=req.params.id;
         const [result] = await pool.query('select * from cafes where id= '+id);
        res.status(200).json(result);
}catch(err){
    res.status(500).json({message:'Error en buscarCafe :'+err});
}};



export const guardarCafe= async (req, res) => {

    try{
      let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let {lotes_id,variedades_id} =req.body;

    let sql=`insert into cafes (lotes_id,variedades_id)
            values ('${lotes_id}','${variedades_id}')`;

    const [rows] = await pool.query(sql);
    
    if(rows.affectedRows > 0) {
    return   res.status(200).json({
                          "status":200,
                          "message":"se registro con exito el cafe"
                            }
                            );
                              }
    else{
    return    res.status(401).json({
                            "status":401,
                            "message":"no se registro con exito el cafe"
                            }
                            );
    }
    

}catch (e) {
return    res.status(500).json({
                             "status":500,
                             "message":"error en el servidor :" +e
                             }
                        );
           }
}




export const actualizarCafe=async (req, res) =>{

    try{
      let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let id = req.params.id;
    let {lotes_id,variedades_id}  = req.body;

    let sql=`update cafes SET lotes_id='${lotes_id}',variedades_id='${variedades_id}'
            where id=${id}`;

    const [rows] = await pool.query(sql);
    if(rows.affectedRows>0){
        res.status(200).json({"status":200,"message":"se actualizo con exito el cafe"});
    }else{
        res.status(401).json({"status":401,"message":"No se actualizo con exito el cafe"});
    }
    }catch(e){
        res.status(500).json({"status":500,"message":"error en el servidor:" +e});
            }
}

export const estadoCafe = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE cafes SET estado = 0 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se desactivo con exito el cafe"
                                 }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se desactivo con exito el cafe"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en estadoCafe:', err);
      res.status(500).json({ mensaje: 'Error en estadoCafe: ' + err });
    }
  };
  export const ActivarCafe = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE cafes SET estado = 1 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se activo con exito el cafe"
                                 }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se activo con exito el cafe"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en ActivarCafe:', err);
      res.status(500).json({ mensaje: 'Error en ActivarCafe: ' + err });
    }
  };