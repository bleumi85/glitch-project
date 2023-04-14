'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      account_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'accounts'
        }
      },
      token: {
        type: Sequelize.STRING
      },
      expires: {
        type: Sequelize.DATE
      },
      created: {
        type: Sequelize.DATE
      },
      created_by_ip: {
        type: Sequelize.STRING
      },
      revoked: {
        type: Sequelize.DATE
      },
      revoked_by_ip: {
        type: Sequelize.STRING
      },
      replaced_by_token: {
        type: Sequelize.STRING
      },
      reason_revoked: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('refresh_tokens');
  }
};