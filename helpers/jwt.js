const jwt = require ("jsonwebtoken");

//const generarJWT =(uid,name,email) => { //forma a

const generarJWT =(uid,name) => {

    const payload = {uid,name};
//resolve --si esta bien
//resolve si esta mal
    return new  Promise((resolve, reject) =>{
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        },(err, token)=>{
                if(err){
                    //Todo mal
                    console.log("Error de la semilla ",err)
                    reject(err);
                }else{
                    //Todo sale bien
                    resolve(token);
    
                }
        })
    })
    
}

module.exports ={
    generarJWT
}
