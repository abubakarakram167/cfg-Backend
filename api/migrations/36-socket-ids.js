'use strict';

/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('socket_ids', {
    id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    socket_id: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'socket_ids',
  }).then(() => {
  }),
  down: (queryInterface) => queryInterface.dropTable('socket_ids'),
};

