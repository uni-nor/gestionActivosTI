const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Usuario = require('../model/Usuario');
const { application } = require('express');

const auth = async(req, res, next) => {
    const strAuth=req.header('Authorization');
    if(strAuth==undefined) return res.json({mensaje:"no tiene autorizacion en el encabezado"});
    const token = strAuth.replace('Bearer ', '')                //obtenemos el token del request header y dado que el token viene en un formato de Bearer[space]token, reemplazamos Bearer [space] con vacio ('')
    var data;
    try {
        data = jwt.verify(token, process.env.JWT_KEY);       //verificar si el token recibido es válido o fue creado usando nuestra JWT_KEY
    } catch (error) {        
        return res.status(401).send({error:"token expirado o no valido"});// algun error con el token, expiracion, firma o formato erroneo
    }
    try {
        const usuario = await Usuario.findOne({ _id: data._id, 'tokens.codigo': data.codigo })   //ahora podemos encontrar un usuario con esa identificación y también si el token está en la matriz de tokens del usuario.
        // const usuario = await Usuario.findOne({ _id: data._id, 
        //     $where: function() {
        //         this.tokens.forEach(async function(tk) {
        //             const isMatch = await bcrypt.compare(token,this.token )
        //             if (!isMatch) return true;
        //         });
        //         return false;
        //      }
        // })   //ahora podemos encontrar un usuario con esa identificación y también si el token está en la matriz de tokens del usuario.
        
        if (!usuario) {
            return res.status(404).send({ mensaje:"No está autorizado para acceder a este recurso"})
            //throw new Error()
        }
        req.usuario = usuario;                                                             //adjuntamos el usuario a nuestra solicitud
        req.token = token;                                                           //hacemos lo mismo para el token
        req.codigo = data.codigo;
        next()                                                                      //next() para ir al siguiente middleware. Si no se llama a next(), la aplicación se congelaría en ese punto y no procedería a ejecutar el resto del código
    } catch (error) {
        res.status(401).send({ error:error.message})
        //res.status(401).send({ error: 'No está autorizado para acceder a este recurso' })
    }

}
module.exports = auth