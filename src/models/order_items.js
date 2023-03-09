const { Model, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class OrderItems extends Model {}

OrderItems.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_item: {
        type: DataTypes.INTEGER,
        references: {
            model: 'items',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    id_order: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    item_name: {
        type: DataTypes.STRING,
    },
    item_quantity: {
        type: DataTypes.INTEGER,
    },
    item_price: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: connection, //ini adalh sequelize dari config di atas
    timestamps: true, // aktifin update_at dan create_at
    underscored: true, // biar colom-colomnya pake <_>
    paranoid: true, // untuk mengaktifi softdelete yg delete_at
    freezeTableName: true,
    tableName: 'order_items',
})

module.exports = OrderItems