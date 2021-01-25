/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('categories', {
    categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id',
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'name',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'description',
    },
    createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
        field: 'created_by',
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
    tableName: 'categories',
    timestamps: false,
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
