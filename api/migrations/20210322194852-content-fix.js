'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('content', 'tags', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    });
    queryInterface.changeColumn('users', 'first_name', {
      type: Sequelize.DataTypes.ENUM(
        'reward',
        'tool',
        'session',
        'event',
        'mini',
    ),
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
