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
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected')

    // Escucha en puerto 8080
    app.listen(8080, () => {
      console.log("Localhost listening on 8080.")
    })
  })
  .catch(err => console.log('Error connecting MongoBD: ', err));

// --- GET ---
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})



app.get('/joya/anillo/all', async (req, res) => {
  try {
    let anillos = await Anillo.find({});
    res.json(anillos)
  } catch {
    res.status(500).json({ error: 'Error al obtener los anillos' });
  }
});

// --- POST ---
app.post('/joya/anillo', (req, res) => {
  try{
    nombre = req.body.nombre
    precio = req.body.precio
    gema = req.body.gema
  
    const newAnillo = new Anillo({
      nombre: nombre,
      precio: precio,
      gema: gema
    })
  
    newAnillo.save()
    res.status(201).json({ message: "Anillo creado correctamente", anillo: newAnillo });

  }catch(error){
    res.status(500).json({ error: "Error al crear el anillo", details: error.message });
  }

})


// Nueva ruta para obtener todos los anillos
app.get('/joyas/anillos', async (req, res) => {
  try {
    const anillos = await Anillo.find();
    res.json(anillos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los anillos", details: error.message });
  }
});