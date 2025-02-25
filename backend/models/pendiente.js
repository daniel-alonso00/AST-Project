const mongoose = require("mongoose")

const pendiente = new mongoose.Schema({
  nombre: String,
  precio: Number,
  metal: Number
})

module.exports = mongoose.model("Pendiente", pendiente)
