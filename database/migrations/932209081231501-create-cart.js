'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cart', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            id_item: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'items',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            quantity: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('cart')
    },
}