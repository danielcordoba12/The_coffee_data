import * as React from 'react';
import { useState } from 'react'; // Agregamos useState
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Función LoginForm
const LoginForm = () => {
    const [documento, setDocumento] = useState("");
    const [contraseña, setContraseña] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/validacion/validar", {
            method: "POST",
            headers:{   
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numero_documentos: documento,
                user_password: contraseña,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200){
                console.log(data.token);
                localStorage.setItem("token" , data.token);
                window.location();
            } else {
                
            }
        });
        
        console.log("documento", documento);
        console.log("contraseña", contraseña);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="numero_documentos"
                label="numero_documentos"
                name="numero_documentos"
                autoComplete="documento"
                autoFocus
                value={documento} // Actualizamos el valor con el estado
                onChange={(e) => setDocumento(e.target.value)} // Actualizamos el estado
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="contruser_passwordaseña"
                label="user_password"
                type="password"
                id="user_password"
                autoComplete="current-password"
                value={contraseña} // Actualizamos el valor con el estado
                onChange={(e) => setContraseña(e.target.value)} // Actualizamos el estado
            />
            
            <Button
            onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
            >
                Sign In
            </Button>
            
        </Box>
    );
};

const defaultTheme = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            documento: data.get('documento'),
            contraseña: data.get('contraseña'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {/* Reemplazamos el formulario por el componente LoginForm */}
                    <LoginForm />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
