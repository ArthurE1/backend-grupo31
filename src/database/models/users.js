const bcrypt = require('bcrypt');

module.exports = (Sequelize, type) => {
  const User = Sequelize.define('users', {
    id: {
      type: type.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    lastName: {
      type: type.STRING,
      allowNull: false
    },
    photo: {
      type: type.STRING,
      allowNull: true
    },
    email: {
      type: type.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: type.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    tenant_id: {
      type: type.BIGINT,
      allowNull: false,
      references: {
        model: 'tenants',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });

  /*Hash de la contraseña antes de crear el usuario
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });*/

  return User;
};


