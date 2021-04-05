'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('media', 'category', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    });
    queryInterface.addColumn('media', 'origin', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
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
