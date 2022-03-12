/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('user_notifications', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      session_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'sessions',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'user_posts',
          key: 'id'
        }
      },
      friends_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'friends',
          key: 'id'
        }
      },
      message_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'messages',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.ENUM('pending', 'read'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
}, {
    tableName: 'user_notifications',
    timestamps: false
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
