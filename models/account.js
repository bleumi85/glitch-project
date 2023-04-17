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
    static associate({ RefreshToken }) {
      // define association here
      this.hasMany(RefreshToken, { foreignKey: 'accountId', as: 'refreshTokens', onDelete: 'CASCADE' })
    }
  };
  Account.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    userName: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    expirationDate: DataTypes.DATEONLY,
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    acceptTerms: DataTypes.BOOLEAN,
    verificationToken: DataTypes.STRING,
    verified: DataTypes.DATE,
    resetToken: DataTypes.STRING,
    resetTokenExpires: DataTypes.DATE,
    passwordReset: DataTypes.DATE,
    created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated: DataTypes.DATE,
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() { return !!(this.verified || this.passwordReset); }
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: "accounts",
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      withHash: { attributes: {}, }
    }
  });
  return Account;
};