/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('tags', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tagType: {
        type: DataTypes.ENUM(
            'keyword',
            'group',
            'category',
        ),
        allowNull: false,
        field: 'tag_type',
    },
    isPrivate: {
        type: DataTypes.INTEGER(1),
        allowNull: true, // 1 for true
        field: 'is_private',
    },
    createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'created_by',
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deteted_at',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },

}, {
    tableName: 'tags',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
