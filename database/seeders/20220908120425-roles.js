'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('roles', [{
                id: 1,
                role: 'ADMIN',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                role: 'MEMBER',
                created_at: new Date(),
                updated_at: new Date()
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};