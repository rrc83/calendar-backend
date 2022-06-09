const bcrypt = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req,res=response)=>{

    const {email,password} = req.body;
    try{
        let usuario = await Usuario.findOne({email});

       if(usuario){
           return res.status(400).json({
               ok:false,
               msg:`El usuario [${email}] ya está registrado en la base de datos`
           });
       }

        usuario = new Usuario(req.body);
        // Encriptar contraseña
       const salt = bcrypt.genSaltSync( );
       usuario.password = bcrypt.hashSync(password,salt);

       await usuario.save();
         // Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);
        res.status(201).json({
            ok:true,
            id:usuario.id,
            name:usuario.name,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg:'Se ha producido un error en el proceso'
        })
    }
};
const loginUsuario = async (req,res=response)=>{
    
   const {email,password} = req.body;

   try{
        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:`Usuario y contraseña no son correctos.`
            });
        }
        // Confirmar contraseñas
        const validPassword = bcrypt.compareSync(password,usuario.password);

        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:`Usuario y contraseña no son correctos.`
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(200).json({
            ok:true,
            id:usuario.id,
            name:usuario.name,
            token
        });
   }catch(e){
        console.log(e);
         res.status(500).json({
            ok:false,
            msg:'Se ha producido un error en el proceso'
        });
    }

};

const revalidarToken = async (req,res=response)=>{
    const {uid,name} = req;

    // Generar nuevo JWT
    const token = await generarJWT(uid,name);
    res.json({
        ok:true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}