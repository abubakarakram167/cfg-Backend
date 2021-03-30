'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('content', 'tags', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true,
    });
    queryInterface.changeColumn('content', 'type', {
      type: Sequelize.DataTypes.ENUM(
        'reward',
        'tool',
        'session',
        'event',
        'mini',
    ),
      allowNull: false,
    });
    queryInterface.changeColumn('users', 'first_name', {
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
