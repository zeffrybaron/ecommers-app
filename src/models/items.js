const { Model, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Items extends Model {}

Items.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.STRING,
        },
        item_category: {
            type: DataTypes.ENUM,
            values: ['Elektronik', 'Fashion', 'Otomotif'],
        },
        item_price: {
            type: DataTypes.INTEGER,
        },
        item_image: {
            type: DataTypes.TEXT,
        },
        item_status: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: connection, //ini adalh sequelize dari config di atas
        timestamps: true, // aktifin update_at dan create_at
        underscored: true, // biar colom-colomnya pake <_>
        paranoid: true, // untuk mengaktifi softdelete yg delete_at
        freezeTableName: true,
        tableName: 'items',
    }
)

module.exports = Items
