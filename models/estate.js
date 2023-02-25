const Sequelize = require('sequelize');

const { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, MARIADB_DATABASE, MARIADB_PORT } = process.env;

const sequelize = new Sequelize(MARIADB_DATABASE, MARIADB_USER, MARIADB_PASSWORD, {
  host: MARIADB_HOST,
  dialect: 'mariadb',
  logging: false
});

const User = require('./user');
const Estate = sequelize.define('estate', {
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
  estate_location: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  estate_price: {
    type: Sequelize.DECIMAL(10, 2),
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
    type: Sequelize.ENUM('available', 'sold'),
    allowNull: false,
  },
  estate_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'user_id'
    }
  },
  gps_latitude: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false,
  },
  gps_longitude: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: false,
  },
  province_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  geographies_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amphures_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  districts_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'estate',
  timestamps: true,
});

sequelize.authenticate()
  .then(() => {
    return Estate.sync({ force: false });
  })
  .then(() => {
    console.log("Estate table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Estate;