'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('estates', {
      estate_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.TEXT,
        allowNull: true,
      },
      estate_status: {
        type: Sequelize.ENUM('available', 'sold', 'suspended', 'rented'),
        allowNull: false
      },
      estate_verify: {
        type: Sequelize.ENUM('verify', 'non'),
        allowNull: true,
      },
      estate_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lat: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      lng: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('estate');
  }
};
