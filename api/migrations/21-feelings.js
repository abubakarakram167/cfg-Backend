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
          feeling: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          description: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,

        },
        {
          tableName: "user_posts",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("user_posts"),
};
