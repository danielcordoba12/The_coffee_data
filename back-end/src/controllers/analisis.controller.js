import {pool} from '../database/conexion.js';
import { validationResult } from 'express-validator';

// validaciones

function validate(data) {
    try {
        let keys = Object.keys(data);
        let err = {};
        let result = {};
        for (let x = 0; x < keys.length; x++) {
            let inputs = Object.keys(data[keys[x]])
            for (let e = 0; e < inputs.length; e++) {
                let referencia = "El campo"
                if (data[keys[x]][inputs[e]]["referencia"]) {
                    referencia = data[keys[x]][inputs[e]]["referencia"];
                }
                if (keys[x] == "string") {
                    if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                        err[inputs[e]] = referencia + " no puede estar vacío"
                    } else if (!(/[a-zA-Z]+$/).test(data[keys[x]][inputs[e]]["value"])) {
                        err[inputs[e]] = referencia + " debe ser un string"
                    } else {
                        result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
                    }
                }
                if (keys[x] == "normal") {
                    if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                        err[inputs[e]] = referencia + " no puede estar vacío"
                    } else {
                        result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
                    }
                }
                if (keys[x] == "select") {
                    if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                        err[inputs[e]] = "Debe seleccionar una opción para " + referencia
                    } else {
                        let keysOptions = data[keys[x]][inputs[e]]["opciones"]
                        if (keysOptions.length > 0) {
                            for (let o = 0; o < keysOptions.length; o++) {
                                if (keysOptions[o] == data[keys[x]][inputs[e]]["value"]) {
                                    result[inputs[e]] = data[keys[x]][inputs[e]]["value"];
                                    break
                                } else if (o == keysOptions.length) {
                                    err[inputs[e]] = +"Debe seleccionar una opción válida para el " + referencia
                                }
                            }
                        } else {
                            result[inputs[e]] = data[keys[x]][inputs[e]]["value"];

                        }

                    }

                }
                if (keys[x] == "float") {
                    // Validación para float
                    if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                        err[inputs[e]] = referencia + " no puede estar vacío";
                    } else if (!/^-?\d+(\.\d+)?$/.test(data[keys[x]][inputs[e]]["value"])) {
                        err[inputs[e]] = referencia + " debe ser un número decimal";
                    } else {
                        result[inputs[e]] = parseFloat(data[keys[x]][inputs[e]]["value"]);
                    }
                }
            }
        }
        console.log(err, result)
        if (Object.keys(err).length > 0) {
            return {
                status: false,
                err: err
            }
        } else {
            return {
                status: true,
                data: result
            }
        }

    } catch (e) {
        console.log(e)
    }
}




export const guardarAnalisis = async (req, res) => {
    
    const [usuarios] = await pool.query("SELECT id FROM usuarios");
    let opcionesUsuarios = [];
    for (let x = 0; x < usuarios.length; x++) {
        opcionesUsuarios.push(usuarios[x]["id"])
    }

    const [muestras] = await pool.query("SELECT id FROM muestras");
    let opcionesMuestras = [];
    for (let x = 0; x < muestras.length; x++) {
        opcionesMuestras.push(muestras[x]["id"])
    }

    try {

        let datas = {

            "select": {
                "muestras_id": {
                    "value": req.body.muestras,
                    "opciones": opcionesMuestras,
                    "referencia": "la muestra"
                },
                "usuarios_id": {
                    "value": req.body.usuarios_id,
                    "opciones": opcionesUsuarios,
                    "referencia": "el lote"
                }
            }
        }
        let validateInputs = validate(datas)
        if (validateInputs.status == false) {
            return res.status(200).json({
                "status": false,
                "err": validateInputs.err

            })
        }
        
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let data = req.body;
        console.log('user',data);
        
        let sql = 'INSERT INTO analisis(tipo_analisis_id,muestras_id,usuarios_id) VALUES (?,?,?)';
        const [rows] = await pool.query(sql,[1,data.muestras_id.value,data.usuarios_id.value]);

        if(rows.affectedRows>0){
            res.status(200).json({
                "status": 200,
                "menssage":"Registro de analisis exitoso..!"
            });


        }else{
            res.status(200).json({
                "status":401,
                "menssage":"No se registro"
            });
        } 
    }catch(error){
        res.status(200).json({
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
        const [result] = await pool.query(`SELECT   
        a.id AS id_analisis,
        m.codigo_externo AS codigo_externo,
        us.nombre AS nombre_usuario,
        a.fecha_analisis,
        a.estado,vd.nombre AS nombre_variedades,
        u.nombre AS propietario,
        f.nombre AS nombre_fincas,
        l.nombre AS nombre_lotes,
        ta.nombre AS nombre_tipo_analisis
    FROM   
        analisis a
    JOIN   
        muestras m ON m.id = a.muestras_id
    JOIN   
        cafes c ON c.id = m.cafes_id
    JOIN   
        variedades vd ON vd.id = c.variedades_id
    JOIN   
        lotes l ON l.id = c.lotes_id
    JOIN   
        fincas f ON f.id = l.fincas_id
    JOIN   
        usuarios u ON u.id = f.usuarios_id
    JOIN   
        usuarios us ON us.id = a.usuarios_id
    JOIN   
        tipos_analisis ta ON ta.id = a.tipo_analisis_id
    GROUP BY   
        a.id;
    ;`);
            res.status(200).json(result);
    
        }catch(err){
        res.status(500).json({
            menssage:'error en listar analisis de la base de datos:'+err
        })
    }

};

export const listarPropietario = async (req, res) => {
    try {
        const [result] = await pool.query(` Select usuarios.nombre  AS propietario from fincas,usuarios where usuarios.id= fincas.usuarios_id`);


        res.status(200).json(result);
        
    } catch {
        res.status(500).json({
            menssage: 'error en listar analisis de la base de datos:' + err
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

        let sql = `UPDATE analisis SET muestras_id='${data.muestras_id}',usuarios_id='${data.usuarios_id}'WHERE id= ${id}`
    
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

 

