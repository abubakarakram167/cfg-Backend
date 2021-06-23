/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('user_groups', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    group_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'user_groups',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
