
import {pool} from '../database/conexion.js';   
import {validationResult} from 'express-validator';


export const listarmunicipio= async (req,res)=>{
    try{

        const[result]= await pool.query("select m.id, m.nombre , d.nombre as nombre_departamento, m.fecha_creacion from municipios m join departamentos d on d.id = m.departamentos_id");
        res.status(200).json(result);


    }catch(err){
        res.status(500).json({ message:'erro en listarMunicipio: '+err});
    }
};

export const buscarmunicipio= async (req,res)=>{
    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        
        let id=req.params.id;

        const[result]= await pool.query("select * from municipios where id= "+ id);
        res.status(200).json(result[0]);


    }catch(err){
        res.status(500).json({ message:'erro en listarMunicipio: '+err});
    }
};

export const guardarmunicipio = async(req, res) => {
    try{
    let error= validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

    let {nombre,fecha_creacion,departamentos_id} = req.body;

    let sql= `insert into municipios (nombre,fecha_creacion,departamentos_id)
                values('${nombre}','${fecha_creacion}','${departamentos_id}')`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows >0){
        res.status(200).json({
            "status":200,
            "message":"se registro con exito"
        })
    }else{
        res.status(401).json({
            "status":401,
            "message":"no se registro con exito"
        })
    }
    }catch(e){
          res.status(500).json({message: "Error en guargarMunicipio: "+e})
}
};


export const actualizarmunicipio = async(req,res) => {
    try {
        
        let error= validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }
        let id= req.params.id;
        let {nombre,fecha_creacion,departamentos_id} = req.body;
        let sql= `update municipios set nombre='${nombre}',fecha_creacion='${fecha_creacion}',departamentos_id='${departamentos_id}' where id='${id}'`;
        const[rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            res.status(200).json({"status":200, "message": "se actualizo con exito"});
        }else{
            res.status(401).json({"status":401, "message": "No se actualizo con exito"}); 
        }
    } catch (e) {
        res.status(500).json({"status":500, "message": "ERROR en el servidor" + e});
    }
}

