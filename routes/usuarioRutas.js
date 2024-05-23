const auth = require('../middleware/auth')              //importamos el middleware de autenticación
const express = require('express')
const Usuario = require('../model/Usuario')
const {listarUsuarios, crearUsuario, login, logout, logoutall}=require("../controllers/usuarioController");

const rutas = express.Router()

//rutas para obtener el perfil de usuario -> solicitud al endpoint /usuarios/me // Ver el profile del usuario logeado               //obtengo el perfil de usuario de la solicitud
rutas.get('/listar', auth,listarUsuarios);
// Crear nuevo usuario
rutas.post('/crear',auth,crearUsuario);
//Inicia sesión de un usuario registrado
rutas.post('/login', login)
// Logout del usuario de la aplicación
rutas.get('/logout', auth, logout);

// Logout del usuario de todos los dispositivos
rutas.get('/logoutall', auth, logoutall);

module.exports = rutas