const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Usuario = require('./models/usuario');

// Conectar con Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected (from usuario.js)')

    // Escucha en puerto 8060
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

// Devuelve el rol segun el ID
app.get('/getRolById/:_id?',async (req,res) =>{
  try {
    const _id = req.params._id;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }

    let usuario = await Usuario.findById(_id);

    const rol = usuario.permisos;

    res.status(200).json({rol});
    
  } catch (error) {
    res.status(500).json({message: "Error al buscar el rol"});
  }
})

//Filtrado por tipo de usuario
app.get('/getUserByTipo/:tipoUsuario?/:id?', async(req,res) =>{
  //const rolResponse = await fetch(`/getRolById/${userId}`);
  try {
    const tipoUsuario = req.params.tipoUsuario;
    const userId = req.params.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    
    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();
    
    if(rol.rol == "administrador"){
      if(tipoUsuario == "todos"){
        let usuarios = await Usuario.find({});
        res.status(200).json({message :"Usuarios encontrados",usuarios});
  
      }else{
        let usuarios = await Usuario.find({permisos : tipoUsuario});
        res.status(200).json({message :"Usuarios encontrados",usuarios});
      } 
    }else{
      res.json({message: "No eres administrador"});
    }
      

  } catch (error) {
    res.status(500).json({message:"Error al filtrar por rol"});
  }
})

// --- POST ---
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

// --- PUT ---
app.put('/usuario/:userId?/:_id?', async (req,res) =>{

  try {
    const _id = req.params._id; //usuario a actualizar el rol
    const userId = req.params.userId; //usuario que hace la actualizacion
    let cambioRol = null;

    // Comprovar validez del userId del usuario
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }

    //vamos a comprobar el rol del userId
    const rolUser = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolUser.json();
    
    // hacemos la comprobacion de que sea un administrador quien hace el cambio
    if(rol.rol == "cliente"){
      res.status(400).json({message:"No eres administrador"});
      return
    }
    console.log("Rol de quien cambia el usuario");
    console.log(rol.rol);
  
    // consultamos el rol que tiene el usuario que queremos cambiar
    const rolTemp = await fetch(`http://localhost:8060/getRolById/${_id}`);
    const rol_id = await rolTemp.json();
    console.log("rol del usuario a cambiar: " + rol_id.rol);

    if (rol_id.rol == "cliente"){
      cambioRol = "administrador";
    }else{
      cambioRol = "cliente";
    }

    console.log("Rol cambiado: " + cambioRol);

    // actualizamos el usuario buscando por su id
    await Usuario.updateOne({_id: _id},{
      permisos: cambioRol
    })
    res.status(200).json({message:"Cambio de rol correctamente"});
  } catch (error) {
    res.status(500).json({message:"Ha ocurrido un error al cambiar el rol"});
  } 

})

// --- DELETE ---
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


