const mongoose = require("mongoose")

const anillo = new mongoose.Schema({
  nombre: String,
  precio: Number,
  gema: String,
})

module.exports = mongoose.model("Anillo", anillo)
