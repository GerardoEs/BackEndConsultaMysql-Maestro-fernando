const {Router} = require("express");
const { check } = require("express-validator");
const { crearUsuario, crearLogin, revalidartoken } = require("../controllers/aut");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt");




const router = Router();


//Crear un nuevo usuario
router.post("/new",
check("name","El nombre es obligatorio").not().isEmpty(),
check('email','El email es obligatorio').isEmail(),
check('paswoord','El passwoord es requerido').isLength({ min: 6 }),
validarCampos
,crearUsuario);



//Login de usuario
router.post("/",
[check('email','El email es obligatorio').isEmail(),
check('paswoord','El passwoord es requerido').isLength({ min: 6 }),
validarCampos]
,crearLogin);

 //Validar y revaidar Token
router.get("/renew",validarJWT,revalidartoken);
 
 

module.exports = router;
