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

const Conversation = require('./conversation');
const User = require('./user');

// Define Message model
const Message = sequelize.define('messages', {
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conversation_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Conversation,
      key: 'conversation_id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});


Message.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

sequelize.authenticate()
  .then(() => {
    // console.log("Message table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Message;
