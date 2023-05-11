const Sequelize = require('sequelize');

const { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, MARIADB_DATABASE, MARIADB_PORT } = process.env;

const sequelize = new Sequelize(MARIADB_DATABASE, MARIADB_USER, MARIADB_PASSWORD, {
  host: MARIADB_HOST,
  dialect: 'mariadb',
  logging: false,
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  }
});

// Define User model
const User = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'USER',
  },
  last_login: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  Line_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_profile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

sequelize.authenticate()
  // .then(() => {
  //   return User.sync({ force: false });
  // })
  .then(() => {
    // console.log("User table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = User;