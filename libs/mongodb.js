import mongoose from "mongoose";
//Método que realiza la conexión con la BBDD
const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexion realizada");
    } catch (error){
        console.log(error);
    }
};

export default connectionDB;