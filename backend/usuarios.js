const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Usuario = require('./models/usuario')
const { type } = require("os")
const { measureMemory } = require("vm")

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
app.post('/usuario', async (req,res) => {
  try {
    permisos = req.body.rolUsuario;
    nombre = req.body.nombre;

    const newUsuario = new Usuario({
      permisos : permisos,
      nombre: nombre
    })
    const usuarioGuardado = await newUsuario.save();
    res.status(200).json({message: "Usuario creado correctamente", _id: usuarioGuardado._id});

  } catch (error) {
    res.status(500).json({message: "Error al crear el usuario"});
  }
})

// --DELETE--
app.delete('/usuario/:_id', async (req,res) => {
  try {
    const _id = req.params._id;
    let usuario = await Usuario.findByIdAndDelete(_id);

    if(!usuario){
      return res.status(404).json({message: "Usuario no encontrado"});
    }
    res.status(200).json({message:"Usuario eliminado correctamente"});

  } catch (error) {
    res.status(500).json({message: "Error al borrar el usuario"});
    
  }
})

// Filtrado por rol
app.get('/getRolById/:_id',async (req,res) =>{
  try {
    const _id = req.params._id;

    let usuario = await Usuario.findById(_id);

    const rol = usuario.permisos;

    res.status(200).json({rol});
    
  } catch (error) {
    res.status(500).json({message: "Error al buscar el rol"});
  }
})

//app.get('/getUserByTipo/:')