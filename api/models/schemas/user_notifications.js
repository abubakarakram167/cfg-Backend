/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('user_notifications', {
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    timeline: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    family: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    message: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'user_notifications',
    timestamps: false
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
