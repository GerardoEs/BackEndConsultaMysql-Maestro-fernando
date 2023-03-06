const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT =(req, res = response, next)=>{


    const token= req.header("x-tokenkey");

    if(!token){
       return res.status(401).json({
          ok: false,
          msg: "Error en el token"
      })
    } 
 

    try{

        const {uid,name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
       // console.log("validar-jwt-Token",token)
        //console.log("validar-jwt",uid,name)

        //Aqui preparamos el uid y name para que puedan ser leidos en el controlador
        req.uid = uid;
        req.name = name;
      

    } catch(error){
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })

    }
// Todo sale bien
    next();

}

module.exports = {
    validarJWT
}
