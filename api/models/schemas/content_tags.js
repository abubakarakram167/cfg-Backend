/* jshint indent: 1 */
const model = require('../index');

module.exports = (sequelize, DataTypes) => sequelize.define('content_tags', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    contentId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'content_id',
    },
    tagId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'tag_id',
    },
}, {
    tableName: 'content_tags',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    // content belongs to Categories

    // Content belongs to groups
};
