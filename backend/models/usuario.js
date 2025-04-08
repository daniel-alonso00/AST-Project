const mongoose = require("mongoose");

const usuario = new mongoose.Schema({
  permisos: Boolean,     // <- true: Admin; false: No-Admin. |!| => Igual hay que cambiar este campo a String
  nombre: String  //Añadimos el ombre del usuario
})

module.exports = mongoose.model("Usuario", usuario)
