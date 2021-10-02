/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('journal', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    content_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'content',
            key: 'id'
        }
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    track_my_goal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    log_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    points: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM(
            'goal',
            'journey',
            'journal'
        )
    },
    parent: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    created_by: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
}, {
    tableName: 'journal',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
