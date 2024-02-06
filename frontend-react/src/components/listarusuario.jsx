import React, { useEffect, useState, useRef } from "react";
import Api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../style/usuarios.css';
import Sweet from "../helpers/Sweet";



    const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [idUsuario, setIdUsuario] = useState();
    const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
    const [fincas, setFincas] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState("");

    
    const usuarios_id = useRef();
    const nombre = useRef();
    const longitud = useRef();
    const latitud = useRef();
    const municipios_id = useRef();
    const noombre_vereda = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await Api.get("municipio/listar");
                setMunicipios(response.data);
                console.log("Municipios cargados:", response.data);
            } catch (error) {
                console.error("Error fetching municipios:", error);
            }
        };
        fetchMunicipios();
    }, []);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await Api.get('usuario/listarusuario');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        buscarUsuarios();
    }, []);

    const openRegistrarModal = () => {
        setRegistrarModalOpen(true);
    };

    const closeRegistrarModal = () => {
        setRegistrarModalOpen(false);
    };
   
    const handleRegistrar = async (data) => {
        // Obtener el ID del usuario actualmente autenticado o ajustar según tu lógica
      
    
        const fincaData = {
          ...data
        };
    
        const headers = {
          headers: {
            token: "xd",
          },
        };
    
        try {
          const data = await Api.post("finca/registrar", fincaData, headers);
          if(data.data.status == false){
            let keys = Object.keys(data.data.errors)
            let h6Error = document.querySelectorAll(".h6-error");
            for(let x = 0 ; x < h6Error.length; x++){
                h6Error[x].remove()
            }
            console.log(data.data)
            for(let x = 0 ; x < keys.length; x++){
                let h6 = document.createElement("h6")
                h6.innerHTML = data.data.errors[keys[x]]
                h6.classList.add("h6-error")
                if(document.getElementById(keys[x])){
                    let parent = document.getElementById(keys[x]).parentNode
                    parent.appendChild(h6)
                }
                
            }
          }
          console.log(data.data)
          /* Sweet.registroExitoso();
          closeRegistrarModal(); */
          // Recargar la lista de fincas después del registro
          const response = await Api.get("finca/listar");
          setFincas(response.data);
     /*      location.href = "/finca" */
     
          
        } catch (error) {
          console.error("Error al registrar la finca:", error);
        }
      };
    

    return (
        <>
        {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}
            <img src="../../public/img/fondo.png" alt="" className="fondo2" />
            <div className="tablalistar">
                <h1 className="titu">Usuarios</h1>
                <br />
                <table className="tableprincipal">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>Apellido</th>
                            <th>Numero de documento</th>
                            <th>Telefono</th>
                            <th>correo</th>
                            <th>Estado</th>
                            <th>opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.numero_documentos}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.correo_electronico}</td>
                                <td>{usuario.estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                <td>
                                    <Link to={`/usuario/actualizar/${usuario.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <button type="button" className="btn-primary">
                                            actualizar
                                        </button>
                                    </Link>
                                    <button className="btn-registrar" onClick={()=>{setIdUsuario(usuario.id); openRegistrarModal()}}>
                                        Registrar Finca
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isRegistrarModalOpen && (
                <div className="overlay" onClick={closeRegistrarModal}></div>
            )}

            {isRegistrarModalOpen && (
                <div className="tabla2">
                    <h1 className="text-center font-bold underline text-3xl p-3 m-2">
                        Registrar Finca
                    </h1>

                    <form
                        className="contenido-regi"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRegistrar({
                                
                                nombre: nombre.current.value,
                                longitud: longitud.current.value,
                                latitud: latitud.current.value,
                                usuarios_id: usuarios_id.current.value,
                                municipios_id: selectedMunicipio,  // Utilizar el municipio seleccionado
                                noombre_vereda: noombre_vereda.current.value
                            });
                        }}
                        method="post"
                    >

                       

                        <div className="div-input">
                            <input type="text" id="nombre" name="nombre" ref={nombre} placeholder="" />
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="div-input">
                            <input type="text" id="longitud" name="longitud" ref={longitud} placeholder="" />
                            <label htmlFor="longitud">Longitud</label>
                        </div>
                        <div className="div-input">
                            <input  type="text" id="latitud" name="latitud" ref={latitud} placeholder="" />
                            <label htmlFor="latitud">Latitud</label>
                        </div>
                     
                            <input  value={idUsuario} type="hidden" id="usuarios_id" name="usuarios_id" ref={usuarios_id} placeholder="" />
                    
                        <div className="div-input">
                            
                            <select
                                id="municipios_id"
                                name="municipios_id"
                                value={selectedMunicipio}
                                onChange={(e) => {
                                    console.log("Municipio seleccionado:", e.target.value);
                                    setSelectedMunicipio(e.target.value);
                                }}
                            >
                                <option value="" disabled>Seleccione un municipio</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.id} value={municipio.id}>
                                        {municipio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="div-input">
                            <input type="text" id="noombre_vereda" name="noombre_vereda" ref={noombre_vereda} placeholder="" />
                            <label htmlFor="noombre_vereda">nombre vereda</label>
                        </div>
                        <button
                            className="btn-blue"
                            type="submit"
                        >
                            Registrar finca
                        </button>
                        <button
                            className="close-modal-btn"
                            onClick={closeRegistrarModal}
                        >
                            Cerrar
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ListarUsuarios;