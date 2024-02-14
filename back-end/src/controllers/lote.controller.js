import {pool} from '../database/conexion.js';
import {validationResult} from 'express-validator';


export const listarlote= async (req,res)=>{
    try{
        

        const[result]= await pool.query("select l.id, u.nombre as nombre_usuario, l.fecha_creacion, l.nombre, l.latitud, l.longitud, l.n_plantas, f.nombre as Nombre_Finca, l.estado from lotes l join fincas f on f.id = l.fincas_id join usuarios u on u.id = f.usuarios_id order by l.estado desc, l.fecha_creacion DESC");
        res.status(200).json(result);


    }catch(err){
        res.status(500).json({ message:'erro en listarlote: '+err});
    }
};
export const listarPorFinca= async (req,res)=>{
    try{
        const[result]= await pool.query(`select l.n_plantas, var.nombre as nombre_variedad, l.id, l.fecha_creacion, l.nombre, l.latitud, l.longitud, f.nombre as nombre_finca, l.estado from lotes l join fincas f on f.id = l.fincas_id left JOIN cafes ca on ca.lotes_id = l.id  LEFT JOIN variedades var on var.id = ca.variedades_id WHERE f.id = ${req.params.id} GROUP BY l.id order by l.estado desc, l.fecha_creacion DESC`);
        res.status(200).json(result);

        console.log(result)

    }catch(err){
        res.status(500).json({ message:'erro en listarlote: '+err});
    }
};

export const buscarlote= async (req,res)=>{
    try{
        let id=req.params.id;

        const[result]= await pool.query("select * from lotes where id= "+ id);
        res.status(200).json(result[0]);


    }catch(err){
        res.status(500).json({ message:'erro en Buscarlote: '+err});
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
export const guardarlote = async(req, res) => {
   
    try {
      let data = {
        "string": {
          
          // "apellido": {
          //   "value": req.body.apelido
          // },
        //   "noombre_vereda": {
        //     "value": req.body.noombre_vereda,
        //     "referencia":"El nombre de la vereda"
        //   }
        },
        "normal": {
          "latitud": {
            "value": req.body.latitud,
            "referencia": "La latitud"
          },
          "nombre": {
            "value": req.body.nombre,
            "referencia": "El nombre"
          },
          "longitud": {
            "value": req.body.longitud,
            "referencia": "la longitud"
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
  
    let {nombre,latitud,longitud,n_plantas,fincas_id } = req.body;

    let sql= `insert into lotes (nombre,latitud,longitud,n_plantas,fincas_id)
                values('${nombre}','${latitud}','${longitud}','${n_plantas}','${fincas_id}')`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows >0){
        res.status(200).json({
            "status":200,
            "message":"se registro con exito"
        })
    }else{
        res.status(401).json({
            "status":401,
            "message":"no se registro con exito"
        })
    }
    }catch(e){
          res.status(500).json({message: "Error en guargarlote: "+e})
}
};

export const actualizarlote = async(req,res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let id= req.params.id;
        let {nombre,latitud,longitud,n_plantas,fincas_id} = req.body;
        let sql= `update lotes set nombre='${nombre}',latitud='${latitud}',longitud='${longitud}',n_plantas='${n_plantas}',fincas_id='${fincas_id}' where id=${id}`;
        const[rows] = await pool.query(sql);
        if(rows.affectedRows>0){
            res.status(200).json({"status":200, "message": "se actualizo con exito"});
        }else{
            res.status(401).json({"status":401, "message": "No se actualizo con exito"}); 
        }
    } catch (e) {
        res.status(500).json({"status":500, "message": "ERROR en el servidor" + e});
    }
}

export const desactivarlote = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE lotes SET estado = 0 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se desactivo con exito el lote"
                                }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se desactivo con exito el lote"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en desactivarlote:', err);
      res.status(500).json({ mensaje: 'Error en desactivarlote: ' + err });
    }
  };
  export const Activarlote = async (req, res) => {
    try {
      let id=req.params.id;
      let sql= `UPDATE lotes SET estado = 1 WHERE id = ${id}`;
      const [rows] = await pool.query(sql);
      if(rows.affectedRows > 0) {
        return   res.status(200).json({
                              "status":200,
                              "message":"se Activo con exito el lote"
                                }
                                );
      }else{
        return    res.status(401).json({
                                "status":401,
                                "message":"no se activo con exito el lote"
                                }
                                );
        }
    } catch (err) {
      console.error('Error en activarlote:', err);
      res.status(500).json({ mensaje: 'Error en activarlote: ' + err });
    }
  };
