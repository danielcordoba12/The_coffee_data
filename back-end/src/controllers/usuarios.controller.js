import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
 
 export const guardarUsuario = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(403).json(error1);
        }
        let data = req.body;
        console.log("user",data);

        let sql= 'INSERT INTO usuarios(nombre, apellido, numero_documentos,telefono, correo_electronico, user_password, tipo_documento, rol, cargo) VALUES (?,?,?,?,?,?,?,?,?)'; 
 
        const [rows] = await pool.query(sql, [data.nombre, data.apellido, data.numero_documentos, data.telefono,data.correo_electronico,data.user_password,data.tipo_documento,data.rol,data.cargo]); 
        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El usuario se registro con exito!"   
            }
            );

        } else {
            res.status(200).json({
                "status": 200,
                "message": "No se registro el usuario!"
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

export const listarUsuario = async (req, res) => {

    try {
        
        const [result] = await pool.query("select id, nombre, apellido, numero_documentos,telefono, correo_electronico, user_password, tipo_documento, rol, cargo from usuarios");
        res.status(200).json(result);
    } catch (err) {
        res.status(200).json({
            massage: "Error en listar usuario :" + err
        });
    }
};
export const buscarUsuarios = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query("select * from usuarios where id =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(200).json({
            massage: "Error en listar usuario :" + err
        });
    }

};


export const actualizarUsuario = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(200).json(error1);
        }
        let id = req.params.id;
        let { nombre, apellido, numero_documentos, telefono,correo_electronico,user_password,tipo_identificacion,rol,cargo} = req.body;


        let sql = `UPDATE usuarios SET nombre='${nombre}',apellido='${apellido}',numero_documentos='${numero_documentos}',telefono='${telefono}',correo_electronico ='${correo_electronico}',user_password='${user_password}',tipo_documento='${tipo_identificacion}',rol='${rol}',cargo='${cargo}' WHERE  id =${id}`
    
        // let sql = `update usuarios SET nombres ='${nombres}',direccion='${direccion}',telefono='${telefono}',correo ='${correo}' where  idusuario=${id}`;

        console.log("user",sql);

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El usuario se actuaizo con exito!"
            }
            );
        } else {
            res.status(200).json({
                "status": 200,
                "message": "El usuario no fue actualizado!"

            }
            );
        }
    }         catch (error) {
        res.status(200).json({
            "status": 200,
            "message": "error en en el servidor" + error 
        }
        );
        
    }
};

export const desactivarUsuario = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE usuarios SET estado = 0 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) { 
        return   res.status(200).json({
                              "status":200,
                              "message":"se desactivo con exito el usuario"
                                }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se desactivo con exito el usuario"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en desactivarUsuario:', err);
      res.status(200).json({ mensaje: 'Error en desactivarUsuario: ' + err });
    }
  };
  export const ActivarUsuario = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE usuarios SET estado = 1 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se Activo con exito el usuario"
                                }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se activo con exito el usuario"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en activarUsuaeio:', err);
      res.status(200).json({ mensaje: 'Error en activarUsuario: ' + err });
    }
  };