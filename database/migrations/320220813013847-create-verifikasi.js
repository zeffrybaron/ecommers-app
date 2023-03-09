'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('verifikasi', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true, // untuk membuat auto id secara pengulangan
                primaryKey: true, //key dari tabel untuk membedakan data 1 dan lainnya
                allowNull: false,
            },
            id_users: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            kode_verifikasi: {
                type: Sequelize.STRING,
            },
            expired_date: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.ENUM,
                values: ['Pending', 'Active'],
                defaultValues: 'Pending',
            },
            created_at: {
                type: Sequelize.DATE,
                default: new Date(),
            },
            updated_at: {
                type: Sequelize.DATE,
                default: new Date(),
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('verifikasi')
    },
}
