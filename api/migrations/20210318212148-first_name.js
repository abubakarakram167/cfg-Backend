'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'first_name', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
    queryInterface.changeColumn('users', 'last_name', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
