const sequelize = require('./sequelize')
const Users = require('./users')
const Roles = require('./roles')
const Verifikasi = require('./verifikasi')
const Items = require('./items')
const OrderItems = require('./order_items')
const Orders = require('./orders')
const Promos = require('./promos')
const Payments = require('./payments')
const Carts = require('./carts')

Roles.hasMany(Users, {
    as: 'users',
    foreignKey: 'role_id',
})

Users.belongsTo(Roles, {
    as: 'role',
    foreignKey: 'role_id',
})

// relasi user dengan verifikasi
Users.hasMany(Verifikasi, {
    as: 'verifikasi',
    foreignKey: 'id_users',
})

Verifikasi.belongsTo(Users, {
    as: 'users',
    foreignKey: 'id_users',
})

Items.hasMany(OrderItems, {
    as: 'order_items',
    foreignKey: 'id_item',
})

OrderItems.belongsTo(Items, {
    as: 'items',
    foreignKey: 'id_item',
})

Users.hasMany(Orders, {
    as: 'orders',
    foreignKey: 'id_users',
})

Orders.belongsTo(Users, {
    as: 'users',
    foreignKey: 'id_users',
})

Promos.hasMany(Orders, {
    as: 'orders',
    foreignKey: 'id_promo',
})

Orders.belongsTo(Promos, {
    as: 'promos',
    foreignKey: 'id_promo',
})

Orders.hasOne(Payments, {
    as: 'payments',
    foreignKey: 'id_orders',
})

Orders.hasMany(OrderItems, {
    as: 'order_items',
    foreignKey: 'id_order',
})

Payments.belongsTo(Orders, {
    as: 'orders',
    foreignKey: 'id_orders',
})

Items.hasMany(Carts, {
    as: 'items',
    foreignKey: 'id',
})

Carts.belongsTo(Items, {
    as: 'cart',
    foreignKey: 'id_item',
})

module.exports = {
    sequelize,
    Users,
    Roles,
    Verifikasi,
    Items,
    OrderItems,
    Orders,
    Promos,
    Payments,
    Carts,
}