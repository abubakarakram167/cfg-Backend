/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "comments",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          created_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          post_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'user_posts',
              key: 'id'
            }
          },
          parent_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
              model: 'comments',
              key: 'id'
            }
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
          },
          love_count: {
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
          }

        },
        {
          tableName: "comments",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("comments"),
};
