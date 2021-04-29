/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "feelings",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          feeling: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          description: {
            type: Sequelize.DataTypes.STRING(255),
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
          }

        },
        {
          tableName: "feelings",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("feelings"),
};
