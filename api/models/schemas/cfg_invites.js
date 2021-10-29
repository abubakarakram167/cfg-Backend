/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('cfg_invites', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    cfg_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'content',
            key: 'id'
        }
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(
            'sent',
            'accepted',
            'rejected'
        ),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'cfg_invites',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
