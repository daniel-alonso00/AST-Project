const mongoose = require("mongoose");

const usuario = new mongoose.Schema({
  permisos: String,     //String con el rol: "administrador" o "cliente"
  nombre: String  //Añadimos el ombre del usuario
})

module.exports = mongoose.model("Usuario", usuario)
