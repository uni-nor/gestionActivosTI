const mongoose = require('mongoose')            //paquetes requeridos
//const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usuarioSchema=require('../schemas/usuarioSchema');
//=====================================================================================================
//hashear password
//=====================================================================================================
usuarioSchema.pre('save', async function (next) {                      // nos permite hacer algo antes de guardar el objeto creado
    // Encriptar el password antes de guardarlo en el model usuario
    const usuario = this
    if (usuario.isModified('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10)         //usamos bcrypt para encriptar la contraseña
    }                                                               // asegurarnos de que solo usemos hash de la contraseña si se modifica
    next()                                                          //  y es por eso que primero tenemos que verificar si la contraseña se modificó.
})

//=====================================================================================================
//firmar jwt y guardar en usuario 
//=====================================================================================================
usuarioSchema.methods.generateAuthToken = async function() {
    // Generar un método de autenticación para el usuario
    const usuario = this;
    var codigo = usuario._id+(new Date()).getTime()*Math.round(Math.random()*100);
    // console.log(idFechaHora);
    const token = jwt.sign({_id: usuario._id, codigo:codigo}, process.env.JWT_KEY, {expiresIn:process.env.JWT_EXPIRACION})    //Este método utiliza el JWT para firmar el método para crear un token. El método firmado espera los datos que se utilizarán para firmar el token y una clave JWT que puede ser una cadena aleatoria. Para nuestro caso, definimos uno en el archivo .env y lo llamamos JWT_KEY.
    //usuario.tokens = usuario.tokens.concat({token})                       //Una vez creado el token, lo agregamos a la lista de tokens del usuario
    
    usuario.tokens = usuario.tokens.concat({token:token,codigo:codigo});//bcrypt.hash(token, 10)
    await usuario.save();                                               //guardamos
    return token;                                                    //devolvemos el token
}

//=====================================================================================================
//buscar usuario y comparar contraseña
//=====================================================================================================
usuarioSchema.statics.findByCredentials = async (email, passwordCandidato) => { //espera dos parámetros, el correo electrónico del usuario y la contraseña
    // Buscar el usuario por email y password.
    const usuario = await Usuario.findOne({ email} )                              ////buscamos un usuario con el correo electrónico proporcionado utilizando el método de búsqueda de mongoose
    if (!usuario) {                                                            //Si el usuario no está disponible, arrojamos un error para informarle 
        //throw new Error({ error: 'Credenciales de login inválidas' })       //que las credenciales que proporcionó no son válidas
        return ({mensaje:"Credenciales de acceso inválidas.", usuario:null})
    }
    const isPasswordMatch = await bcrypt.compare(passwordCandidato, usuario.password)   //comparamos la contraseña recibida con la contraseña almacenada y si coinciden, devolvemos ese usuario. Utilizaremos esta función para registrar a los usuarios en la aplicación.
    if (!isPasswordMatch) {                             
        //throw new Error({ error: 'Credenciales de login inválidas' })
        return ({mensaje:"Credenciales de login inválidas", usuario:null})
    }
    return ({mensaje:"OK",usuario:usuario})
}

//=====================================================================================================
const Usuario = mongoose.model('Usuario', usuarioSchema,'usuario')                             //creamos un modelo llamado Usuario y le pasamos nuestro esquema de usuario creado
module.exports = Usuario                                                       //exportamos el módulo para que pueda reutilizarse en otros archivos.