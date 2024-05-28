// importacion de librerias
const express=require('express');
const mongoose=require("mongoose");
const cors=require("cors");
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

//configurando cors
var corsOptions = {
    origin:["http://localhost:4200","http://localhost:4200/*"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

//conectando con mongo
mongoose.connect(MONGO_URI).then(
    ()=>{
        console.log("conexion mongo establecida");
        app.listen(PORT,()=>{console.log("Servidor express corriendo en el puerto:"+PORT);});
    }
).catch(error=>console.log("error de conexion",error));


app.use("/usuario",usuarioRutas)
//app.use("/activos",auth,activoRutas);
// app.use("/titular",auth,titularRutas);
// app.use("/ubicacion",auth,ubicacionRutas);
// app.use("/seguimiento",auth,seguimientoRutas);
app.use("/activos",activoRutas);
app.use("/titular",titularRutas);
app.use("/ubicacion",ubicacionRutas);
app.use("/seguimiento",seguimientoRutas);

