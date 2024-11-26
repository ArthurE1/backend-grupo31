const { User } = require('../database/db');

// Controlador para crear usuario
const createUser = async (req, res) => {
    try {
        // Ruta de la foto en la carpeta 'uploads'
        const photoPath = 'uploads/JP.jpg'; // Ruta relativa del archivo

        const user = await User.create({
            firstName: "Juan",
            lastName: "González",
            photo: photoPath, // Se guarda la ruta de la foto
            email: "juany2k203@gmail.com",
            username: "juany2kk",
            password: "emilio1234", // Contraseña en texto plano
            tenant_id: 1
        });




        res.status(201).send({
            status: "se creó correctamente",
            message: "usuario creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "NO SE CREÓ EL usuario",
            message: "usuario NO CREADO",
            error: error
        });
    }
};

// Controlador de Login
const login = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password)

    // Validación de entrada: asegurarse de que username y password estén presentes
    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    try {
        // Buscar usuario en la base de datos
        const user = await User.findOne({ where: { username: "juany2kk" } });
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Comparación directa de contraseñas (texto plano)
        if (password === user.password) {
            return res.status(200).json({
                message: 'Login exitoso',
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photo: user.photo
                }
            });
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Controlador de Actualización de Usuario
const updateUser = async (req, res) => {
    const { id, firstName, lastName, photo } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.photo = photo || user.photo;

        await user.save();
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    createUser,
    login,
    updateUser
};
