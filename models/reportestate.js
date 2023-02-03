const Sequelize = require('sequelize');

const { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, MARIADB_DATABASE, MARIADB_PORT } = process.env;

const sequelize = new Sequelize(MARIADB_DATABASE, MARIADB_USER, MARIADB_PASSWORD, {
  host: MARIADB_HOST,
  dialect: 'mariadb'
});

const ReportEstate = sequelize.define('reportEstate', {
  report_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estate_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
    timestamps: false
});

sequelize.authenticate()
  .then(() => {
    return ReportEstate.sync({ force: false });
  })
  .then(() => {
    // console.log("ReportEstate table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = ReportEstate;
