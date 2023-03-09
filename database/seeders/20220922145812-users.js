'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
        id: 1,
        role_id: 1,
        name: 'John Doe Admin',
        no_telephone: '082656232626',
        email: 'email@email.com',
        user_name: 'admin123',
        password: await bcrypt.hash('admin123', 10),
        created_at: new Date(),
        updated_at: new Date(),
     }, {
        id: 2,
        role_id: 2,
        name: 'John Doe Member',
        no_telephone: '08265623269',
        email: 'email@email.com',
        user_name: 'member123',
        password: await bcrypt.hash('member123', 10),
        created_at: new Date(),
        updated_at: new Date(),
   }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
