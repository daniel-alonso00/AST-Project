const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Compra = require('./models/compra')

// Conectar con Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected (from compras.js)')

    // Escucha en puerto 8080
    app.listen(8070, () => {
      console.log("Localhost listening on 8070.")
    })
  })
  .catch(err => console.log('Error connecting MongoBD: ', err));

// --- GET ---  
app.get('/', async (req,res) => {
  res.send("Pagina de compras")
})

app.get('/compras', async (req, res) => {
  try {
    let compras = await Compra.find({});
    res.json(compras)
  } catch {
    res.status(500).json({ message: 'Error al obtener las compras' });
  }
});

app.post('/compra', async (req, res) => {
  try {
    idArticulo = req.body.idArticulo
    idCliente = req.body.idCliente
    cantidad = req.body.cantidad
    nombreCliente = req.body.nombreCliente
    direccion = req.body.direccion

    let newCompra = new Compra({
      idArticulo: idArticulo,
      idCliente: idCliente,
      cantidad: parseInt(cantidad),
      nombreCliente: nombreCliente,
      direccion: direccion
    });

    newCompra.save();
    res.status(200).json({ message: "Compra creada correctamente" })
  } catch {
    res.status(500).json({ message: "Error al crear compra" })
  }
});
