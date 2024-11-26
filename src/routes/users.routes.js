const express = require("express");
const router = express.Router();
const { createUser, login, updateUser } = require('../controllers/users.controllers');

// Ruta para crear usuario
router.post('/', createUser);

// Ruta para login
router.post('/login', login);

// Ruta para actualizar usuario
router.put('/update', updateUser);

module.exports = router;
