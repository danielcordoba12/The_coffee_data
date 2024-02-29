import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../database/conexion.js';

export const validarusuario = async(req, res) => {
    try {
        let { numero_documentos, user_password } = req.body;
        let sql = `SELECT id, nombre, rol, user_password FROM usuarios WHERE numero_documentos = '${numero_documentos}'`;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            const user = rows[0];
            // Compara la contraseña proporcionada con la contraseña almacenada
            if (bcrypt.compareSync(user_password, user.user_password)) {
                // Si las contraseñas coinciden, genera un token JWT
                const token = jwt.sign({ id: user.id, nombre: user.nombre, rol: user.rol }, process.env.AUT_SECRET, { expiresIn: 14400 }); // 3600 segundos = 1 hora
                return res.status(200).json({ token: token, message: "Inicio de sesión exitoso" });
            } else {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }
        } else {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error en el servidor: ' + e });
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