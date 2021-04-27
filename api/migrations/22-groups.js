/* jshint indent: 1 */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
        "groups",
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
          name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
          },
          description: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
          },
          featured_image_url: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
          },
          cover_photo_url: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
          },
          member_count: {
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
          tableName: "groups",
        }
      )
      .then(() => { }),
  down: (queryInterface) => queryInterface.dropTable("groups"),
};
