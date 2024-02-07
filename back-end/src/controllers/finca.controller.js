

import { pool } from '../database/conexion.js';
import { validationResult } from 'express-validator';


export const listarFinca = async (req, res) => {
  try {

    const [result] = await pool.query("SELECT f.id, f.fecha_creacion, f.nombre, f.longitud, f.latitud, u.nombre as nombre_usuario, m.nombre as nombre_municipio, f.estado, f.noombre_vereda  from fincas f join usuarios u on u.id = f.usuarios_id join municipios m on m.id = f.municipios_id order by f.estado desc, f.fecha_creacion DESC");
    res.status(200).json(result);


  } catch (err) {
    res.status(500).json({ message: 'erro en listarFinca: ' + err });
  }
};


export const buscarFinca = async (req, res) => {
  try {

    let id = req.params.id;
    const [result] = await pool.query('select * from fincas where id= ' + id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error en buscarFinca :' + err });
  }
};

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
        if (keys[x] == "normal") {
          if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
            errros[inputs[e]] = referencia + " no puede estar vacío"
          } else {
            result[inputs[e]] = data[keys[x]][inputs[e]]["value"].toLowerCase();
          }
        }
        if (keys[x] == "select") {
          if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
            errros[inputs[e]] = "Debe seleccionar una opción para " + referencia
          } else {
            let keysOptions = data[keys[x]][inputs[e]]["opciones"]
            for (let o = 0; o < keysOptions.length; o++) { 
         

              if (keysOptions[o] == data[keys[x]][inputs[e]]["value"]) {
                result[inputs[e]] = data[keys[x]][inputs[e]]["value"];
                break
              } else if (o == keysOptions.length) {
                errros[inputs[e]] = +"Debe seleccionar una opción válida para el " + referencia
              }
            }
          }

        }
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

export const guardarFinca = async (req, res) => {
  const [municipios] = await pool.query("SELECT id FROM municipios");
  let opcionesMunicipios = [];
  for (let x = 0; x < municipios.length; x++) {
    opcionesMunicipios.push(municipios[x]["id"])
  }
  console.log(opcionesMunicipios)
  try {
    let data = {
      "string": {
        "nombre": {
          "value": req.body.nombre,
          "referencia": "El nombre"
        },
        "apellido": {
          "value": req.body.apelido
        }
      },
      "normal": {
        "latitud": {
          "value": req.body.latitud,
          "referencia": "La latitud"
        },
        "longitud": {
          "value": req.body.longitud
        }
      },
      "select": {
        "municipios_id": {
          "value": req.body.municipios_id,
          "opciones": opcionesMunicipios,
          "referencia": "el municipio"
        }
      }

    }
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

    let { nombre, longitud, latitud, usuarios_id, municipios_id, noombre_vereda } = req.body;

    let sql = `insert into fincas (nombre,longitud,latitud,usuarios_id,municipios_id,noombre_vereda)
            values ('${nombre}','${longitud}','${latitud}','${usuarios_id}','${municipios_id}','${noombre_vereda}')`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "se registro con exito la finca"
      }
      );
    }
    else {

      return res.status(401).json({
        "status": 200,
        "message": "no se registro con exito la finca"
      }
      );
    }


  } catch (e) {
    return res.status(200).json({
      "status": 200,
      "message": "error en el servidor :" + e
    }
    );
  }
}




export const actualizarFinca = async (req, res) => {


  try {
    let error1 = validationResult(req);
    if (!error1.isEmpty()) {
      return res.status(400).json(error1);
    }
    let id = req.params.id;
    let { nombre, longitud, latitud, usuarios_id, municipios_id, noombre_vereda } = req.body;

    let sql = `update fincas set nombre='${nombre}',longitud='${longitud}',latitud='${latitud}',usuarios_id='${usuarios_id}',municipios_id='${municipios_id}',noombre_vereda='${noombre_vereda}'
            where id=${id}`;

    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      res.status(200).json({ "status": 200, "message": "se actualizo con exito la finca" });
    } else {
      res.status(401).json({ "status": 401, "message": "No se actualizo con exito la finca" });
    }
  } catch (e) {
    res.status(500).json({ "status": 500, "message": "error en el servidor:" + e });
  }
}

export const desactivarFinca = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE fincas SET estado = 0 WHERE id = ${id}`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "se desactivo con exito la finca"
      }
      );
    } else {
      return res.status(401).json({
        "status": 401,
        "message": "no se desactivo con exito la finca"
      }
      );
    }
  } catch (err) {
    console.error('Error en desactivarlote:', err);
    res.status(500).json({ mensaje: 'Error en desactivarlote: ' + err });
  }
};
export const ActivarFinca = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE fincas SET estado = 1 WHERE id = ${id}`;
    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      return res.status(200).json({
        "status": 200,
        "message": "se activo con exito la finca"
      }
      );
    } else {
      return res.status(401).json({
        "status": 401,
        "message": "no se activo con exito la finca"
      }
      );
    }
  } catch (err) {
    console.error('Error en activarlote:', err);
    res.status(500).json({ mensaje: 'Error en activarlote: ' + err });
  }
};