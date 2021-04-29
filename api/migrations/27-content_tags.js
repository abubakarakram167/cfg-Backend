/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('content_tags', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        contentId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            field: 'content_id',
        },
        tagId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            field: 'tag_id',

        },
    }, {
        tableName: 'content_tags',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('content_tags'),
};
