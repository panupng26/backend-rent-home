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
const Estate = require('./estate');
const ReportEstate = sequelize.define('reportEstates', {
  report_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estate_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Estate,
      key: 'estate_id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

ReportEstate.belongsTo(Estate, { foreignKey: 'estate_id', as: 'estate' });
ReportEstate.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

sequelize.authenticate()
  // .then(() => {
  //   return ReportEstate.sync({ force: false });
  // })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = ReportEstate;
