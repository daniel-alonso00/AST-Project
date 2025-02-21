# 📦 Proyecto AST - Administración de Tienda en Línea sobre Joyas

## 📌 Descripción
Este proyecto es una aplicación **RESTful** desarrollada con la **MEAN stack** (MongoDB, Express, Angular, Node.js). Permite a un administrador gestionar artículos en una tienda en línea a través de una interfaz web, ofreciendo funcionalidades **CRUD** (Crear, Leer, Actualizar, Eliminar). Además, el sistema soporta diferentes roles de usuario:

- **Administrador**: Puede gestionar los artículos en la base de datos, incluyendo la creación, modificación y eliminación.
- **Usuario estándar**: Puede consultar los artículos disponibles y realizar compras.

El sistema está diseñado para ser modular, escalable y fácil de usar, permitiendo una gestión eficiente de la tienda en línea.

## 🚀 Tecnologías Utilizadas
- **MongoDB** - Base de datos NoSQL para almacenar los artículos.
- **Express.js** - Framework de backend en Node.js.
- **Angular** - Framework para el frontend.
- **Node.js** - Entorno de ejecución para JavaScript en el backend.
- **Mongoose** - ODM para modelar datos en MongoDB.

## 🛠️ Funcionalidades
### ✅ CRUD de Artículos
- 📌 **Consultar artículos** por ID, nombre, precio, etc.
- ➕ **Crear un artículo** con campos como ID, nombre, cantidad, precio.
- ✏️ **Modificar un artículo** existente.
- 🗑️ **Eliminar un artículo**.

## 📂 Estructura del Proyecto (hay que modificarlo a medida que se añadan carpetas relevantes)
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
ng serve    # Angular
```

### 🔒 Roles de Usuario
- **Administrador**: Gestiona los artículos.
- **Cliente**: Puede consultar y comprar artículos.
