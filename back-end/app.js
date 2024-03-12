import express from "express";
import body_parser from "body-parser";
import usuarioRoute from "./src/routers/usuario.router.js";
import muestraRoute from "./src/routers/muestra.router.js";
import fincaRoute from "./src/routers/finca.route.js";
import municipioRoute from "./src/routers/municipio.route.js";
import variedadesRoute from "./src/routers/variedades.route.js";
import loteRoute from "./src/routers/lote.router.js";
import analisisRoute from "./src/routers/analisis.router.js";
import resultadoRoute from "./src/routers/resultado.router.js";
import cafeRoute from "./src/routers/cafe.router.js";
import departamentoRoute from "./src/routers/departamento.route.js"; 
import autRoute from "./src/routers/autenticacion.router.js";
import cors from 'cors';


const app = express();

const host = process.env.DB_HOST


app.use(cors({
    origin: `http://${host}:5173`,
    credentials : true,
}));

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));Poder trabajar con el formato json



app.use((re,res,next)=>{
    res.setHeader(`Access-Control-Allow-Origin`,`http://${host}:5173`);
    res.setHeader(`Access-Control-Allow-Methods`,`GET,POST,PUT,DELETE,PATCH`);
    res.setHeader(`Access-Control-Allow-Headers`,`Content-Type, Authorization`);
    res.setHeader(`Access-Control-Allow-Credentials`,`true`);
    next();

});

app.use("/usuario", usuarioRoute);
app.use("/muestra",muestraRoute);
app.use("/finca",fincaRoute);
app.use('/municipio',municipioRoute);
app.use('/variedad',variedadesRoute);
app.use('/lote',loteRoute);
app.use('/analisis',analisisRoute);
app.use('/resultado',resultadoRoute);
app.use('/cafe',cafeRoute);
app.use('/departamento',departamentoRoute);
app.use('/validacion',autRoute)




app.set ('view engine','ejs');
app.set('views','./src/view');

app.use(express.static('./src/styles'));

app.get('/documents', (req,res) =>{
    res.render('index.ejs');

});

app.listen(4000, () => {
    console.log("Servidor se esta ejecutando en el puerto 4000");
});

// app.use(cors());
