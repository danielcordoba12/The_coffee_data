import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
const Editarcafe = () => {

    const { id } = useParams();
    const [cafe, setcafe] = useState({ lotes_id: '', variedades_id: '' });
    const navigate = useNavigate()

    useEffect(() => {
        const buscarcafe = async () => {
            try {
                const response = await Api.get(`/cafe/buscar/${id}`);
                setcafe(response.data[0]);
            } catch (error) {
                console.error('Error buscando el usuario', error);

            }
        };
        buscarcafe();
    }, [id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/cafe/actualizar/${id}`, cafe);
            navigate("/cafe/listar")
        } catch (error) {
            console.error('Error editando el cafe: ', error);
        }
    }
    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/cafe/desactivar/${id}`, cafe);
            navigate("/cafe/listar")
        } catch (error) {
            console.error('Error desactivando el cafe: ', error);
        }
    }
    const handleEditUser3 = async () => {
        try {
            await Api.patch(`/cafe/activar/${id}`, cafe);
            navigate("/cafe/listar")
        } catch (error) {
            console.error('Error activando el cafe: ', error);
        }
    }

    return (<>
        <img src="../../public/img/fondo.png" alt="" className="fondo2" />
        <div className="tabla3">
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar cafe</h1>
            <div className="max-w-xs">

            <input
                    className="input-field"
                    type="number"
                    placeholder="lotes_id"
                    value={cafe.lotes_id}
                    onChange={(e) => setcafe({ ...cafe, lotes_id: e.target.value })}
                />

                <input
                    className="input-field" 
                    type="number" placeholder="variedades_id " 
                    value={cafe.variedades_id } 
                    onChange={(e) => setcafe({ ...cafe, variedades_id : e.target.value })}
                />
                
                
                <button
                className="btn-primary"
                onClick={handleEditUser1}
              >
                Actualizar
              </button>
              {cafe.estado === 1 ? (
                <button
                  className="btn-secondary"
                  onClick={handleEditUser2}
                >
                  Desactivar
                </button>
              ) : (
                <button
                  className="btn-tertiary"
                  onClick={handleEditUser3}
                >
                  Activar
                </button>
              )}
            </div>
        </div>
        </>
    );

}

export default Editarcafe