/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('quiz', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    quiz_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    publish_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_points: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    apply_to_group: {
        type: DataTypes.ENUM(
            'candidate',
            'facilitator',
            'content-manager',
            'support',
            'reviewer',
            'system-administrator',
            'auditor',
        ),
        allowNull: false,
    },
    success_navigate_page: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fail_navigate_page: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'quiz',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
