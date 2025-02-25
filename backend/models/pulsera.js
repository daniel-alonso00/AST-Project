const mongoose = require("mongoose")

const pulsera = new mongoose.Schema({
  nombre: String,
  precio: Number,
  talla: Number
})

module.exports = mongoose.model("Pulsera", pulsera)
