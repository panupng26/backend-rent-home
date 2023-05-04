const Sequelize = require('sequelize');

const { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, MARIADB_DATABASE, MARIADB_PORT } = process.env;

const sequelize = new Sequelize(MARIADB_DATABASE, MARIADB_USER, MARIADB_PASSWORD, {
  host: MARIADB_HOST,
  dialect: 'mariadb',
  logging: false
});

const Conversation = require('./conversation');

// Define Message model
const Message = sequelize.define('message', {
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
  sender_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
    timestamps: false
});

// Define the association between Message and Conversation
Message.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
  onDelete: 'cascade',
});

sequelize.authenticate()
  .then(() => {
    // console.log("Message table created/synced successfully");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Message;
