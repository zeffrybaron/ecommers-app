const { Model, DataTypes } = require('sequelize');
const connection = require('./sequelize');

class Roles extends Model {}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['ADMIN', 'MEMBER'],
    },
  },
  {
    sequelize: connection, //ini adalh sequelize dari config di atas
    timestamps: true, // aktifin update_at dan create_at
    underscored: true, // biar colom-colomnya pake <_>
    paranoid: true, // untuk mengaktifi softdelete yg delete_at
    freezeTableName: true,
    tableName: 'roles',
  }
);

module.exports = Roles;
