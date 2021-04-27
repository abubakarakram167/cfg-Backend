/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "day_tools",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          tool_id1: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'content',
              key: 'id'
            }
          },
          tool_id2: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
              model: 'content',
              key: 'id'
            }
          },
          tool_day:{
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
          },
          created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false
          }

        },
        {
          tableName: "day_tools",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("day_tools"),
};
