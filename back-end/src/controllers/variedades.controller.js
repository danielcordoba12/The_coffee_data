

import { pool } from '../database/conexion.js';
import { validationResult } from 'express-validator';


export const listarVariedad = async (req, res) => {
    try {

        const [result] = await pool.query("select v.id, v.fecha_creacion, v.nombre from variedades v");
        res.status(200).json(result);


    } catch (err) {
        res.status(500).json({ message: 'erro en listarVariedad: ' + err });
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

export const guardarVariedad = async (req, res) => {

    try {
        let data = {
          "string": {
            "nombre": {
              "value": req.body.nombre,
              "referencia": "El nombre"
            }
          }
    
        }
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
        let { nombre } = req.body;

        let sql = `insert into variedades (nombre)
            values ('${nombre}')`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            return res.status(200).json({
                "status": 200,
                "message": "se registro con exito la Variedad"
            }
            );
        }
        else {
            return res.status(401).json({
                "status": 401,
                "message": "no se registro con exito la Variedad"
            }
            );
        }


    } catch (e) {
        return res.status(500).json({
            "status": 500,
            "message": "error en el servidor :" + e
        }
        );
    }
}




export const actualizarVariedad = async (req, res) => {


    try {

      let data = {
        "string": {
          "nombre": {
            "value": req.body.nombre,
            "referencia": "El nombre"
          }
        }
  
      }
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
        let id = req.params.id;
        let { fecha_creacion, nombre } = req.body;

        let sql = `update variedades SET fecha_creacion='${fecha_creacion}',nombre='${nombre}'
            where id=${id}`;

        const [rows] = await pool.query(sql);
        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "se actualizo con exito la variedad" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se actualizo con exito la variedad" });
        }
    } catch (e) {
        res.status(500).json({ "status": 500, "message": "error en el servidor:" + e });
    }
};
export const buscarvariedad = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()) {
            return res.status(400).json(error1);
        }

        let id = req.params.id;

        const [result] = await pool.query("select * from variedades where id= " + id);
        res.status(200).json(result[0]);


    } catch (err) {
        res.status(500).json({ message: 'erro en listarvariedad: ' + err });
    }
};
