'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('accounts', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false
        },
        expiration_date: {
          type: Sequelize.DATEONLY
        },
        password_hash: {
          type: Sequelize.STRING
        },
        accept_terms: {
          type: Sequelize.BOOLEAN
        },
        verification_token: {
          type: Sequelize.STRING
        },
        verified: {
          type: Sequelize.DATE
        },
        reset_token: {
          type: Sequelize.STRING
        },
        reset_token_expires: {
          type: Sequelize.DATE
        },
        password_reset: {
          type: Sequelize.DATE
        },
        created: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated: {
          type: Sequelize.DATE
        }
      }, { transaction });

      await queryInterface.addIndex('accounts', ['first_name', 'last_name'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};