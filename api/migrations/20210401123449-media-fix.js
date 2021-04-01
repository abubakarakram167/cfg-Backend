'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('media', 'is_global', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    });
    queryInterface.addColumn('media', 'file_name', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
    queryInterface.changeColumn('media', 'mime_type', {
      type: Sequelize.DataTypes.ENUM(
        'png',
        'jpeg',
        'jpg',
        'doc',
        'docx',
        'mp4',
        'mkv',
        
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
