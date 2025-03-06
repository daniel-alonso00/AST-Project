const mongoose = require("mongoose")
const express = require("express")
const app = express()

const Anillo = require('./models/anillo')
const Pulsera = require('./models/pulsera')
const Collar = require('./models/collar')
const Pendiente = require('./models/pendiente')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Conectar con Mongodb
mongoose.connect('mongodb://127.18.33.244:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected')

    // Escucha en puerto 8080
    app.listen(8080, () => {
      console.log("Localhost listening on 8080.")
    })
  })
  .catch(err => console.log('Error connecting MongoBD: ', err));

// --- GET ---
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get('/joya/anillo/all', (req, res) => {
  Anillo.find({}, (err, anillos) => {
    var mapAnillos = {};

    anillos.forEach(anillo => {
      mapAnillos[anillo._id] = anillo
    });

    res.send(mapAnillos)
  });
})

// --- POST ---
app.post('/joya/anillo', (req, res) => {
  nombre = req.body.nombre
  precio = req.body.precio
  gema = req.body.gema

  const newAnillo = new Anillo({
    nombre: nombre,
    precio: precio,
    gema: gema
  })

  newAnillo.save()
})
