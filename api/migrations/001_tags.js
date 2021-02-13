/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('tags', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        tagType: {
            type: Sequelize.DataTypes.ENUM(
                'keyword',
                'group',
                'category',
            ),
            allowNull: false,
            field: 'tag_type',
        },
        isPrivate: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: true,
            field: 'is_private',
        },
        createdBy: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            field: 'created_by',
        },
        deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'deteted_at',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        },
    }, {
        tableName: 'tags',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('tags'),
};
