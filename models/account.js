'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    expirationDate: DataTypes.DATEONLY,
    passwordHash: DataTypes.STRING,
    acceptTerms: DataTypes.BOOLEAN,
    verificationToken: DataTypes.STRING,
    verified: DataTypes.DATE,
    resetToken: DataTypes.STRING,
    resetTokenExpires: DataTypes.DATE,
    passwordReset: DataTypes.DATE,
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() { return !!(this.verified || this.passwordReset); }
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: 'accounts'
  });
  return Account;
};