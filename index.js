// Importamos express, dotenv

import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import Conexion from "./classes/Conexion.js";
import cors from 'cors';

// Creamos instancia de Conexion;
const ConexionDB = new Conexion();
const startConection = async () => {
    await ConexionDB.getConexion();
}
startConection();



// Creamos express e inicializamos dotenv
const app = express();
dotenv.config();



// Definimos el puerto obteniendo la variable de entorno PORT de .env y la variable URI_DB
const PORT = process.env.PORT;

app.use(cors({
    origin: '*', // Para que cualquier aplicación pueda hacer peticiones a nuestra API (podemos ponerle que sea única y exclusivamente para nuestra app si quieren)
    // credentials: true, // Para lo que es JWT (Json Web Token)
}))
app.use( express.json() );
app.use('/', express.static('public'));


app.listen(PORT, (req, res) => {
    console.log(`Server en el puerto ${PORT}`);
})

// Pasamos app a routerAPI
routerAPI(app);