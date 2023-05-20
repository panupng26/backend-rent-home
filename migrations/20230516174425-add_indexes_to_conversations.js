'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('conversations', ['user_one', 'updated_at'], {
      name: 'idx_conversations_user_one_updated_at'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('conversations', 'idx_conversations_user_one_updated_at');
  }
};




