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

const User = require('./user');
const Estate = sequelize.define('estates', {
  estate_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estate_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  estate_type: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  estate_price: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  estate_area: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  estate_bedrooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  estate_bathrooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  estate_garage: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  estate_description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  estate_image: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  estate_status: {
    type: Sequelize.ENUM('available', 'sold', 'suspended', 'rented'),
    allowNull: false,
    defaultValue: 'available',
  },
  estate_verify: {
    type: Sequelize.ENUM('verfiy', 'non'),
    allowNull: true,
    defaultValue: 'non',
  },
  estate_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'user_id'
    }
  },
  lat: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  lng: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  province: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  districts: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  postcode: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

sequelize.authenticate()
  // .then(() => {
  //   return Estate.sync({ force: false });
  // })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Estate;