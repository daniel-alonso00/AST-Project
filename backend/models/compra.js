const mongoose = require("mongoose");

const compra = new mongoose.Schema({
  idArticulo: String,
  idCliente: String,
  cantidad: Number,
  nombreCliente: String,
  direccion: String
})

module.exports = mongoose.model("Compra", compra)
