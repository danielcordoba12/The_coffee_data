import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Asegúrate de tener un archivo de estilos CSS para este formulario
import { localhost } from '../../services/Api';


function LoginForm() {
    const [numero_documentos, setNumeroDocumentos] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const [modallogin, setModallogin] = useState(null);

    const openIngresarModal = () => {
        setModallogin(true);
    };

    const closeSalirModal = () => {
        setModallogin(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://${localhost}:4000/validacion/validar`, {
                numero_documentos,
                user_password
            });
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/home';
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Documento o contraseña es incorrecta', error);
            setError('Documento o contraseña es incorrecta');
        }
    };

    return (
        <div className="background-container">
            <img src="../../public/img/fondo6.png" alt="" className="fondo2" />
            <div className="content-header">
                <div className="limiter-width-page">
                    <div className="header-page">
                        <div className="header-logo"><img src="../../public/img/logoSena.png" alt="" /></div>
                        <div className="right-logo"><img src="../../public/img/logoEscuela.png" alt="" /></div>
                        <div className="empresa-logo"><img src="../../public/img/nombrelogo.png" alt="" /></div>
                    </div>
                </div>
                <header>
                    <div className="menu-visible">
                        <button className="btn-iniciar-sesion" onClick={openIngresarModal}>
                            Iniciar Sesión
                        </button>
                    </div>
                </header>
            </div>



            {modallogin && (
                <div className='centro'>
                    <div className="wrapper active-popup">
                        <h2 className="title-ini">Login</h2>
                        <div className="form-box login" id='aver'>
                            <div className="icon-close" onClick={closeSalirModal}>×</div>
                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <label htmlFor="numero_documento">Número de Documento:</label>
                                    <input
                                        type="text"
                                        id="numero_documentos"
                                        value={numero_documentos}
                                        onChange={(e) => setNumeroDocumentos(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="user_password">Contraseña:</label>
                                    <input
                                        type="password"
                                        id="user_password"
                                        value={user_password}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <p className="error-message">{error}</p>}
                                <button type="submit" className="btn-submit">Iniciar Sesión</button>
                            </form>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default LoginForm;
