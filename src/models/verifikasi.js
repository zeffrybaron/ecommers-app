const { Model, DataTypes } = require('sequelize');
const connection = require('./sequelize');

class Verifikasi extends Model {}

Verifikasi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    id_users: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    kode_verifikasi: {
      type: DataTypes.STRING,
    },
    expired_date: {
      type: DataTypes.DATE,
      default: new Date(),
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Active'],
      defaultValues: 'Pending',
    },
  },
  {
    sequelize: connection,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'verifikasi',
  }
);

module.exports = Verifikasi;
