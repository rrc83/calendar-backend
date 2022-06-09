const { request } = require('express');
const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req,res=response)=>{
    const events = await Evento.find()
                               .populate('user','name');

    res.status(200).json({
        ok:true,
        events
    });
}

const crearEvento  = async (req,res=response)=>{
    const evento = new Evento(req.body);
    try{
        evento.user = req.uid;
        const eventoDb = await evento.save();
        res.status(200).json({
            ok:true,
            evento:eventoDb
        });
    }catch(e){
        res.status(500).json({
            ok:false,
            msg:'Se ha producido un error en el sistema'
        });
    }
   
} 

const actualizarEvento = async (req=request,res=response)=>{
    const eventoId = req.params.id;
    try{
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'El evento no existe.'
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg: 'No autorizado a realizar esta operacion.'
            });
        }

        const newEvento = {
            ...req.body,
            user:req.uid
        }
        // {new:true} es para que devuelva el evento que acabamos de actualizar
        // en caso contrario devuelve el anterior a la actualizacion
        const eventDb = await Evento.findByIdAndUpdate(eventoId,newEvento,{new:true});

        res.status(200).json({
            ok:true,
            evento:eventDb
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg:'Se ha producido un error'
        });
    }


    
}

const eliminarEvento = async (req,res=response)=>{
 const eventoId = req.params.id;
    try{
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'El evento no existe.'
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg: 'No autorizado a realizar esta operacion.'
            });
        }

       await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok:true,
            msg:'Evento eliminado'
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok:false,
            msg:'Se ha producido un error'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};