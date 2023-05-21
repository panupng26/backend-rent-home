'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('estates', ['estate_status'], {
      name: 'idx_estate_search_pattern_3'
    });
    await queryInterface.addIndex('estates', ['estate_user_id', 'estate_status'], {
      name: 'idx_estate_search_pattern_4'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('estates', 'idx_estate_search_pattern_3');
    await queryInterface.removeIndex('estates', 'idx_estate_search_pattern_4');
  }
};
