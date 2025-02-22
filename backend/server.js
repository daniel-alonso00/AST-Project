require("dotenv").config(); //carga las variables de entorno desde .env
const express = require("express"); //Importa express
const mongoose = require("mongoose");   //Importa Mongoose para conectar a mongoDB
const cors = require("cors");   //permite peticioens desde otros dominios (CORS)

const app = express();  //Crea una instancia de express
app.use(express.json());    //Permite recibir JSON en las particiones
app.use(cors());    //Habilita CORS para permitir el acceso desde el frontend

// Conectar a MongoDB usando mogoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Error al conectar MongoDB:", err));

// Ruta de prueba para verificar que el servidor funciona
app.get("/prueba",(req, res) => {res.sendFile(__dirname+'/index.html')});

app.get("/", (req, res) => {
  res.send("✅ API funcionando...");
});

app.get("/admin",(req, res) => {res.send("Entrada para admin")});

// Definir el puerto del servidor (5000 por defecto o el de .env)
const PORT = process.env.PORT || 5000;

//Iniciar el servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
