const mongoose = require("mongoose");

const compra = new mongoose.Schema({
  idArticulo: String,
  idCliente: String,
  cantidad: Number,
  nombreCliente: String,
  direccion: String,
  existencias: Boolean,
  modificaciones: Number
})

module.exports = mongoose.model("Compra", compra)
