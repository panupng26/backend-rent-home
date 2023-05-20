'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('estates', ['estate_type','estate_status'], {
      name: 'idx_estate_search_pattern'
    });
    await queryInterface.addIndex('estates', ['estate_price','estate_status', 'estate_name', 'estate_type'], {
      name: 'idx_estate_search_pattern_1'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('estates', 'idx_estate_search_pattern');
    await queryInterface.removeIndex('estates', 'idx_estate_search_pattern_1');
  }
};
