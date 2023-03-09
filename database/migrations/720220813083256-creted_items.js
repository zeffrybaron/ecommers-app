'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('items', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            item_name: {
                type: Sequelize.STRING,
            },
            item_category: {
                type: Sequelize.ENUM,
                values: ['Elektronik', 'Fashion', 'Otomotif'],
            },
            item_price: {
                type: Sequelize.INTEGER,
            },
            item_image: {
                type: Sequelize.TEXT,
            },
            item_status: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('items')
    },
}
