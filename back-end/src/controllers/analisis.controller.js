import { pool } from '../database/conexion.js';
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

    await pool.query('START TRANSACTION')

    const [muestras] = await pool.query("SELECT id FROM muestras");
    let opcionesmuestras = [];
    for (let x = 0; x < muestras.length; x++) {
        opcionesmuestras.push(muestras[x]["id"])
    }

    // const [usuarios] = await pool.query("SELECT id FROM usuarios");
    // let opcionesusuarios = [];
    // for (let x = 0; x < usuarios.length; x++) {
    //     opcionesusuarios.push(usuarios[x]["id"])
    // }

    try {



        let data = {

            "select": {
                "muestras_id": {
                    "value": req.body.muestras_id,
                    "opciones": opcionesmuestras,
                    "referencia": "la muestra"
                },
                // "usuarios_id": {
                //     "value": req.body.usuarios_id,
                //     "opciones": opcionesusuarios,
                //     "referencia": "el usuario"
                // }
            }
        }
        let validateInputs = validate(data)
        if (validateInputs.status == false) {
            return res.status(200).json({
                "status": false,
                "err": validateInputs.err

            })
        }

        let error1 = validationResult(req);
        if (!error1.isEmpty()) {
            return res.status(400).json(error1);
        }
        let data1 = req.body;
        // console.log('este es la info ', data1);
        

        let sql = 'INSERT INTO analisis(tipo_analisis_id,muestras_id) VALUES (?,?)';
        const [rows] = await pool.query(sql, [1, data1.muestras_id]);
        const analisis_id = rows.insertId;

        let rows2 = [];


        for (let i = 0; i < data1.usuarios_id.length; i++) {
            
            console.log("data",data1.usuarios_id[i].id);
            console.log("analisis desde el backend", analisis_id);
            let sql2= 'INSERT INTO catadores(analisis_id, usuarios_id) VALUES (?,?)';
            const [result] = await pool.query(sql2, [analisis_id, data1.usuarios_id[i].id]); 
            rows2.push(result);
            
        }
        


        await pool.query('COMMIT')

        if (rows.affectedRows > 0 && rows2.every(row => row.affectedRows > 0)) {
            res.status(200).json({
                "status": 200,
                "menssage": "Registro de analisis exitoso..!"
            });


        } else {
            await pool.query('ROLLBACK');
            res.status(200).json({
                "status": 401,
                "menssage": "No se registro"
            });
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({
            "status": 500,
            "menssage": "error en el sevidor" + error
        });

    }
};
export const buscaranalisis = async (req, res) => {
    try {

        let id = req.params.id;
        const [result] = await pool.query("select a.id,fecha_analisis,m.consecutivo_informe,calidad,a.estado,tipo_analisis_id,a.muestras_id, u.nombre FROM analisis a JOIN muestras m ON m.id = a.muestras_id JOIN catadores ca ON ca.analisis_id = a.id JOIN usuarios u ON ca.usuarios_id = u.id where a.id =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar analisis:" + err
        });
    }

};

export const listarAnalisis = async (req, res) => {
    try {
        let where = " "
        if (req.user.rol != "administrador") {
            where = " WHERE a.usuarios_id = " + req.user.id + " "
        }
        const sql = `SELECT
        a.id AS id_analisis,
        m.codigo_externo AS codigo_externo,
        a.fecha_analisis,
        a.estado,
        vd.nombre AS nombre_variedades,
        f.nombre AS nombre_fincas,
        l.nombre AS nombre_lotes,
        ta.nombre AS nombre_tipo_analisis,
        SUBSTRING_INDEX(catador, ' ', 1) AS nombre_catador,
        SUBSTRING_INDEX(catador, ' ', -1) AS apellido_catador,
        uc.nombre AS propietario
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
        usuarios uc ON uc.id = f.usuarios_id
    JOIN
        tipos_analisis ta ON ta.id = a.tipo_analisis_id
    JOIN
        (
            SELECT 
                ca.analisis_id,
                CONCAT(u.nombre, ' ', u.apellido) AS catador
            FROM 
                catadores ca
            JOIN 
                usuarios u ON u.id = ca.usuarios_id
        ) AS catador_table ON catador_table.analisis_id = a.id
        ` + where + `
    GROUP BY   
        a.id;
    ;`
        const [result] = await pool.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({
                result : result,
                status: false,
                message: "No se encontran analisis."
        });
    
        }

    } catch (err) {
        res.status(500).json({
            menssage: 'error en listar analisis de la base de datos:' + err
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


export const desactivarAnalisis = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `update analisis set estado = 0 where id=${id}`

        const [rows] = await pool.query(sql);

        if (rows.changedRows == 0) {
            res.status(200).json({
                "status": 100,
                "message": "El analisis ya esta desactivada"
            }
            );
        }
        else if (rows.changedRows >= 1) {

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

export const activarAnalisis = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `update analisis set estado = 1 where id=${id}`

        const [rows] = await pool.query(sql);

        if (rows.changedRows == 0) {
            res.status(200).json({
                "status": 200,
                "message": "El analisis ya se encuentra activa "
            }
            );
        }
        else if (rows.changedRows >= 1) {


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
    const [muestras] = await pool.query("SELECT id FROM muestras");
    let opcionesmuestras = [];
    for (let x = 0; x < muestras.length; x++) {
        opcionesmuestras.push(muestras[x]["id"])
    }

    const [usuarios] = await pool.query("SELECT id FROM usuarios");
    let opcionesusuarios = [];
    for (let x = 0; x < usuarios.length; x++) {
        opcionesusuarios.push(usuarios[x]["id"])
    }

    try {

        let data = {

            "select": {
                "muestras_id": {
                    "value": req.body.muestras_id,
                    "opciones": opcionesmuestras,
                    "referencia": "la muestra"
                },
                "usuarios_id": {
                    "value": req.body.usuarios_id,
                    "opciones": opcionesusuarios,
                    "referencia": "el usuario"
                }
            }
        }
        let validateInputs = validate(data)
        if (validateInputs.status == false) {
            return res.status(200).json({
                "status": false,
                "err": validateInputs.err

            })
        }

        let error1 = validationResult(req);
        if (!error1.isEmpty()) {
            return res.status(400).json(error1);
        }
        let id = req.params.id;
        let data2 = req.body;

        let sql = `UPDATE analisis SET muestras_id='${data2.muestras_id}',usuarios_id='${data2.usuarios_id}'WHERE id= ${id}`

        // let sql = `update usuarios SET nombres ='${nombres}',direccion='${direccion}',telefono='${telefono}',correo ='${correo}' where  idusuario=${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "¡Registro de Analisis actualizado..!"
            }
            );
        } else {
            res.status(400).json({
                "status": 400,
                "message": "¡El analisis no fue actualizado"
            });
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor..! " + e
        });

    }
};



