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
    static associate(models) {
      // define association here
    }
  };
  RefreshToken.init({
    accountId: DataTypes.UUID,
    token: DataTypes.STRING,
    expires: DataTypes.DATE,
    created: DataTypes.DATE,
    createdByIp: DataTypes.STRING,
    revoked: DataTypes.DATE,
    revokedByIp: DataTypes.STRING,
    replacedByToken: DataTypes.STRING,
    reasonRevoked: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'refresh_tokens'
  });
  return RefreshToken;
};