

import {pool} from '../database/conexion.js';
import {validationResult} from 'express-validator';
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
            if(keysOptions.length > 0){
              for (let o = 0; o < keysOptions.length; o++) { 
                if (keysOptions[o] == data[keys[x]][inputs[e]]["value"]) {
                  result[inputs[e]] = data[keys[x]][inputs[e]]["value"];
                  break
                } else if (o == keysOptions.length) {
                  errros[inputs[e]] = +"Debe seleccionar una opción válida para el " + referencia
                }
              }
            }else{
              result[inputs[e]] = data[keys[x]][inputs[e]]["value"];

            }
            
          }

        }
        if (keys[x] == "float") {
          // Validación para float
          if (data[keys[x]][inputs[e]]["value"] == "" || data[keys[x]][inputs[e]]["value"] == undefined) {
            errros[inputs[e]] = referencia + " no puede estar vacío";
          } else if (!/^-?\d+(\.\d+)?$/.test(data[keys[x]][inputs[e]]["value"])) {
            errros[inputs[e]] = referencia + " debe ser un número decimal";
          } else {
            result[inputs[e]] = parseFloat(data[keys[x]][inputs[e]]["value"]);
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

export const listarcafe= async (req,res)=>{
    try{
  
        const[result]= await pool.query("select c.id,u.numero_documentos as documento,f.nombre as nombre_finca, u.nombre as nombre_usuario, m.nombre as nombre_municipio, c.estado, l.nombre as numero_lote, v.nombre as nombre_variedad from cafes c join lotes l on l.id = c.lotes_id join fincas f on f.id = l.fincas_id join usuarios u on u.id = f.usuarios_id join municipios m on m.id = f.municipios_id   join variedades v on v.id = c.variedades_id order by c.estado desc");
        res.status(200).json(result);
  
  
    }catch(err){
        res.status(500).json({ message:'erro en listarCafe: '+err});
    }
  };




export const buscarCafe= async (req,res)=>{ 
    try{
        let id=req.params.id;
         const [result] = await pool.query('select * from cafes where id= '+id);
        res.status(200).json(result);
}catch(err){
    res.status(500).json({message:'Error en buscarCafe :'+err});
}};



export const guardarCafe= async (req, res) => {
  const [variedades] = await pool.query("SELECT id FROM variedades");
  let opcionesVariedades = [];
  for (let x = 0; x < variedades.length; x++) {
    opcionesVariedades.push(variedades[x]["id"])
  }

  const [lotes] = await pool.query("SELECT id FROM lotes");
  let opcionesLotes = [];
  for (let x = 0; x < lotes.length; x++) {
    opcionesLotes.push(lotes[x]["id"])
  }
    try{
      let data = {

        "select": {
          "lotes_id": {
            "value": req.body.lotes_id,
            "opciones": opcionesVariedades,
            "referencia": "el lote"
          },
          "variedades_id": {
            "value": req.body.variedades_id,
            "opciones": opcionesLotes,
            "referencia": "la variedad"
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
  
  
      let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let {lotes_id,variedades_id} =req.body;

    let sql=`insert into cafes (lotes_id,variedades_id)
            values ('${lotes_id}','${variedades_id}')`;

    const [rows] = await pool.query(sql);
    
    if(rows.affectedRows > 0) {
    return   res.status(200).json({
                          "status":200,
                          "message":"se registro con exito el cafe"
                            }
                            );
                              }
    else{
    return    res.status(401).json({
                            "status":401,
                            "message":"no se registro con exito el cafe"
                            }
                            );
    }
    

}catch (e) {
return    res.status(500).json({
                             "status":500,
                             "message":"error en el servidor :" +e
                             }
                        );
           }
}




export const actualizarCafe=async (req, res) =>{

    try{
      
      let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
    let id = req.params.id;
    let {lotes_id,variedades_id}  = req.body;

    let sql=`update cafes SET lotes_id='${lotes_id}',variedades_id='${variedades_id}'
            where id=${id}`;

    const [rows] = await pool.query(sql);
    if(rows.affectedRows>0){
        res.status(200).json({"status":200,"message":"se actualizo con exito el cafe"});
    }else{
        res.status(401).json({"status":401,"message":"No se actualizo con exito el cafe"});
    }
    }catch(e){
        res.status(500).json({"status":500,"message":"error en el servidor:" +e});
            }
}

export const estadoCafe = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE cafes SET estado = 0 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se desactivo con exito el cafe"
                                 }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se desactivo con exito el cafe"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en estadoCafe:', err);
      res.status(500).json({ mensaje: 'Error en estadoCafe: ' + err });
    }
  };
  export const ActivarCafe = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE cafes SET estado = 1 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se activo con exito el cafe"
                                 }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se activo con exito el cafe"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en ActivarCafe:', err);
      res.status(500).json({ mensaje: 'Error en ActivarCafe: ' + err });
    }
  };