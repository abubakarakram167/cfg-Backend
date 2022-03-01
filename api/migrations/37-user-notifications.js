'use strict';

/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_notifications', {
    id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
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
    session_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    post_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_posts',
        key: 'id'
      }
    },
    friends_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'friends',
        key: 'id'
      }
    },
    message_id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'messages',
        key: 'id'
      }
    },
    status: {
      type: Sequelize.DataTypes.ENUM('pending', 'read'),
      allowNull: false,
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

