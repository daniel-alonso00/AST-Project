const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Usuario = require('./models/usuario')
const { type } = require("os")

// Conectar con Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected (from usuario.js)')

    // Escucha en puerto 8080
    app.listen(8060, () => {
      console.log("Localhost listening on 8060.")
    })
  })
  .catch(err => console.log('Error connecting MongoBD: ', err));

// --- GET ---
app.get('/', async (req,res) => {
  res.send("Pagina de usuarios")
})

app.get('/usuario', async (req, res) => {
  try {
    let usuarios = await Usuario.find({});
    res.json(usuarios)
  } catch {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// --POST--
app.post('/usuario', (req,res) => {
  try {
    permisos = req.body.rolUsuario;
    nombre = req.body.nombre;

    const newUsuario = new Usuario({
      permisos : permisos,
      nombre: nombre
    })
    newUsuario.save()
    res.status(201).json({message: "Usuario creado correctamente"});

  } catch (error) {
    res.status(500).json({message: "Error al crear el usuario"});
  }
})
