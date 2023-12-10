

import {pool} from '../database/conexion.js';
import {validationResult} from 'express-validator';


export const listarVariedad= async (req,res)=>{
  try{

      const[result]= await pool.query("select * from variedades");
      res.status(200).json(result);


  }catch(err){
      res.status(500).json({ message:'erro en listarVariedad: '+err});
  }
};

export const guardarVariedad= async (req, res) => {

    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let {fecha_creacion	,nombre} =req.body;

    let sql=`insert into variedades (fecha_creacion,nombre)
            values ('${fecha_creacion}','${nombre}')`;

    const [rows] = await pool.query(sql);
    
    if(rows.affectedRows > 0) {
    return   res.status(200).json({
                          "status":200,
                          "message":"se registro con exito la Variedad"
                             }
                            );
                              }
    else{
    return    res.status(401).json({
                            "status":401,
                            "message":"no se registro con exito la Variedad"
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




export const actualizarVariedad=async (req, res) =>{


    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let id = req.params.id;
    let {fecha_creacion	,nombre,estado} = req.body;

    let sql=`update variedades SET fecha_creacion='${fecha_creacion}',nombre='${nombre}'
            where id=${id}`;

    const [rows] = await pool.query(sql);
    if(rows.affectedRows>0){
        res.status(200).json({"status":200,"message":"se actualizo con exito la variedad"});
    }else{
        res.status(401).json({"status":401,"message":"No se actualizo con exito la variedad"});
    }
    }catch(e){
        res.status(500).json({"status":500,"message":"error en el servidor:" +e});
            }
};
export const buscarvariedad= async (req,res)=>{
    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        
        let id=req.params.id;

        const[result]= await pool.query("select * from variedades where id= "+ id);
        res.status(200).json(result[0]);


    }catch(err){
        res.status(500).json({ message:'erro en listarvariedad: '+err});
    }
};
