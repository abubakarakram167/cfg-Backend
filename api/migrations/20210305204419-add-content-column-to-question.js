'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'question',
      'detail',
      {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'question',
      'detail'
    );
  }
};
