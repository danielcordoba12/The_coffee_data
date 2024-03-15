import React, { useEffect, useState, useRef } from "react";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/usuarios.css";
import Sweet from "../helpers/Sweet";
import EncryptionComponent from "../components/crypt/criptar.jsx";
import bcrypt from "bcryptjs";
import $ from "jquery";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import Validate from "../helpers/Validate.jsx";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState();
  const [isRegistrarModalOpen, setRegistrarModalOpen] = useState(false);
  const [userUpdate, setUserUpdate] = useState([]);
  const [formStatus, setFormStatus] = useState(0);
  const [isRegistrarUsuarioModalOpen, setRegistrarUsuarioModalOpen] =
    useState(false);
  const [fincas, setFincas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const usuarios_id = useRef();
  const id = useRef();
  const nombre = useRef();
  const apellido = useRef();
  const telefono = useRef();
  const correo_electronico = useRef();
  const numero_documentos = useRef();
  const user_password = useRef();
  const tipo_documento = useRef();
  const rol = useRef();
  const cargo = useRef();
  const estado = useRef();
  const longitud = useRef();
  const latitud = useRef();
  const municipios_id = useRef();
  const noombre_vereda = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMunicipios();
    buscarUsuarios();
  }, []);

  const fetchMunicipios = async () => {
    try {
      const response = await Api.get("municipio/listar");
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error fetching municipios:", error);
    }
  };

  const buscarUsuarios = async () => {
    try {
      const response = await Api.get("usuario/listarusuario");
      console.log(response);
      setUsuarios(response.data);
      console.log(response, "useeeer");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    let inputRegister = document.querySelectorAll(".input-register");
    let h6Error = document.querySelectorAll(".h6-error");

    for (let x = 0; x < inputRegister.length; x++) {
      inputRegister[x].addEventListener("change", function () {
        let h6Error = document.querySelectorAll(".h6-error");

        if (h6Error[x]) {
          h6Error[x].style.display = "none";
        }
      });
      inputRegister[x].addEventListener("input", function () {
        let h6Error = document.querySelectorAll(".h6-error");

        if (h6Error[x]) {
          h6Error[x].style.display = "none";
        }
      });
    }
  }, [isRegistrarModalOpen]);

  const handleEditUser2 = async () => {
    const result = await Sweet.confimarDeshabilitar({});
    if (result.isConfirmed) {
      try {
        await Api.patch(`/usuario/desactivar/${SelectedUsuarioId}`, userUpdate);
        isRegistrarUsuarioModalOpen();
        // Recargar la lista de fincas después de la desactivación
        buscarUsuarios();
      } catch (error) {
        console.error("Error desactivando el usuario: ", error);
      }
    }
  };

  const handleEditUser3 = async () => {
    const result = await Sweet.confimarHabilitar({});
    if (result.isConfirmed) {
      try {
        await Api.patch(`/usuario/activar/${SelectedUsuarioId}`, userUpdate);
        isRegistrarUsuarioModalOpen();
        // Recargar la lista de fincas después de la activación
        buscarUsuarios();
      } catch (error) {
        console.error("Error activando el usuario: ", error);
      }
    }
  };

  const openRegistrarModal = () => {
    setRegistrarModalOpen(true);
    console.log("modal", setRegistrarModalOpen);
    console.log("si estoy funcionando");
  };

  const closeRegistrarModal = () => {
    setRegistrarModalOpen(false);
  };

  const openRegistrarUsuarioModal = () => {
    setRegistrarUsuarioModalOpen(true);
  };

  const closeRegistrarUsuarioModal = () => {
    setRegistrarUsuarioModalOpen(false);
  };

  const dataTableRef = useRef(null);

  const tableRef = useRef();

  useEffect(() => {
    if (usuarios.length > 0) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        columnDefs: [
          {
            targets: -1,
            responsivePriority: 1,
          },
        ],
        responsive: true,

        lengthMenu: [
          [5, 10, 50, 100, -1],
          ["5 Filas", , "10 Filas", "50 Filas", "100 Filas", "Ver Todo"],
        ],
      });
    }
  }, [usuarios]);

  // const initializeDataTable = (usuarios) => {
  //   $(document).ready(function () {
  //     $(dataTableRef.current).DataTable({
  //       lengthMenu: [5, 10, 20, 30, 40, 50],
  //       processing: true,
  //       pageLength: 5,
  //       language: {
  //         processing: "Procesando datos...",
  //       },
  //       responsive: true,
  //     });
  //   });

  //   return () => {
  //     $(dataTableRef.current).DataTable().destroy(true);
  //   };
  // };

  // useEffect(() => {
  //   if (usuarios.length > 0) {
  //     initializeDataTable(usuarios);
  //   }
  // }, [usuarios]);

  const handleSubmit = async (e, status, id) => {
    e.preventDefault();
    let validacionExitosa = Validate.validarCampos(".form-empty");

    if (!validacionExitosa) {
      Sweet.registroFallido();
      return;
    }

    // Obtiene los datos del formulario
    const data = {
      nombre: nombre.current.value,
      apellido: apellido.current.value,
      numero_documentos: numero_documentos.current.value,
      telefono: telefono.current.value,
      correo_electronico: correo_electronico.current.value,
      user_password: encryptPassword(user_password.current.value), // Encripta la contraseña
      tipo_documento: tipo_documento.current.value,
      rol: rol.current.value,
      cargo: cargo.current.value,
    };

    const headers = {
      headers: {
        token: "xd",
      },
    };

    let method = "post";
    let route = "";

    if (status === 1) {
      route = "usuario/registrar";
    } else if (status === 2 && id) {
      route = "usuario/actualizar/" + id;
      method = "put";
    }

    try {
      const response = await Api[method](route, data, headers);
      if (data.status === 403) {
        Sweet.error(data.error.errors[0].msg);
      }
      if (response.data.status === false) {
        Sweet.registroFallido();
        console.error("Error al procesar la solicitud:", response.data.message);
      } else {
        Sweet.registroExitoso();
        console.log(
          "Solicitud procesada correctamente:",
          response.data.message
        );
        // Recargar la página después de registrar o actualizar
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  const handleRegistrar = async (data) => {
    const fincaData = {
      ...data,
    };

    const headers = {
      headers: {
        token: "xd",
      },
    };

    try {
      const data = await Api.post("finca/registrar", fincaData, headers);
      if (data.data.status == false) {
        let keys = Object.keys(data.data.errors);
        let h6Error = document.querySelectorAll(".h6-error");
        for (let x = 0; x < h6Error.length; x++) {
          h6Error[x].remove();
        }
        for (let x = 0; x < keys.length; x++) {
          let h6 = document.createElement("h6");
          h6.innerHTML = data.data.errors[keys[x]];
          h6.classList.add("h6-error");
          if (document.getElementById(keys[x])) {
            let parent = document.getElementById(keys[x]).parentNode;
            parent.appendChild(h6);
          }
        }
      } else {
        Sweet.registroExitoso();
        closeRegistrarModal();

        // closeRegistrarModal();
        // const response = await Api.get("finca/listar");
        setFincas(response.data);
        location.href = "/home/finca";
      }
    } catch (error) {
      console.error("Error al registrar la finca:", error);
    }
  };

  async function buscarUsuario(id) {
    if (id) {
      const response = await Api.get("/usuario/buscarusuario/" + id);
      setUserUpdate(response.data);
    }
  }

  async function setInput(value, id) {
    let input = document.getElementById(id);
    console.log(input);
    if (input) {
      input.value = value;
    }
  }

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10); // Genera un salt aleatorio
    return bcrypt.hashSync(password, salt); // Encripta la contraseña con el salt
  };

  return (
    <>
      <div className="contTliteUser">
        <h1 className="titleuser">Usuario</h1>
        <button
          className="btn-registrar-user"
          onClick={() => {
            setFormStatus(1);
            setRegistrarUsuarioModalOpen(true);
            setUserUpdate([]);
            openRegistrarUsuarioModal;
          }}
        >
          Añadir
        </button>
      </div>

      <div className="tablalistar">
        <table
          style={{ width: "100%" }}
          className=" table table-stripped  border display reponsive nowrap b-4 bg-white"
          ref={tableRef}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Numero de documento </th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Opciones</th>
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
                <td>{usuario.estado === 1 ? "Activo" : "desactivado"}</td>
                <td>
                  <button
                    type="button"
                    className="btn-actualizar-mod"
                    onClick={() => {
                      setFormStatus(2),
                        setRegistrarUsuarioModalOpen(true),
                        buscarUsuario(usuario.id ? usuario.id : "");
                    }}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn-actualizar-mod"
                    onClick={() => {
                      setIdUsuario(usuario.id);
                      openRegistrarModal();
                    }}
                  >
                    Registrar Finca
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRegistrarUsuarioModalOpen && (
        <>
          <div className="overlay-u" onClick={closeRegistrarUsuarioModal}></div>
          <div className="tabla-regis-finca">
            <h1 className="titleRegistrarUser">Usuario</h1>
            <form
              className="contenido-regi"
              onSubmit={(e) => {
                handleSubmit(
                  e,
                  formStatus,
                  userUpdate[0] ? userUpdate[0].id : ""
                );
              }}
            >
              <div className="div-input">
                <input
                  defaultValue={userUpdate[0] ? userUpdate[0].nombre : ""}
                  type="text"
                  id="nombre"
                  name="nombre"
                  ref={nombre}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="nombre">Nombre</label>
                <div className="invalid-feedback is-invalid">
                  Nombre Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={userUpdate[0] ? userUpdate[0].apellido : ""}
                  type="text"
                  id="apellido"
                  name="apellido"
                  ref={apellido}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="apellido">Apellido</label>
                <div className="invalid-feedback is-invalid">
                  apellido Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={
                    userUpdate[0] ? userUpdate[0].numero_documentos : ""
                  }
                  type="number"
                  id="numero_documentos"
                  name="numero_documentos"
                  ref={numero_documentos}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="numero_documentos">Número de documentos</label>
                <div className="invalid-feedback is-invalid">
                  Número Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={userUpdate[0] ? userUpdate[0].telefono : ""}
                  type="text"
                  id="telefono"
                  name="telefono"
                  ref={telefono}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="telefono">Teléfono</label>
                <div className="invalid-feedback is-invalid">
                  Telefono Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={
                    userUpdate[0] ? userUpdate[0].correo_electronico : ""
                  }
                  type="text"
                  id="correo_electronico"
                  name="correo_electronico"
                  ref={correo_electronico}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="correo_electronico">Correo Electrónico</label>
                <div className="invalid-feedback is-invalid">
                  correo Incorrecto
                </div>
              </div>
              {formStatus === 1 ? (
                <div className="div-input">
                  <input
                    type="password"
                    id="user_password"
                    name="user_password"
                    ref={user_password}
                    placeholder=""
                    className="form-empty"
                  />
                  <label htmlFor="user_password">Contraseña</label>
                </div>
              ) : (
                <>
                  <div className="dnone">
                    <input
                      type="password"
                      id="user_password"
                      name="user_password"
                      ref={user_password}
                      placeholder=""
                      className=""
                    />
                    <label htmlFor="user_password">Contraseña</label>
                  </div>
                </>
              )}
              <div className="div-input">
                <input
                  defaultValue={
                    userUpdate[0] ? userUpdate[0].tipo_documento : ""
                  }
                  type="text"
                  id="tipo_documento"
                  name="tipo_documento"
                  ref={tipo_documento}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="tipo_documento">Tipo de Documento</label>
                <div className="invalid-feedback is-invalid">
                  Tipo de Documento Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={userUpdate[0] ? userUpdate[0].rol : ""}
                  type="text"
                  id="rol"
                  name="rol"
                  ref={rol}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="rol">Rol</label>
                <div className="invalid-feedback is-invalid">
                  Rol Incorrecto
                </div>
              </div>
              <div className="div-input">
                <input
                  defaultValue={userUpdate[0] ? userUpdate[0].cargo : ""}
                  type="text"
                  id="cargo"
                  name="cargo"
                  ref={cargo}
                  placeholder=""
                  className="form-empty"
                />
                <label htmlFor="cargo">Cargo</label>
                <div className="invalid-feedback is-invalid">
                  Cargo Incorrecto
                </div>
              </div>
              {formStatus === 1 ? (
                <button className="btn-regis-u" type="submit">
                  Registrar
                </button>
              ) : formStatus === 2 ? (
                <button className="btn-blue" type="submit">
                  Actualizar
                </button>
              ) : (
                ""
              )}
              <button
                className="close-modal-x"
                onClick={closeRegistrarUsuarioModal}
              >
                X
              </button>
            </form>
          </div>
        </>
      )}

      {isRegistrarModalOpen && (
        <>
          <div className="overlay-u" onClick={closeRegistrarModal}></div>
          <div className="tabla-regis-finca">
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
                  municipios_id: selectedMunicipio,
                  noombre_vereda: noombre_vereda.current.value,
                });
              }}
              method="post"
            >
              <div className="div-input">
                <input
                  className="input-register"
                  type="text"
                  id="nombre"
                  name="nombre"
                  ref={nombre}
                  placeholder=""
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
              <div className="div-input">
                <input
                  className="input-register"
                  type="text"
                  id="longitud"
                  name="longitud"
                  ref={longitud}
                  placeholder=""
                />
                <label htmlFor="longitud">Longitud</label>
              </div>
              <div className="div-input">
                <input
                  className="input-register"
                  type="text"
                  id="latitud"
                  name="latitud"
                  ref={latitud}
                  placeholder=""
                />
                <label htmlFor="latitud">Latitud</label>
              </div>
              <input
                value={idUsuario}
                type="hidden"
                id="usuarios_id"
                name="usuarios_id"
                ref={usuarios_id}
                placeholder=""
              />
              <div className="div-input">
                <select
                  className="input-register"
                  id="municipios_id"
                  name="municipios_id"
                  value={selectedMunicipio}
                  onChange={(e) => {
                    console.log("Municipio seleccionado:", e.target.value);
                    setSelectedMunicipio(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Seleccione un municipio
                  </option>
                  {municipios.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>
                      {municipio.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="div-input">
                <input
                  className="input-register"
                  type="text"
                  id="noombre_vereda"
                  name="noombre_vereda"
                  ref={noombre_vereda}
                  placeholder=""
                />
                <label htmlFor="noombre_vereda">nombre vereda</label>
              </div>
              <button className="btn-regis-user" type="submit">
                Registrar Finca
              </button>
              <button className="close-modal-x" onClick={closeRegistrarModal}>
                x
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ListarUsuarios;
