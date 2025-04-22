const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const Inventario = require('./models/inventario');
const Compra = require('./models/compra');

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

// Otener joyas del inventario
app.get('/inventario/:idUsuario?', async (req, res) => {
  try {
    let idUsuario = req.params.idUsuario;
    
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      return res.status(500).json({ message: "ID de usuario inválido o no proporcionado." });
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Cliente inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }
    
    let joyas = await Inventario.find({});
    res.status(200).json(joyas);
  } catch {
    alert("Error al obtener los artículos");
  }
});

// Obtener las compras de un usuario (por id)
app.get('/getComprasById/:id?', async (req, res) => {
  try {
    // Comprovar validez del id del cliente
    let userId = req.params.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({ message: "ID de usuario inválido o no proporcionado." });
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + userId);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Cliente inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }

    let compras = await Compra.find({ idCliente: new mongoose.Types.ObjectId(userId) });
    res.status(200).json(compras);
  } catch {
    res.status(500).json({ message: "Error al obtener las compras." })
  }
});

// Obtener todas las compras de un artículo concreto
app.get('/getComprasByArtId/:idUsuario?/:idArticulo?', async (req, res) => {
  try {
    let idUsuario = req.params.idUsuario;
    let idArticulo = req.params.idArticulo;
    
    // Comprovar validez del id del usuario
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Usuario inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }

    let compras = await Compra.find({ idCliente: idUsuario, idArticulo: idArticulo });
    res.status(200).json(compras);
  } catch {
    res.status(500).json({ message: "Error al obtener compras" });
  }
});

// Filtrado de inventario por id de articulo
app.get('/getJoyaById/:idUsuario?/:idArticulo?', async (req, res) => {
  try {
    let idUsuario = req.params.idUsuario;
    let idArticulo = req.params.idArticulo;

    // Comprovar validez del id del usuario
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Usuario inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return 
    }

    let joya = await Inventario.findOne({_id: idArticulo});
    res.status(200).json(joya);
  } catch {
    res.status(500).json({ message: "Error al obtener la joya" })
  }
});

app.get('/getInventarioTipo/:idUsuario?/:tipo?', async (req, res) => {
  try {
    let idUsuario = req.params.idUsuario;
    let tipo = req.params.tipo;

    // Comprovar validez del id del usuario
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Usuario inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }

    let joyas = await Inventario.find({tipo: parseInt(tipo)});
    res.status(200).json(joyas)
  } catch {
    res.status(500).json({message: "Error al obtener las joyas"});
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
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }

    let articuloSolicitado = await Inventario.findOne({_id: idArticulo})

    if (articuloSolicitado.cantidad >= cantidad) {
      let newCompra = new Compra({
        idArticulo: idArticulo,
        idCliente: idCliente,
        cantidad: parseInt(cantidad),
        nombreCliente: nombreCliente,
        direccion: direccion
      });
      newCompra.save();

      articuloSolicitado.cantidad -= cantidad;
      await Inventario.updateOne({_id: idArticulo}, articuloSolicitado);

      res.status(200).json({ message: "Compra creada correctamente.\nID de la compra: " + newCompra._id })
    } else {
      res.status(500).json({ message: "Existencias disponibles insuficientes.\nCantidad disponible: "+articuloJSON.joya.cantidad})
    }
  } catch {
    res.status(500).json({ message: "Error al crear compra" })
  }
});

// --- PUT ---

// Actualizar compra (solo nombre y/o direccion)
app.put('/compra', async (req, res) => {
  try {
    idCompra = req.body.idCompra
    idUsuario = req.body.userId
    idCliente = req.body.idCliente
    nombreCliente = req.body.nombreCliente
    direccion = req.body.direccion

    // Comprovar validez del id del usuario
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Usuario inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.administrador && idCliente != idUsuario) {
      res.status(500).json({ message: "Solo un administrador puede modificar la compra de otro usuario" });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }
    
    await Compra.updateOne({_id: idCompra}, {
      nombreCliente: nombreCliente,
      direccion: direccion
    })

    res.status(200).json({ message: "Compra actualizada correctamente" })
  } catch {
    res.status(500).json({ message: "Error al actualizar la compra" })
  }
});

// --- DELETE ---

// Eliminar una compra
app.delete('/compra/:idUsuario?/:idCliente?/:idCompra?', async(req, res) => {
  try {
    idUsuario = req.params.idUsuario;
    idCliente = req.params.idCliente;
    idCompra = req.params.idCompra;

    // Comprovar validez del id del usuario
    if (!idUsuario || !mongoose.Types.ObjectId.isValid(idUsuario)) {
      res.status(400).json({ message: "ID del cliente inválido o no proporcionado" });
      return
    }
    let rolResp = await fetch("http://localhost:8060/getRolById/" + idUsuario);
    let rolJSON = await rolResp.json();
    let rol = rolJSON.rol;
    if (rol === undefined) {
      res.status(500).json({ message: "Usuario inexistente. Proporcione un ID de usuario válido." });
      return
    } else if (rol != rolEnum.administrador && idCliente != idUsuario) {
      res.status(500).json({ message: "Solo un administrador puede modificar la compra de otro usuario" });
      return
    } else if (rol != rolEnum.cliente) {
      res.status(500).json({ message: "Servicio solo disponible para clientes" });
      return
    }

    let compra_data = await Compra.findOne({_id: idCompra});
    let articulo = await Inventario.findOne({_id: idArticulo});

    articulo.cantidad += compra_data.cantidad;
    await Inventario.updateOne({_id: idArticulo}, articulo);
    
    await Compra.deleteOne({_id: idCompra});
    res.status(200).json({ message: "Compra eliminada correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar la compra" });
  }
});
