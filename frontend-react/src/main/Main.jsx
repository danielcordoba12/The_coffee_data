import React from 'react';
import App from "../App";
import Dashboard from "../components/dashboard";
import Inicio from "../components/login/Inicio";
import { data } from 'jquery';

    if (localStorage.getItem("token")) {
        function parseJwt(token) {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/\_/g, "/").replace(/-/g, "+");
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split("")
                    .map(function(c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
          return JSON.parse(jsonPayload);
                }
                var tokenExistAndStillVAlid  = (parseJwt(localStorage.getItem("token")).exp*1000 > Date.now());
}
 

const Main =() => {
    return <>{tokenExistAndStillVAlid ? <App /> :<Inicio />}</>;
};
export default Main;
