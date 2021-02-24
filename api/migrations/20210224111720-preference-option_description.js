"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("preferences", "option_description", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("preferences", "terms_accepted");
  },
};
