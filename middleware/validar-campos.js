const express = require('express');
const {validationResult} = require('express-validator');
const moment = require('moment');

const validarCampos = (req,res=express.response,next) =>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }
    next();
}

const validarStartEnd = (req,res=express.response,next) =>{
    const{start,end} = req.body;
    const mS = moment(start);
    const mE = moment(end);

    if (mS.isSameOrAfter(mE)){   
        return res.status(400).json({
            ok:false,
            msg:'La fecha de fin debe ser mayor a la fecha de inicio'
        });
    }
    next();
}

module.exports = {
    validarCampos,
    validarStartEnd
}
