import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
// import {pool} from "../database/conexion"


function validate(data) {
    try {
    let keys = Object.keys(data);
    let errros = {};
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
                errros[inputs[e]] = referencia + " no puede estar vacío"
            } else if (!(/[a-zA-Z]+$/).test(data[keys[x]][inputs[e]]["value"])) {
                errros[inputs[e]] = referencia + " debe ser un string"
            } else {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
            }
        }
        if (keys[x] == "varchar") {
            if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                errros[inputs[e]] = referencia + " no puede estar vacío"
            } else if (!(/^[a-zA-Z0-9- ]+$/).test(data[keys[x]][inputs[e]]["value"])) {
                errros[inputs[e]] = referencia + " debe ser un varchar"
            } else {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
            }
        }
        if (keys[x] == "int") {
            if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                errros[inputs[e]] = referencia + " no puede estar vacío"
            } else if (!(/^[0-9]+$/).test(data[keys[x]][inputs[e]]["value"])) {
                errros[inputs[e]] = referencia + " debe ser numerica"
            } 
            else {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
            }
        }
        if (keys[x] == "date") {
            if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                errros[inputs[e]] = referencia + " no puede estar vacío"
            } else if (!(/^\d{4}-\d{2}-\d{2}$/).test(data[keys[x]][inputs[e]]["value"])) {
                errros[inputs[e]] = referencia + " debe ser una fecha valida"
            } else {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
            }
        }
            if (keys[x] == "normal") {
            if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
                errros[inputs[e]] = referencia + " no puede estar vacío"
            } else {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
            }
            }
            // if (keys[x] == "select") {
            // if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
            //     errros[inputs[e]] = "Debe seleccionar una opción para " + referencia
            // } else {
            //     let keysOptions = data[keys[x]][inputs[e]]["opciones"]
            //     for (let o = 0; o < keysOptions.length; o++) { 
        

            //     if (keysOptions[o] == data[keys[x]][inputs[e]]["value"]) {
            //         result[inputs[e]] = data[keys[x]][inputs[e]]["value"];
            //         break
            //     } else if (o == keysOptions.length) {
            //         errros[inputs[e]] = +"Debe seleccionar una opción válida para el " + referencia
            //     }
            //     }
            // }

            // }
        }
    }
    console.log(errros,result)
    if (Object.keys(errros).length > 0) {
        return {
            status: false,
            errors: errros
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
        
    export const guardarMuestra = async (req, res) => {

        // const [muestra] = await pool.query("SELECT id FROM cafe");
        // let opcionesMuestra = [];
        // for (let x = 0; x < muestra.length; x++) {
        // opcionesMuestra.push(muestra[x]["id"])
        // }
        // console.log(opcionesMuestra)

        try {

            let data = {
                "int":{
                    "cantidad":{
                        "value" : req.body.cantidad,
                        "referencia": "La cantidad "
                    }
                },
                "varchar":{
                    "codigo_externo": {
                        "value": req.body.codigo_externo,
                        "referencia": "El código externo"
                    },
                    "consecutivo_informe" : {
                        "value" : req.body.consecutivo_informe,
                        "referencia":"El consecutivo informe"
                    },
                    "codigo_muestra" : {
                        "value" : req.body.codigo_muestra,
                        "referencia":"El codgio de la muestra"
                    },
                    "tipo_tostion" :{
                        "value" : req.body.tipo_tostion,
                        "referencia" : "El tipo de tostion"
                    },
                    "tiempo_fermentacion" : {
                        "value" : req.body.tiempo_fermentacion,
                        "referencia": "El tiempo de fermentacion "
                    },
                    "actividad_agua": {
                        "value": req.body.actividad_agua,
                        "referencia": "La actividad del agua"
                    },
                    "tiempo_secado": {
                            "value": req.body.tiempo_secado,
                            "referencia": "El tiempo de secado"
                        }

                },
                "date":{
                    "fecha_creacion": {
                            "value": req.body.fecha_creacion,
                            "referencia": "La fecha de creación"
                        },
                        "fecha_procesamiento": {
                            "value": req.body.fecha_procesamiento,
                            "referencia": "La fecha de procesamiento"
                        },  
                },
                // "select":{
                //     "cafes_id": {
                //         "value": req.body.cafe_id,
                //         "opciones": opcionesMuestra,
                //         "referencia": "Cafes "
                //     }
                // },
                "string": {
                    // "fecha_creacion": {
                    //     "value": req.body.fecha_creacion,
                    //     "referencia": "La fecha de creación"
                    // },
                    
                    
                    // "consecutivo_informe": {
                    //     "value": req.body.consecutivo_informe,
                    //     "referencia": "El consecutivo de informe"
                    // },
                    "muestreo": {
                        "value": req.body.muestreo,
                        "referencia": "El muestreo"
                    },
                    "preparacion_muestra": {
                        "value": req.body.preparacion_muestra,
                        "referencia": "La preparación de la muestra"
                    },
                    // "cantidad": {
                    //     "value": req.body.cantidad,
                    //     "referencia": "La cantidad"
                    // },
                    "tipo_molienda": {
                        "value": req.body.tipo_molienda,
                        "referencia": "El tipo de molienda"
                    },
                    "tipo_fermentacion": {
                        "value": req.body.tipo_fermentacion,
                        "referencia": "El tipo de fermentación"
                    },
                    "densidad_cafe_verde": {
                        "value": req.body.densidad_cafe_verde,
                        "referencia": "La densidad del café verde"
                    },
                    // "fecha_procesamiento": {
                    //     "value": req.body.fecha_procesamiento,
                    //     "referencia": "La fecha de procesamiento"
                    // },
                    // "tipo_tostion": {
                    //     "value": req.body.tipo_tostion,
                    //     "referencia": "El tipo de tostión"
                    // },
                    // "tiempo_fermentacion": {
                    //     "value": req.body.tiempo_fermentacion,
                    //     "referencia": "El tiempo de fermentación"
                    // },
                    // "codigo_muestra": {
                    //     "value": req.body.codigo_muestra,
                    //     "referencia": "El código de muestra"
                    // },
                    // "actividad_agua": {
                    //     "value": req.body.actividad_agua,
                    //     "referencia": "La actividad del agua"
                    // },
                    // "tiempo_secado": {
                    //     "value": req.body.tiempo_secado,
                    //     "referencia": "El tiempo de secado"
                    // },
                    "presentacion": {
                        "value": req.body.presentacion,
                        "referencia": "La presentación"
                    },
                    // "codigo_externo":{
                    //     "value": req.body.codigo_externo,
                    //     "referencia":"El codigo externo"
                    // },
                    

                }
            };
            
            console.log(data,"xddd");
            let validateInputs = validate(data)
            if (validateInputs.status == false) {
                return res.status(200).json({
                    "status": false,
                    "errors": validateInputs.errors

                })
            }

            console.log(req.body)
            let error1 = validationResult(req);
                if (!error1.isEmpty()) {
                    return res.status(400).json(error1);
            }



            // let error1 = validationResult(req);
            // if (!error1.isEmpty()){
            //     return res.status(400).json(error1);
            // }
            // let data = req.body;
            //     console.log(data)
            let { fecha_creacion, codigo_externo, consecutivo_informe, muestreo, preparacion_muestra, cantidad, tipo_molienda, tipo_fermentacion, densidad_cafe_verde, fecha_procesamiento, tipo_tostion, tiempo_fermentacion, codigo_muestra, actividad_agua, tiempo_secado, presentacion, cafes_id } = req.body;


            let sql = `INSERT INTO muestras ( fecha_creacion, codigo_externo, consecutivo_informe,muestreo, preparacion_muestra, cantidad, tipo_molienda, tipo_fermentacion, densidad_cafe_verde, fecha_procesamiento, tipo_tostion, tiempo_fermentacion, codigo_muestra, actividad_agua, tiempo_secado, presentacion, cafes_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            // const [rows] = await pool.query(sql, [ data.fecha_creacion,data.codigo_externo,data.consecutivo_informe,data.muestreo,data.preparacion_muestra,data.cantidad,data.tipo_molienda,data.tipo_fermentacion,data.densidad_cafe_verde,data.fecha_procesamiento,data.tipo_tostion,data.tiempo_fermentacion,data.codigo_muestra,data.actividad_agua,data.tiempo_secado,data.presentacion,data.cafes_id ]); 
            
            const [rows] = await pool.query(sql, [ fecha_creacion,codigo_externo,consecutivo_informe,muestreo,preparacion_muestra,cantidad,tipo_molienda,tipo_fermentacion,densidad_cafe_verde,fecha_procesamiento,tipo_tostion,tiempo_fermentacion,codigo_muestra,actividad_agua,tiempo_secado,presentacion,cafes_id ]); 


            if (rows.affectedRows > 0) {
                res.status(200).json({
                    "status": 200,
                    "message": "La muestras se registro con exito"   
                }
                );
            } else {
                res.status(401).json({
                    "status": 401,
                    "message": "La muestra no se registro"
                }
                );
            }  
        } catch (error) {
            res.status(500).json({
                "status": 500,
                "message": "error en en el servidor" + error
            }
            );
            
        }
    }
export const actualizarMuestra = async (req, res) => {
        // let error1 = validationResult(req);
        // if (!error1.isEmpty()){
        //     return res.status(400).json(error1);
        // }
    try {

            // let error1 = validationResult(req);
            // if (!error1.isEmpty()) {
            //     return res.status(400).json(error1);
            // }
            // let data = {
            //     "int":{
            //         "cantidad":{
            //             "value" : req.body.cantidad,
            //             "referencia": "La cantidad "
            //         }
            //     },
            //     "varchar":{
            //         "codigo_externo": {
            //             "value": req.body.codigo_externo,
            //             "referencia": "El código externo"
            //         },
            //         "consecutivo_informe" : {
            //             "value" : req.body.consecutivo_informe,
            //             "referencia":"El consecutivo informe"
            //         },
            //         "codigo_muestra" : {
            //             "value" : req.body.codigo_muestra,
            //             "referencia":"El codgio de la muestra"
            //         },
            //         "tipo_tostion" :{
            //             "value" : req.body.tipo_tostion,
            //             "referencia" : "El tipo de tostion"
            //         },
            //         "tiempo_fermentacion" : {
            //             "value" : req.body.tiempo_fermentacion,
            //             "referencia": "El tiempo de fermentacion "
            //         },
            //         "actividad_agua": {
            //             "value": req.body.actividad_agua,
            //             "referencia": "La actividad del agua"
            //         },
            //         "tiempo_secado": {
            //                 "value": req.body.tiempo_secado,
            //                 "referencia": "El tiempo de secado"
            //             }

            //     },
            //     "date":{
            //         "fecha_creacion": {
            //                 "value": req.body.fecha_creacion,
            //                 "referencia": "La fecha de creación"
            //             },
            //             "fecha_procesamiento": {
            //                 "value": req.body.fecha_procesamiento,
            //                 "referencia": "La fecha de procesamiento"
            //             },  
            //     },
            //     // "select":{
            //     //     "cafes_id": {
            //     //         "value": req.body.cafe_id,
            //     //         "opciones": opcionesMuestra,
            //     //         "referencia": "Cafes "
            //     //     }
            //     // },
            //     "string": {
            //         // "fecha_creacion": {
            //         //     "value": req.body.fecha_creacion,
            //         //     "referencia": "La fecha de creación"
            //         // },
                    
                    
            //         // "consecutivo_informe": {
            //         //     "value": req.body.consecutivo_informe,
            //         //     "referencia": "El consecutivo de informe"
            //         // },
            //         "muestreo": {
            //             "value": req.body.muestreo,
            //             "referencia": "El muestreo"
            //         },
            //         "preparacion_muestra": {
            //             "value": req.body.preparacion_muestra,
            //             "referencia": "La preparación de la muestra"
            //         },
            //         // "cantidad": {
            //         //     "value": req.body.cantidad,
            //         //     "referencia": "La cantidad"
            //         // },
            //         "tipo_molienda": {
            //             "value": req.body.tipo_molienda,
            //             "referencia": "El tipo de molienda"
            //         },
            //         "tipo_fermentacion": {
            //             "value": req.body.tipo_fermentacion,
            //             "referencia": "El tipo de fermentación"
            //         },
            //         "densidad_cafe_verde": {
            //             "value": req.body.densidad_cafe_verde,
            //             "referencia": "La densidad del café verde"
            //         },
            //         // "fecha_procesamiento": {
            //         //     "value": req.body.fecha_procesamiento,
            //         //     "referencia": "La fecha de procesamiento"
            //         // },
            //         // "tipo_tostion": {
            //         //     "value": req.body.tipo_tostion,
            //         //     "referencia": "El tipo de tostión"
            //         // },
            //         // "tiempo_fermentacion": {
            //         //     "value": req.body.tiempo_fermentacion,
            //         //     "referencia": "El tiempo de fermentación"
            //         // },
            //         // "codigo_muestra": {
            //         //     "value": req.body.codigo_muestra,
            //         //     "referencia": "El código de muestra"
            //         // },
            //         // "actividad_agua": {
            //         //     "value": req.body.actividad_agua,
            //         //     "referencia": "La actividad del agua"
            //         // },
            //         // "tiempo_secado": {
            //         //     "value": req.body.tiempo_secado,
            //         //     "referencia": "El tiempo de secado"
            //         // },
            //         "presentacion": {
            //             "value": req.body.presentacion,
            //             "referencia": "La presentación"
            //         },
            //         // "codigo_externo":{
            //         //     "value": req.body.codigo_externo,
            //         //     "referencia":"El codigo externo"
            //         // },
                    

            //     }
            // };
            
            // console.log(data,"xddd");
            // let validateInputs = validate(data)
            // if (validateInputs.status == false) {
            //     return res.status(200).json({
            //         "status": false,
            //         "errors": validateInputs.errors

            //     })
            // }
        

        let id = req.params.id;
        // let { fecha_creacion, cantidad,lotes_id} = req.body;
        let datas = req.body;

        // let sql = `UPDATE muestras SET fecha_creacion='${data.fecha}',cantidad='${data.cantidad}',estado='${data.estado}',cafes_id='${data.cafe}' where id='${id}'`

        let sql =`UPDATE muestras SET fecha_creacion='${datas.fecha_creacion}',codigo_externo='${datas.codigo_externo}',consecutivo_informe='${datas.consecutivo_informe}',muestreo='${datas.muestreo}',preparacion_muestra='${datas.preparacion_muestra}',cantidad='${datas.cantidad}',tipo_molienda='${datas.tipo_molienda}',tipo_fermentacion='${datas.tipo_fermentacion}',densidad_cafe_verde='${datas.densidad_cafe_verde}',fecha_procesamiento='${datas.fecha_procesamiento}',tipo_tostion='${datas.tipo_tostion}',tiempo_fermentacion='${datas.tiempo_fermentacion}',codigo_muestra='${datas.codigo_muestra}',actividad_agua='${datas.actividad_agua}',tiempo_secado='${datas.tiempo_secado}',presentacion='${datas.presentacion}',cafes_id='${datas.cafes_id}' WHERE id =${id}`

        console.log("user",sql);

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestra se actuaizo con exito"
            }
            );
        } else {
            res.status(401).json({
                "status": 400,
                "message": "El usuario no fue actualizado"

            }
            );
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor " + e
        });

    }
}
export const buscarMuestra = async (req, res) => {
    try {
        let id = req.params.id;

        // const [result] = await pool.query("SELECT  m.id,  m.fecha_creacion,  m.cantidad, l.nombre as lote, f.nombre as finca,  CONCAT(u.nombre, ' ', u.apellido) as propietario, m.estado, m.cafes_id  FROM  muestras m  JOIN cafes c ON m.cafes_id = c.id  JOIN lotes l ON c.lotes_id = l.id  JOIN fincas f ON l.fincas_id = f.id  JOIN usuarios u ON f.usuarios_id = u.id   WHERE  m.id =" +id);

        const [result] = await pool.query("select * from muestras where id="+id)

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar la muestra :" + err
        });
    }

};
// export const listarMuestras = async (req, res) => {

//     try {
//         // const [result] = await pool.query("SELECT m.id, m.fecha_creacion, m.cantidad, l.nombre as lote,f.nombre as finca, concat(u.nombre,' ',u.apellido)  as propietario,m.estado,m.cafes_id from muestras m join cafes c on m.cafes_id = c.id JOIN lotes l ON c.lotes_id = l.id JOIN fincas f ON l.fincas_id = f.id JOIN usuarios u ON f.usuarios_id = u.id ");
//         const [result] =await pool.query("select * from muestras order by estado desc ");
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).json({
//             massage: "Error en listar muestra :" + err
//         });
//     }
// }
export const listarMuestras = async (req, res) => {

    try {
        // const [result] = await pool.query("SELECT m.id, m.fecha_creacion, m.cantidad, l.nombre as lote,f.nombre as finca, concat(u.nombre,' ',u.apellido)  as propietario,m.estado,m.cafes_id from muestras m join cafes c on m.cafes_id = c.id JOIN lotes l ON c.lotes_id = l.id JOIN fincas f ON l.fincas_id = f.id JOIN usuarios u ON f.usuarios_id = u.id ");
        const [result] =await pool.query("select m.id AS id, m.fecha_creacion,c.id AS cafe, l.nombre as Lote, f.nombre AS Finca,m.estado,m.codigo_externo, u.nombre AS usuario, v.nombre AS variedad from muestras as m JOIN cafes AS c ON m.cafes_id = c.id  JOIN lotes AS l ON c.lotes_id = l.id JOIN fincas AS f ON l.fincas_id = f.id JOIN usuarios AS u ON f.usuarios_id = u.id  JOIN variedades AS v ON c.variedades_id = v.id");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar muestra :" + err
        });
    }
}


export const desactivarMuestra = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update muestras set estado = 0 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 100,
                "message": "Al muestra ya esta desativada"
            }
            );
        }
        else if(rows.changedRows >= 1){
        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestras se desactivo con exito"  
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "La muestra no se desactivo"
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
export const activarMuestra = async (req,res) =>{
    try {
        let id = req.params.id; 
        let sql = `update muestras set estado = 1 where id=${id}`

        const [rows] = await pool.query(sql); 

        if(rows.changedRows == 0){
            res.status(200).json({
                "status": 200,
                "message": "La muestras ya se encuentra activa " 
            }
            );
        }
        else if(rows.changedRows >= 1){

        
        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "La muestras se activo con exito" 
            }
            );
        } else {
            res.status(401).json({
                "status": 401,
                "message": "La muestra no se activo"
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