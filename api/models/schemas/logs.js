/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('logs', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    status_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user_agent: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ip_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    api_route: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date_time: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'logs',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
