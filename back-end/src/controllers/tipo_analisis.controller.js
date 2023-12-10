import {pool} from '../database/conexion.js';


export const guardarTipoanalisis = async(req, res) => {
    try{

    let {nombre} = req.body;

    let sql= `insert into tipos_analisis (nombre)
                values('${nombre}')`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows >0){
        res.status(200).json({
            "status":200,
            "message":"se registro con exito el tipo de analisis"
        })
    }else{
        res.status(401).json({
            "status":401,
            "message":"no se registro con exito el tipo de analisis"
        })
    }
    }catch(e){
          res.status(500).json({message: "Error en guardartokenUsu: "+e})
}
};
