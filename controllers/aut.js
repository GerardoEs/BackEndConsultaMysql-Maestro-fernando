//Para obtener el tipado del framework

const {response} = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/jwt");




const crearUsuario =async(req,res = response)=>{
//   console.log(req.body);

   const {email, name,paswoord} = req.body;


   try{
      //Verificar que no existe mas de un correo que sea unico
      const usuario = await Usuario.findOne({email})

      if(usuario){
         return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
         });
      }

      //Crar usuario con el modelo

      const dbUser = new Usuario(req.body);

      //Hashear la contraseña (Encryptar)

      const salt = bcryptjs.genSaltSync(10); //Esto genera como un prealaencryptacion
      dbUser.paswoord = bcryptjs.hashSync(paswoord, salt)


      //Generar el JWT

      const token = await generarJWT (dbUser.id, name)


      //Crear usuario de base de datos

      await dbUser.save();

      //Generar respusta exitosa
      return res.status(201).json({
         ok: true,
         uid: dbUser.id,
         name,
         email,
         token
      });

   } catch(error){
      console.log(error)
      return res.status(500).json({
         ok: false,
          msg: 'Hable con el administrador'
         });
     

   }


 }

const crearLogin = async (req,res=response)=>{
   const  {email, paswoord} = req.body;

   try {
      const dbUser = await Usuario.findOne({email: email});
      //Vericia oero no existe el correo
      if(!dbUser){
         return res.status(400).json({
            ok: false,
            msg: 'El correo no existe'
         }) 
      }
         //Verifica y si exsite el usuario y compareSync solo verifica no crea el encryptado

      const validaPassword= bcryptjs.compareSync(paswoord, dbUser.paswoord);
      
      if(!validaPassword){
         return res.status(400).json({
            ok: false,
            msg: 'El passwood no es valido'
         }) 
      }

      //Generar el JWT
      const token = await generarJWT (dbUser.id, dbUser.name)
      //Respuesta del Servicio
      return res.json({
         ok: true,
         uid: dbUser.id,
         name: dbUser.name,
         email: dbUser.email,
         token
      })

   }catch(error) {
      console.log("Error ", error)
      return res.stus(500).json({
         ok: false,
         msg: "Hable con el administrador"
      })
   }    

  
 }


 const revalidartoken=async (req,res=response)=>{
   //Aqui cachamos los elementos respodidos por el req del mideelware validar-jwt.js
   //const {uid, name, email} = req; //forma a
   const {uid} = req
   
   //Leemos nuevamente la base de datos para obtener el emai

   
    const dbUser = await Usuario.findOne({uid:uid});
    
    //console.log("revalida Token ubica",uid)
      //Vericia oero no existe el id
    //  if(!dbUser){
      //   return res.status(400).json({
       //     ok: false,
        //   msg: 'El correo no existe'
        // })
     // }
   
   
    //Hacemos un nuevo JWT
     
   //const token = await generarJWT (uid, name, email); //forma a

   const token = await generarJWT (uid, dbUser.name);
   
   
   
   
   return res.json({
         ok: true,
         uid,
         name: dbUser.name,
         email: dbUser.email,
         token
      })
    

}

 module.exports = {
    crearUsuario,
    crearLogin,
    revalidartoken
   
 }