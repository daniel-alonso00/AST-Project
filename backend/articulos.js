const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Inventario = require('./models/inventario');
const Compra = require('./models/compra');
const Usuario = require('./models/usuario');

// Conectar con Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected (from articulos.js)')

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

app.get('/inventario/:userId?', async (req, res) => {
  try {
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();

    if (rol.rol == "administrador"){
      let joyas = await Inventario.find({});
      res.status(200).json({message: "Artículos encontrados", joyas});
    } else {
      res.json({message: "No eres administrador."});
    }
  } catch {
    res.status(500).json({ message: 'Error al obtener la joya' });
  }
});

// --- POST ---
app.post('/inventario/:userId?', async(req, res) => {
  try {
    tipo = req.body.tipo;
    nombre = req.body.nombre;
    precio = req.body.precio;
    cantidad = req.body.cantidad;
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();

    if(rol.rol == "administrador"){
      const newJoya = new Inventario({
        tipo: tipo,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
      })

      newJoya.save()
      res.status(201).json({ message: "Joya creada correctamente" });
    }else{
      res.json({message:"No puedes crear joyas, no eres administrador"});
    }
  } catch(error) {
    res.status(500).json({ message: "Error al crear la joya" });
  }

})

// --- PUT ---
app.put('/inventario/:userId?', async (req, res) => {
  try {
    _id = req.body._id;
    tipo = req.body.tipo;
    nombre = req.body.nombre;
    precio = req.body.precio;
    cantidad = req.body.cantidad;
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();

    if(rol.rol == 'administrador'){
      await Inventario.updateOne({ _id: _id }, {
        tipo: tipo,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
      })
      res.status(201).json({ message: "Joya actualizada correctamente" });
    }else{
      res.json({message:"No puedes actualizar las joyas, no eres administrador"});
    }    
  } catch(error) {
    res.status(500).json({ message: "Error al crear la joya" });
  }
})

// Filtrado por ID mediante solitud al backend
app.get('/getById/:_id?/:userId?', async (req,res)=>{
  try {
    _id = req.params._id;
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();

    if(rol.rol == 'administrador'){
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "ID inválido o no proporcionado" });
      }
  
      let joya = await Inventario.findOne({_id: new mongoose.Types.ObjectId(_id)});
  
      if(!joya){
        return res.status(404).json({ message: "Articulo no encontrado"});
      }
      res.status(200).json({joya: joya});  

    }else{
      res.json({message: "Tienes que ser administrador para poder hacer esto"});
    }     

  } catch (error) {
    res.status(500).json({ message: "Error al encontrar el articulo" });
  }
})

// Filtrado por tipo
app.get('/getTipo/:tipo?/:userId?', async (req, res) => {
  try {
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();

    if(rol.rol == 'administrador'){
      tipo = req.params.tipo;
      let joyas = await Inventario.find({ tipo: tipo });
      res.status(200).json({joyas: joyas});
    }else{
      res.json({message: "Tienes que ser administrador para poder hacer esto"});
    }
    
  } catch(error) {
    res.status(500).json({ message: "Tipo no valido" })
  }
});

// --- DELETE ---
app.delete('/inventario/:userId?/:_id?', async (req, res) =>{
  try {
    const _id = req.params._id;
    userId = req.params.userId;

    const rolResponse = await fetch(`http://localhost:8060/getRolById/${userId}`);
    const rol = await rolResponse.json();
    if(rol.rol == 'administrador'){
      const item = await Inventario.findByIdAndDelete(_id);
    
      if (!item) {
        return res.status(404).json({ message: "Articulo no encontrado" });
      }
      // Responder con éxito
      res.status(200).json({ message: "Articulo eliminado correctamente" });

    }else{
      res.json({message:"No puedes borrar articulos, no eres administrador"});
    }

  } catch (error) {
    res.status(500).json({ message: "Error al borrar el articulo" });
  }
})
