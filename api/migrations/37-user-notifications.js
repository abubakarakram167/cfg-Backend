'use strict';

/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_notifications', {

    user_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    timeline: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false
    },
    family: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false
    },
    message: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    
  }, {
    tableName: 'user_notifications',
  }).then(() => {
  }),
  down: (queryInterface) => queryInterface.dropTable('user_notifications'),
};

