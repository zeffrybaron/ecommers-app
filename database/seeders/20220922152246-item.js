'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('items', [{
        id: 1,
        item_name: 'Kipas Angin',
        item_category: 'Elektronik',
        item_price: 50000,
        created_at: new Date(),
        updated_at: new Date(),
      },{
        id: 2,
        item_name: 'Baju',
        item_category: 'Fashion',
        item_price: 90000,
        created_at: new Date(),
        updated_at: new Date(),
      },{
        id: 3,
        item_name: 'Ban Mobil',
        item_category: 'Otomotif',
        item_price: 550000,
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('items', null, {});
     */
  }
};
