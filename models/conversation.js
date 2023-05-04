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

const Conversations = sequelize.define('conversations', {
  conversation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_one: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  user_two: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  }
});

Conversations.belongsTo(User, { foreignKey: 'user_one', targetKey: 'user_id' });
Conversations.belongsTo(User, { foreignKey: 'user_two', targetKey: 'user_id' });

sequelize.authenticate()
  .then(() => {
    // console.log("Conversations table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Conversations;
