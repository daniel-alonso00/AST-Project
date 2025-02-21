# 📦 Proyecto de MEAN Stack - Administración de Tienda en Línea sobre Joyas

## 📌 Descripción
Este proyecto es una aplicación **RESTful** desarrollada con la **MEAN stack** (MongoDB, Express, Angular/React/Vue, Node.js). Permite a un administrador gestionar artículos en una tienda en línea a través de una interfaz web, ofreciendo funcionalidades **CRUD** (Crear, Leer, Actualizar, Eliminar).

## 🚀 Tecnologías Utilizadas
- **MongoDB** - Base de datos NoSQL para almacenar los artículos.
- **Express.js** - Framework de backend en Node.js.
- **Angular/React/Vue** - Framework para el frontend (elige el que prefieras).
- **Node.js** - Entorno de ejecución para JavaScript en el backend.
- **Mongoose** - ODM para modelar datos en MongoDB.

## 📂 Estructura del Proyecto
```
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── config
│   ├── server.js
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│
├── README.md
```

## ⚙️ Instalación y Configuración
### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2️⃣ Configurar el Backend
```sh
cd backend
npm install
```
- Crear un archivo **.env** en la carpeta `backend` con:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tienda
```
- Iniciar el servidor:
```sh
node server.js
```

### 3️⃣ Configurar el Frontend
```sh
cd frontend
npm install
npm start  # React/Vue
ng serve    # Angular
```

## 🛠️ Funcionalidades
### ✅ CRUD de Artículos
- 📌 **Consultar artículos** por ID, nombre, precio, etc.
- ➕ **Crear un artículo** con campos como ID, nombre, cantidad, precio.
- ✏️ **Modificar un artículo** existente.
- 🗑️ **Eliminar un artículo**.

### 🔒 Roles de Usuario (Proyecto - Grupo C)
- **Administrador**: Gestiona los artículos.
- **Cliente**: Puede consultar y comprar artículos.

## 📅 Entregas y Evaluación
- **Prácticas (Grupo B):** CRUD de artículos (Fecha límite: 24 de marzo de 2025).
- **Proyecto (Grupo C):** Implementación de microservicios (Fecha límite: 23 de abril de 2025).

## 💡 Notas Importantes
- MongoDB debe estar instalado localmente.
- No se permite el uso de Docker ni bases de datos en línea.
- No se usa autenticación; cada petición debe incluir el ID del usuario.

---
✉️ **Contacto**: [tu-email@example.com](mailto:tu-email@example.com)
