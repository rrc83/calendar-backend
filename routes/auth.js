// Rutas de autenticacion de usuarios
// host + /api/auth

const {Router} = require('express');
const router = Router();
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth')
const {check} = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

router.post('/',[check('email','El email es obligatorio').isEmail(),
                 check('password','La password debe tener al menos 6 caracteres').isLength({min:6}),
                 validarCampos
] ,loginUsuario);

router.post('/new',
             [check('name','El name es obligatorio').not().isEmpty(),
              check('email','El email es obligatorio').isEmail(),
              check('password','La password es obligatoria').isLength({min:6}),
              validarCampos
             ] ,
             crearUsuario);

router.get('/renew',validarJWT,revalidarToken);

module.exports = router;