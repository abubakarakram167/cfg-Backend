/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "user_posts",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          group_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
              model: 'groups',
              key: 'id'
            }
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
          feeling: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
              model: 'feelings',
              key: 'id'
            }
          },
          media: {
            type: Sequelize.DataTypes.STRING(755),
            allowNull: true,
          },
          love_count: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
          },
          comment_count: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
          },
          share_count: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
          },
          createdAt: {
            field: 'created_at',
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          updatedAt: {
            field: 'updated_at',
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false
          },
          deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
          }

        },
        {
          tableName: "user_posts",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("user_posts"),
};
