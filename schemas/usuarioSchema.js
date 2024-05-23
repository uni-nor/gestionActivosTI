const mongoose = require('mongoose')            //paquetes requeridos

const usuarioSchema = mongoose.Schema({            //creamos nuestro esquema de mongoose
    name: {                                     // Este objeto define las diferentes propiedades del usuarioSchema. 
        type: String,                           // Mongoose convertirá nuestro usuarioSchema en un documento en la base de datos
        required: true,                         // y esas propiedades se convertirán en campos en nuestro base de datos.
        unique:true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
        // ,
        // validate: value => {
        //     if (!validator.isEmail(value)) {     // valida si e texto introducido es un email válido
        //         throw new Error({error: 'Dirección de correo inválida'})
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{                                  // almacenaremos una lista de tokens
        token: {                                // permite que un usuario inicie sesión en diferentes dispositivos
            type: String,                       // y una vez que cierra la sesión de un dispositivo, todavía queremos asegurarnos
            required: true                      // de que todavía estén conectados en otro dispositivo en el que habían iniciado sesión
        },
        codigo: {                                // permite que un usuario inicie sesión en diferentes dispositivos
            type: String,                       // y una vez que cierra la sesión de un dispositivo, todavía queremos asegurarnos
            required: true                      // de que todavía estén conectados en otro dispositivo en el que habían iniciado sesión
        }
    }]
}
,{
   versionKey: false, 
   timestamps: false,
});
 module.exports=usuarioSchema;