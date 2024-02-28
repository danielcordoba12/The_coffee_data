import { pool } from '../database/conexion.js';

export const listardepartamento = async (req, res) => {
    try {
  
      const [result] = await pool.query("select id, nombre from departamentos");
      res.status(200).json(result);
  
  
    } catch (err) {
      res.status(500).json({ message: 'erro en listarMunicipio: ' + err });
    }
  };