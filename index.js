// importacion de librerias
const express=require('express');
const mongoose=require("mongoose");
require("dotenv").config();
const auth=require("./middleware/auth");

//CONSTANTES
const app=express();
//rutas
const usuarioRutas=require("./routes/usuarioRutas");
const activoRutas=require("./routes/activoRutas");
const titularRutas=require("./routes/titularRutas");
const ubicacionRutas=require("./routes/ubicacionRutas");
const seguimientoRutas=require("./routes/seguimientoRutas");

//configuracion de entorno (enviroment)
const PORT=process.env.PORT||6000;
//conexion mongo
const MONGO_URI=process.env.MONGO_URI;

// configuración convertir el cuerpo del request en json.
app.use(express.json());

mongoose.connect(MONGO_URI).then(
    ()=>{
        console.log("conexion mongo establecida");
        app.listen(PORT,()=>{console.log("Servidor express corriendo en el puerto:"+PORT);});
    }
).catch(error=>console.log("error de conexion",error));


app.use("/usuario",usuarioRutas)
app.use("/activos",auth,activoRutas);
app.use("/titular",auth,titularRutas);
app.use("/ubicacion",auth,ubicacionRutas);
app.use("/seguimiento",auth,seguimientoRutas);

