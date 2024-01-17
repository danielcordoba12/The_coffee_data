

import { pool } from '../database/conexion.js';
import { validationResult } from 'express-validator';


export const listarFinca = async (req, res) => {
  try {

    const [result] = await pool.query("SELECT f.id, f.fecha_creacion, f.nombre, f.longitud, f.latitud, u.nombre as nombre_usuario, m.nombre as nombre_municipio, f.estado, f.noombre_vereda  from fincas f join usuarios u on u.id = f.usuarios_id join municipios m on m.id = f.municipios_id order by f.estado desc");
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



export const guardarFinca = async (req, res) => {

  try {
    let error1 = validationResult(req);
    if (!error1.isEmpty()) {
      return res.status(400).json(error1);
    }

    let { fecha_creacion, nombre, longitud, latitud, usuarios_id, municipios_id, noombre_vereda } = req.body;

    let sql = `insert into fincas (fecha_creacion	,nombre,longitud,latitud,usuarios_id,municipios_id,noombre_vereda)
            values ('${fecha_creacion}','${nombre}','${longitud}','${latitud}','${usuarios_id}','${municipios_id}','${noombre_vereda}')`;

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
        "status": 401,
        "message": "no se registro con exito la finca"
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




export const actualizarFinca = async (req, res) => {


  try {
    let error1 = validationResult(req);
    if (!error1.isEmpty()) {
      return res.status(400).json(error1);
    }
    let id = req.params.id;
    let { fecha_creacion, nombre, longitud, latitud, usuarios_id, municipios_id, noombre_vereda } = req.body;

    let sql = `update fincas set fecha_creacion='${fecha_creacion}',nombre='${nombre}',longitud='${longitud}',latitud='${latitud}',usuarios_id='${usuarios_id}',municipios_id='${municipios_id}',noombre_vereda='${noombre_vereda}'
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