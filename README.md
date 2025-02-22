# 📦 Proyecto AST - Administración de Tienda en Línea sobre Joyería

## 📌 Descripción
Este proyecto es una aplicación **RESTful** desarrollada con la **MEAN stack** (MongoDB, Express, Angular, Node.js). Permite a un administrador gestionar artículos en una tienda en línea a través de una interfaz web, ofreciendo funcionalidades **CRUD** (Crear, Leer, Actualizar, Eliminar) mediante una **API REST**. Además, el sistema soporta diferentes roles de usuario:

- **Administrador**: Puede gestionar los artículos en la base de datos, incluyendo la creación, modificación y eliminación.
- **Usuario estándar**: Puede consultar los artículos disponibles y realizar compras.

El sistema está diseñado para ser modular, escalable y fácil de usar, permitiendo una gestión eficiente de la tienda en línea.

### 🔒 Roles de Usuario
- **Administrador**: Gestiona los artículos.
- **Cliente**: Puede consultar y comprar artículos.

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
