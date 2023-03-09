'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primarykey: true,
                unique: true,
                allowNull: false,
            },
            id_users: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // nama table
                    key: 'id', // nama column
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },

            id_promo: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'promos',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            no_invoice: {
                type: Sequelize.STRING,
            },
            customer_name: {
                type: Sequelize.STRING,
            },

            date_order: {
                type: Sequelize.DATE,
                default: new Date(),
            },
            sender_addres: {
                type: Sequelize.TEXT,
            },
            receiver_addres: {
                type: Sequelize.TEXT,
            },
            total_price: {
                type: Sequelize.FLOAT,
            },
            order_status: {
                type: Sequelize.ENUM,
                values: ['Pending', 'Paid', 'Cancel'],
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
        await queryInterface.dropTable('orders')
    },
}
