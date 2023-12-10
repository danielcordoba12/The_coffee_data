import {pool} from '../database/conexion.js';


export const guardartokenUsu = async(req, res) => {
    try{

    let {token,usuarios_id} = req.body;

    let sql= `insert into token_usuarios (token,usuarios_id)
                values('${token}','${usuarios_id}')`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows >0){
        res.status(200).json({
            "status":200,
            "message":"se registro con exito el token usuario"
        })
    }else{
        res.status(401).json({
            "status":401,
            "message":"no se registro con exito el token usuario"
        })
    }
    }catch(e){
          res.status(500).json({message: "Error en guardartokenUsu: "+e})
}
};
