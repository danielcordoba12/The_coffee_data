import {pool} from '../database/conexion.js';
import jwt from 'jsonwebtoken';


export const validarusuario = async(req,res)=>{
    try {
    let {numero_documentos,user_password}= req.body;
    let sql=`select id,nombre,rol from usuarios where numero_documentos= '${numero_documentos}' and user_password = '${user_password}'`;
    const [rows]= await pool.query(sql);

    if (rows.length>0) {
        let token=jwt.sign({user:rows},process.env.AUT_SECRET,{expiresIn:process.env.AUT_EXPIRET});
        return res.status(200).json({token:token,message:"Usuario autorizado"});
        // res.status(200).json(rows);

    }else{
        res.status(401).json({messaje:"usuario no encontrado..."});
    }

    } catch (e) {
        res.status(500).json({messaje:'error en el servidor : '+e});
    }
    
};

export const validartoken = async(req,res,next)=>{
    try {
        let token_usuario= req.headers['token'];
        if (!token_usuario) {
            return res.status(401).json({message: 'se requiere el token'});
        } else {
            const decoded=jwt.verify(token_usuario,process.env.AUT_SECRET,(error,decoded)=>{
                if (error) {
                    return res.status(401).json({message: 'Token invalido',autorizad:false});
                } 
                else {
                    next();
                }
            })
        }
    } catch (e) {
        return res.status(500).json({message: 'error en validartoken' +e});
    }
};

