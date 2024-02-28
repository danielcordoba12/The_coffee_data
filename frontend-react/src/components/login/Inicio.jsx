import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Asegúrate de tener un archivo de estilos CSS para este formulario

function LoginForm() {
    const [numero_documentos, setNumeroDocumentos] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/validacion/validar', {
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
            console.error('Error durante el inicio de sesión:', error);
            setError('Error durante el inicio de sesión');
        }
    };

    return (
        <div className="login-form-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="numero_documentos">Número de Documentos:</label>
                    <input
                        type="text"
                        id="numero_documentos"
                        value={numero_documentos}
                        onChange={(e) => setNumeroDocumentos(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_password">Contraseña:</label>
                    <input
                        type="password"
                        id="user_password"
                        value={user_password}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default LoginForm;
