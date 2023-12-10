import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/api";
const EditarFinca = () => {
    
    const { id } = useParams();
    const [Finca, setFincas] = useState({ fecha_creacion: '', nombre: '', longitud: '', latitud: '', usuarios_id : '', municipios_id : '', noombre_vereda: ''});
    const navigate = useNavigate()

    useEffect(()=> {
        const buscarFincas = async () => {
            try {
                const response = await Api.get(`/finca/buscar/${id}`);
                setFincas(response.data[0]);
            } catch (error) {
                console.error('Error buscando el usuario', error);
                
            }
        };
        buscarFincas();
    },[id]);

    const handleEditUser1 = async () => {
        try {
            await Api.put(`/finca/actualizar/${id}`,Finca);
            navigate("/finca/listar")
        } catch (error) {
            console.error('Error editando el finca: ',error);
        }
    }
    const handleEditUser2 = async () => {
        try {
            await Api.patch(`/finca/desactivar/${id}`,Finca);
            navigate("/finca/listar")
        } catch (error) {
            console.error('Error desactivando el Finca: ',error);
        }
    }

    return (
        <div>
            <h1 className="text-center font-bold underline text-3xl p-3 m-2">Editar Finca</h1>
            <div className="max-w-xs">
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" placeholder="fecha_creacion" value={Finca.fecha_creacion} onChange={(e)=> setFincas({ ...Finca, fecha_creacion: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="nombre" value={Finca.nombre} onChange={(e)=> setFincas({ ...Finca, nombre: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="longitud" value={Finca.longitud} onChange={(e)=> setFincas({ ...Finca, longitud: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="latitud" value={Finca.latitud} onChange={(e)=> setFincas({ ...Finca, latitud: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="usuarios_id" value={Finca.usuarios_id} onChange={(e)=> setFincas({ ...Finca, usuarios_id: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="municipios_id" value={Finca.municipios_id} onChange={(e)=> setFincas({ ...Finca, municipios_id: e.target.value})}/>
                <input className="shadow appearance-none border rounded w-full py-2 m-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="noombre_vereda" value={Finca.noombre_vereda} onChange={(e)=> setFincas({ ...Finca, noombre_vereda: e.target.value})}/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" onClick={handleEditUser1}>Actualizar</button>
            </div>
        </div>
    );
}

export default EditarFinca