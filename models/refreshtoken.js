'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Account }) {
      // define association here
      this.belongsTo(Account, { as: "account" })
    }
  };
  RefreshToken.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'account'
      }
    },
    token: DataTypes.STRING,
    expires: DataTypes.DATE,
    created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    createdByIp: DataTypes.STRING,
    revoked: DataTypes.DATE,
    revokedByIp: DataTypes.STRING,
    replacedByToken: DataTypes.STRING,
    reasonRevoked: DataTypes.STRING,
    isExpired: {
      type: DataTypes.VIRTUAL,
      get() { return Date.now() >= this.expires; }
    },
    isActive: {
      type: DataTypes.VIRTUAL,
      get() { return !this.revoked && !this.isExpired; }
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'refresh_tokens'
  });
  return RefreshToken;
};