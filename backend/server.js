const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

const Anillo = require('./models/anillo')
const Pulsera = require('./models/pulsera')
const Collar = require('./models/collar')
const Pendiente = require('./models/pendiente')

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

app.get('/anillos', async (req, res) => {
  try {
    let anillos = await Anillo.find({});
    res.json(anillos)
  } catch {
    res.status(500).json({ error: 'Error al obtener los anillos' });
  }
});

app.get('/pulseras', async (req, res) => {
  try {
    let pulseras = await Pulsera.find({});
    res.json(pulseras)
  } catch {
    res.status(500).json({ error: 'Error al obtener los pulseras' });
  }
});

app.get('/collares', async (req, res) => {
  try {
    let collares = await Collar.find({});
    res.json(collares)
  } catch {
    res.status(500).json({ error: 'Error al obtener los collares' });
  }
});

app.get('/pendientes', async (req, res) => {
  try {
    let pendientes = await Pendiente.find({});
    res.json(pendientes)
  } catch {
    res.status(500).json({ error: 'Error al obtener los pendientes' });
  }
});

// --- POST ---
app.post('/anillo', (req, res) => {
  try {
    nombre = req.body.nombre
    precio = req.body.precio
    gema = req.body.extra

    const newAnillo = new Anillo({
      nombre: nombre,
      precio: precio,
      gema: gema
    })

    newAnillo.save()
    res.status(201).json({ message: "Anillo creado correctamente", anillo: newAnillo });

  } catch(error) {
    res.status(500).json({ error: "Error al crear el anillo", details: error.message });
  }

})

app.post('/pulsera', (req, res) => {
  try {
    nombre = req.body.nombre
    precio = req.body.precio
    talla = req.body.extra

    const newPulsera = new Pulsera({
      nombre: nombre,
      precio: precio,
      talla: talla
    })

    newPulsera.save()
    res.status(201).json({ message: "Pulsera creada correctamente", pulsera: newPulsera });

  } catch(error) {
    res.status(500).json({ error: "Error al crear la pulsera", details: error.message });
  }

})

app.post('/collar', (req, res) => {
  try {
    nombre = req.body.nombre
    precio = req.body.precio
    color = req.body.extra

    const newCollar = new Collar({
      nombre: nombre,
      precio: precio,
      color: color
    })

    newCollar.save()
    res.status(201).json({ message: "Collar creado correctamente", collar: newCollar });
  } catch(error) {
    res.status(500).json({ error: "Error al crear el collar", details: error.message });
  }

})

app.post('/pendiente', (req, res) => {
  try {
    nombre = req.body.nombre
    precio = req.body.precio
    metal = req.body.extra

    const newPendiente = new Pendiente({
      nombre: nombre,
      precio: precio,
      metal: metal
    })

    newPendiente.save()
    res.status(201).json({ message: "Pendiente creado correctamente", collar: newPendiente });

  } catch(error) {
    res.status(500).json({ error: "Error al crear el pendiente", details: error.message });
  }
})

// --- PUT ---
app.put('/anillo', async (req, res) => {
  try {
    _id = req.body._id
    nombre = req.body.nombre
    precio = req.body.precio
    gema = req.body.gema

    await Anillo.updateOne({ _id: _id }, {
      nombre: nombre,
      precio: precio,
      gema: gema
    })

    res.status(201).json({ message: "Anillo actualizado correctamente" });

  } catch(error) {
    res.status(500).json({ error: "Error al crear el anillo", details: error.message });
  }

})

app.put('/pulsera', async (req, res) => {
  try {
    _id = req.body._id
    nombre = req.body.nombre
    precio = req.body.precio
    talla = req.body.talla

    await Pulsera.updateOne({ _id: _id }, {
      nombre: nombre,
      precio: precio,
      talla: talla
    })

    res.status(201).json({ message: "Pulsera actualizada correctamente" });

  } catch(error) {
    res.status(500).json({ error: "Error al crear la pulsera", details: error.message });
  }

})

app.put('/collar', async (req, res) => {
  try {
    _id = req.body._id
    nombre = req.body.nombre
    precio = req.body.precio
    color = req.body.color

    await Collar.updateOne({ _id: _id }, {
      nombre: nombre,
      precio: precio,
      color: color
    })

    res.status(201).json({ message: "Collar actualizado correctamente" });
  } catch(error) {
    res.status(500).json({ error: "Error al crear el collar", details: error.message });
  }
})

app.put('/pendiente', async (req, res) => {
  try {
    _id = req.body._id
    nombre = req.body.nombre
    precio = req.body.precio
    metal = req.body.metal

    await Pendiente.updateOne({ _id: _id }, {
      nombre: nombre,
      precio: precio,
      metal: metal
    })

    res.status(201).json({ message: "Pendiente actualizado correctamente" });

  } catch(error) {
    res.status(500).json({ error: "Error al crear el pendiente", details: error.message });
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