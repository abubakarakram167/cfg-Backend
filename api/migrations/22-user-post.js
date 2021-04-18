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
          content: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          feeling: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'feelings',
              key: 'id'
            }
          },
          media: {
            type: Sequelize.DataTypes.STRING(755),
            allowNull: true,
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
