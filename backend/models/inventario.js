const mongoose = require("mongoose");

const inventario = new mongoose.Schema({
  tipo: Number,
  nombre: String,
  precio: Number,
  cantidad: Number
})

module.exports = mongoose.model("Inventario", inventario)
