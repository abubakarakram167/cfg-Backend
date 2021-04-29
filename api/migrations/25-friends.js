/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "friends",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          user1: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          user2: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          status: {
            type: Sequelize.DataTypes.ENUM(
              'sent',
              'deleted',
              'accepted',
            ),
            allowNull: false,
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
          deleted_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true
          }

        },
        {
          tableName: "friends",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("friends"),
};
