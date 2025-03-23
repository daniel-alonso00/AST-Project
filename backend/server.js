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
    res.status(500).json({ message: 'Error al obtener la joya' });
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
    res.status(201).json({ message: "Joya creada correctamente" });

  } catch(error) {
    res.status(500).json({ message: "Error al crear la joya" });
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
    res.status(500).json({ message: "Error al crear la joya" });
  }
})

// Filtrado por ID mediante solitud al backend
app.get('/getById/:_id?', async (req,res)=>{
  try {
    _id = req.params._id;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "ID inválido o no proporcionado" });
    }

    let joya = await Inventario.findOne({_id: new mongoose.Types.ObjectId(_id)});

    if(!joya){
      return res.status(404).json({ message: "Articulo no encontrado"});
    }
    res.status(200).json({joya: joya});    

  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el articulo" });
  }
})

// Filtrado por tipo
app.get('/getTipo/:tipo', async (req, res) => {
  try {
    tipo = req.params.tipo;
    let joyas = await Inventario.find({ tipo: tipo });
    res.status(200).json({joyas: joyas});
  } catch(error) {
    res.status(500).json({ message: "Tipo no valido" })
  }
});

// --- DELETE ---
app.delete('/inventario/:_id', async (req, res) =>{
  try {
    const _id = req.params._id;

    const item = await Inventario.findByIdAndDelete(_id);
    

    if (!item) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }
    // Responder con éxito
    res.status(200).json({ message: "Articulo eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al borrar el articulo" });
  }
})
