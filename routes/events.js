/**
 * Events routes
 * Host + /api/event
 * 
 */

const { validarJWT } = require("../middleware/validar-jwt");
const {Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const {check} = require("express-validator");
const { validarCampos,validarStartEnd } = require('../middleware/validar-campos');
const { myIsDate } = require("../helpers/myIsDate");
const router = Router();

// Para hacer pasar todas las peticiones por la validacion del JSON Web Token
// si quisieramos que para getEventos no se validara el JWT bastaría con mover la linea debajo de router.get('/',getEventos)
router.use(validarJWT);

// Obtener eventos
router.get('/',getEventos);

// Crear evento
router.post('/',[
                    check('title','El título es obligatorio').not().isEmpty(),
                    check('start','La fecha de inicio es obligatoria').custom( myIsDate ),
                    check('end','La fecha de fin es obligatoria').custom( myIsDate ),
                    validarCampos,
                    validarStartEnd
                ],crearEvento);

// Actualizar evento
router.put('/:id',validarStartEnd,actualizarEvento);
 
// Borrar evento
router.delete('/:id',eliminarEvento);

module.exports = router;

