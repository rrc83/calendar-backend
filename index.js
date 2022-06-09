const express = require('express');
const { dbConecction } = require('./db/config');
const cors = require('cors');

require('dotenv').config();

//Crear el servidor de express
const app = express();

// Base de datos
dbConecction();
// Cors
app.use(cors());

//Lectura y parseo del body coger parametros de la request en formato JSON
app.use(express.json());

// Directorio público
app.use( express.static('public') );

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor arrancado en puerto ${process.env.PORT}`);
});
