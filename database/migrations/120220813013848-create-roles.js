'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('roles', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true, // untuk membuat auto id secara pengulangan
                primaryKey: true, //key dari tabel untuk membedakan data 1 dan lainnya
                unique: true, // key nya untuk membuat validasi uniq, biar key id nya berbeda dan tidak sama
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM,
                values: ['ADMIN', 'MEMBER']
            },
            created_at: {
                type: Sequelize.DATE,
                default: new Date()
            },
            updated_at: {
                type: Sequelize.DATE,
                default: new Date()
            },
            deleted_at: {
                type: Sequelize.DATE
            },
        }, );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('roles');
    }
};