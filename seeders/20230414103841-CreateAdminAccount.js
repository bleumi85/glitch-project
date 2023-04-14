'use strict';

const bcrypt = require("bcryptjs");
const Role = require("../helpers/role");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


   await queryInterface.bulkInsert('accounts', [{
    user_name: 'admin',
    first_name: 'Admin',
    last_name: 'Api',
    email: 'admin@email.com',
    role: Role.Admin,
    password_hash: bcrypt.hashSync("Abcd1234", 10),
    accept_terms: true,
    verified: new Date(),
    created: new Date()
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
