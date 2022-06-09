const mongoose = require('mongoose');
require('dotenv').config();
const dbConecction = async ()=>{
    try{
        await mongoose.connect(`${process.env.URI_DB}`,{
                                useNewUrlParser:true,
                                useUnifiedTopology:true});
        console.log('[mongo] - Conexión establecida con la base de datos')
    }catch(e){
        console.log(e);
        throw new Error('[mongo] - Error en conexion a BD');
        
    }
}

module.exports = {
    dbConecction
}