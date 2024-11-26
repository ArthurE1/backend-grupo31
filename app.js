const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path'); // Importar path para manejar rutas

const port = process.env.PORT;

// RUTAS
const ContactsRoutes = require('./src/routes/contacts.routes');
const UsersRoutes = require('./src/routes/users.routes');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Parseo de JSON

// Sirve la carpeta 'uploads' para los archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// RUTAS DE CONTACTOS
app.use('/contactos', ContactsRoutes);

// RUTA DE USUARIOS
app.use('/users', UsersRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
