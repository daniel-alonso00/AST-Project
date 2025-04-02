const mongoose = require("mongoose");

const compra = new mongoose.Schema({
  permisos: Boolean     // <- true: Admin; false: No-Admin. |!| => Igual hay que cambiar este campo a String
})

module.exports = mongoose.model("Compra", compra)
