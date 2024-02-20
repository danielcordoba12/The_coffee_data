import React from "react";
import App from "../App";
import Login from "../components/login/login.jsx";




const Main = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
        const parseJwt = (token) => {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
            return JSON.parse(jsonPayload);
        };

        const tokenExp = parseJwt(token).exp * 1000;
        const tokenExistAndStillValid = tokenExp > Date.now();

        if (tokenExistAndStillValid) {
            return <App />;
        }
    }
    
    return <Login />;
};


export default Main;
