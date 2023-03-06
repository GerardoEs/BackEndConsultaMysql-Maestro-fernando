const mongoose = require("mongoose")

const dbConexion = async()=>{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.BD_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
                //useCreateIndex: true   
            });

            console.log("BD online");
            

    }catch(error){
        console.log(error);
        throw new Error("Error a la hora de inicializar la BD");
    }
}

module.exports = { 
    dbConexion
}