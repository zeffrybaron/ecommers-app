'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'promos',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allownull: false
      },
      promo_name: {
        type: Sequelize.STRING,
        allownull: false
      },
      promo_category: {
        type: Sequelize.STRING,
        allownull: false
      },
      promo_code: {
        type: Sequelize.STRING,
        allownull: false
      },
      promo_amount: {
        type: Sequelize.INTEGER,
        allownull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allownull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allownull: false
      },
      deleted_at: {
        type: Sequelize.DATE
      }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('promos');
  }
};
