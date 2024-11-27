const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const UsersRoutes = require('./src/routes/users.routes');
const ContactsRoutes = require('./src/routes/contacts.routes');
const path = require('path');

// Configuración de CORS
var corsOptions = {
  origin: '*',  // Cambia '*' por la URL de tu frontend si quieres restringirlo
  optionsSuccessStatus: 200
};

// Habilitar CORS
app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Rutas
app.use('/users', UsersRoutes);  // Ruta de usuarios
app.use('/contacts', ContactsRoutes);  // Ruta de contactos

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend del grupo 31!');
});

// Servir archivos estáticos (como imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión al servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
