const mongoose = require("mongoose");

const compra = new mongoose.Schema({
  idArticulo: mongoose.Schema.ObjectId,
  idCliente: mongoose.Schema.ObjectId,
  cantidad: Number,
  nombreCliente: String,
  direccion: String
})

module.exports = mongoose.model("Compra", compra)
