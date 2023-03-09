const { Model, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_users: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: connection, //ini adalh sequelize dari config di atas
        timestamps: true, // aktifin update_at dan create_at
        underscored: true, // biar colom-colomnya pake <_>
        paranoid: true, // untuk mengaktifi softdelete yg delete_at
        freezeTableName: true,
        tableName: 'cart',
    }
)

module.exports = Cart
