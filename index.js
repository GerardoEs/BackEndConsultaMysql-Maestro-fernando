const express = require ("express");
const cors = require("cors");
const {dbConexion} = require('./database/config');
const path = require("path");
//Archivo qye vincula al archivo creado .env para que almacene las variables de entorno
//agregando las del port
require("dotenv").config();

//Esto es para identificar las variables que existen en el env
//console.log(process.env);

//Crear ek servidor aplicacion de express

const app = express();

//Conexion a la BAse de Datos de Mongo

dbConexion();

//Directorio Publico (Busca lo que creamos en la carpeta public)
app.use(express.static('public'))

//CORS perimite leer entre url
app.use( cors());

//Lectura y parseo del body
app.use(express.json());

//Configurar Rutas

app.use('/api/auth',require("./routes/auth"));
//Manejador demaas rutas aqui cane todas las que no estan definitas en api/auth
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"public/index.html"))
})

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});