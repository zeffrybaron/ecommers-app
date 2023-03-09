const { Model, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Promos extends Model {}

Promos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        promo_name: {
            type: DataTypes.STRING,
        },
        promo_category: {
            type: DataTypes.STRING,
        },
        promo_code: {
            type: DataTypes.STRING,
        },
        promo_amount: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'promos',
    }
)

module.exports = Promos
