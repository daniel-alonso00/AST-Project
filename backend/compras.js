const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Compra = require('./models/compra')

const rolEnum = {
  administrador: "administrador",
  cliente: "cliente"
};

// Conectar con Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/joyas', {})
  .then(() => {
    console.log('MongoDB connected (from compras.js)')

    // Escucha en puerto 8070
    app.listen(8070, () => {
      console.log("Localhost listening on 8070.")
    })
  })
  .catch(err => console.log('Error connecting MongoBD: ', err));

// --- GET ---  
app.get('/', async (req,res) => {
  res.send("Pagina de compras")
})

// Obtener todas las compras
app.get('/compras/:id?', async (req, res) => {
  try {
    // Comprovar validez del id del cliente
    userId = req.params.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({ message: "ID de usuario inválido o no proporcionado." });
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + userId);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Cliente inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol == rolEnum.cliente) {
      res.status(500).json({ message: "Esta operación solo puede ser realizada por administradores." });
      return
    }

    let compras = await Compra.find({});
    res.status(200).json(compras)
  } catch {
    res.status(500).json({ message: 'Error al obtener las compras' });
  }
});

// Obtener las compras de un usuario (por id)
app.get('/getComprasById/:id?', async (req, res) => {
  try {
    // Comprovar validez del id del cliente
    userId = req.params.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({ message: "ID de usuario inválido o no proporcionado." });
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + userId);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Cliente inexistente. Proporcione un ID de usuario válido." });
      return
    }

    let compras = await Compra.find({ idCliente: new mongoose.Types.ObjectId(userId) });
    console.log(compras);
    res.status(200).json(compras);
  } catch {
    res.status(500).json({ message: "Error al obtener las compras." })
  }
});

// --- POST ---

// Crear una compra
app.post('/compra', async (req, res) => {
  try {
    idArticulo = req.body.idArticulo
    idCliente = req.body.idCliente
    cantidad = req.body.cantidad
    nombreCliente = req.body.nombreCliente
    direccion = req.body.direccion

    // Comprovar validez del id del cliente
    if (!idCliente || !mongoose.Types.ObjectId.isValid(idCliente)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idCliente);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Cliente inexistente. Proporcione un ID de cliente válido." });
      return
    }

    let articuloSolicitado = await fetch("http://localhost:8080/getById/" + idArticulo);
    let articuloJSON = await articuloSolicitado.json();

    if (articuloJSON.joya.cantidad >= cantidad) {
      let newCompra = new Compra({
        idArticulo: idArticulo,
        idCliente: idCliente,
        cantidad: parseInt(cantidad),
        nombreCliente: nombreCliente,
        direccion: direccion
      });
      newCompra.save();

      articuloJSON.joya.cantidad -= cantidad;
      await fetch('http://localhost:8080/inventario', {
        method: 'PUT',
        body: JSON.stringify(articuloJSON.joya),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      console.log("hey");

      res.status(200).json({ message: "Compra creada correctamente.\nID de la compra: " + newCompra._id })
    } else {
      res.status(500).json({ message: "Existencias disponibles insuficientes.\nCantidad disponible: "+articuloJSON.joya.cantidad})
    }
  } catch {
    res.status(500).json({ message: "Error al crear compra" })
  }
});
