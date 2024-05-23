
const Usuario = require('../model/Usuario')
//=====================================================================
//1.- GET LISTAR
//=====================================================================
const listarUsuarios= async(req, res) => {      //rutas para obtener el perfil de usuario -> solicitud al endpoint /usuarios/me
    // Ver el profile del usuario logeado               
    res.send(req.usuario)                                  //obtengo el perfil de usuario de la solicitud
}

//=====================================================================
//2.- POST CREAR
//=====================================================================
const crearUsuario= async (req, res) => {
    // Crear nuevo usuario
    try {
        const usuario = new Usuario(req.body)                 // crea un nuevo usuario junto con la información de usuario suministrada a la que accedemos desde req.body
        await usuario.save()                               // guarda e usuario
        const token = await usuario.generateAuthToken()    //generamos un token de autenticación
        res.status(201).send({ usuario, token })           //lo devolvemos (el token) como respuesta junto con los datos del usuario
    } catch (error) {
        res.status(400).send(error)
    }
}

//=====================================================================
//3.- POST login
//=====================================================================
const login= async(req, res) => {
    //Inicia sesión de un usuario registrado
    //const ip = req.header('x-forwarded-for');
    // console.log(`La ip del usuario e ${ip}`)
    try {
        const { email, password } = req.body;
        const {mensaje,usuario} = await Usuario.findByCredentials(email, password);
        if (!usuario) {
            return res.status(401).send({error: mensaje})
        }
        const token = await usuario.generateAuthToken()
        res.send({ usuario, token })
    } catch(error) {
        res.status(400).json({mensaje:error.message});
    }

}

//=====================================================================
//4.- POST logout
//=====================================================================
const logout=async (req, res) => {
    // Logout del usuario de la aplicación
    try {
        req.usuario.tokens = req.usuario.tokens.filter((x) => {   // filtramos la matriz de tokens del usuario -> 
            return x.codigo != req.codigo                     // devolvemos true si alguno de los tokens no es igual al token que utilizó el usuario para iniciar sesión -> El arreglo filter method crea una nuevo arreglo con todos los elementos que pasan la prueba implementada. En nuestro caso anterior, el método de filtro devolverá un nuevo arreglo que contiene cualquier otro token aparte del que se usó para iniciar sesión
        })
        await req.usuario.save()
        res.send({mensaje:"se cerro sesion correspondiente al token:"+req.codigo});
    } catch (error) {
        res.status(500).send(error)
    }
}

//=====================================================================
//5.- POST logout all
//=====================================================================
const logoutall= async(req, res) => {
    // Logout del usuario de todos los dispositivos
    try {
        req.usuario.tokens.splice(0, req.usuario.tokens.length); // elimina todos los tokens del vector, desde la posicion cero hasta el ultimo elemento
        await req.usuario.save(); // guardar los cambio
        res.send({mensaje:"se cerro sesion en todos los dispoisitivos"});
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    listarUsuarios,
    crearUsuario,
    login,
    logout,
    logoutall
}