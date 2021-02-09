/* jshint indent: 1 */
const model = require('../index');
const content = require('./content');
const user = model.users;
const category = model.categories;

module.exports = (sequelize, DataTypes) => sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'categories',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    model.categories.belongsTo(user, {
        foreignKey: 'created_by'
    });
    // user.hasMany(model.categories,{
    //     foreignKey: {
    //         id: 'id'
    // }});

    // categories has many contents
    model.categories.belongsToMany(model.content, {
        through: "content_categories",
        as: "contents",
        foreignKey: "category_id",
    });

// categories has many contents
    model.content.belongsToMany(model.categories, {
        through: "content_categories",
        as: "categories",
        foreignKey: "content_id",
});
};
