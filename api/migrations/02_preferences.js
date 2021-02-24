/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "preferences",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          option_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          option_value: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
        },
        {
          tableName: "preferences",
        }
      )
      .then(() => {}),
  down: (queryInterface) => queryInterface.dropTable("preferences"),
};
