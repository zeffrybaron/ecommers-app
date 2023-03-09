'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('verifikasi', [{
        id: 1,
        id_users: 1,
        kode_verifikasi: await bcrypt.hash('admin123', 10),
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 2,
        id_users: 2,
        kode_verifikasi: await bcrypt.hash('member123', 10),
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('verifikasi', null, {});
  }
};
