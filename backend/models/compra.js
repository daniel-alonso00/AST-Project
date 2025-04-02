const mongoose = require("mongoose");

const compra = new mongoose.Schema({
  idArticulo: Schema.ObjectId,
  idCliente: Schema.ObjectId,
  cantidad: Number,
  nombreCliente: String,
  direccion: String
})

module.exports = mongoose.model("Compra", compra)
