'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION "uuid-ossp"');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP EXTENSION "uuid-ossp"');
  }
};
