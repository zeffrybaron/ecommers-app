const { Model, DataTypes } = require("sequelize")
const connection = require("./sequelize")
const sequelize = require('./sequelize')

class Payments extends Model {}

Payments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    id_orders: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders', // nama table
            key: 'id', // nama column
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    payment_date: {
        type: DataTypes.DATE,
        default: new Date(),
    },
    payment_type: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    payment_status: {
        type: DataTypes.ENUM,
        values: ['PAID', 'UNPAID']
    },
}, {
    sequelize: connection,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'payments'
})

module.exports = Payments