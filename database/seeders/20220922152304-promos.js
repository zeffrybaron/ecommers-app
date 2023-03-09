'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('promos', [{
        id: 1,
        promo_name: 'Promo hari kemerdekaan',
        promo_category: 'Discount',
        promo_code: 'MDK',
        promo_amount: 5000,
        created_at: new Date(),
        updated_at: new Date(),
     },{
        id: 2,
        promo_name: 'Promo lebaran',
        promo_category: 'Discount',
        promo_code: 'Fitri',
        promo_amount: 10000,
        created_at: new Date(),
        updated_at: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('promos', null, {});
  }
};
