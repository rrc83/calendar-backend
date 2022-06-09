const {request,response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req=request,res=response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'Falta identificador de sesion'
        })
    }

    try{
        const payload = jwt.verify(token,process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;
    }catch(e){
        
        res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }

    next();
};


module.exports = {
    validarJWT
}