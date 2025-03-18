const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

const Inventario = require('./models/inventario')
const tipoEnum = {
  anillo: 0,
  collar: 1,
  pendiente: 2,
  pulsera: 3
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

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

app.get('/inventario', async (req, res) => {
  try {
    let joyas = await Inventario.find({});
    res.json(joyas)
  } catch {
    res.status(500).json({ error: 'Error al obtener la joya' });
  }
});

// --- POST ---
app.post('/inventario', (req, res) => {
  try {
    tipo = req.body.tipo;
    nombre = req.body.nombre;
    precio = req.body.precio;
    cantidad = req.body.cantidad;

    const newJoya = new Inventario({
      tipo: tipo,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    })

    newJoya.save()
    res.status(201).json({ message: "Joya creada correctamente", anillo: newJoya });

  } catch(error) {
    res.status(500).json({ error: "Error al crear la joya", details: error.message });
  }

})

// --- PUT ---
app.put('/inventario', async (req, res) => {
  try {
    _id = req.body._id;
    tipo = req.body.tipo;
    nombre = req.body.nombre;
    precio = req.body.precio;
    cantidad = req.body.cantidad;

    await Inventario.updateOne({ _id: _id }, {
      tipo: tipo,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    })

    res.status(201).json({ message: "Joya actualizada correctamente" });
  } catch(error) {
    res.status(500).json({ error: "Error al crear la joya", details: error.message });
  }
})


//-- DELETE --
app.delete('/anillo', async (req, res) =>{
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ error: "Se requiere el _id del anillo para eliminarlo" });
    }

    const item = await Anillo.findByIdAndDelete(_id);

    if (!item) {
      return res.status(404).json({ error: "Anillo no encontrado" });
    }

    // Responder con éxito
    res.status(200).json({ message: "Anillo eliminado correctamente", deletedItem: item });
  } catch (error) {
    res.status(500).json({error: "Error al borrar el anillo", details: error.message });
  }
})