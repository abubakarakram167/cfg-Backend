/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    middle_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    region: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    parish: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    age_range: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    affiliation: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    institution: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    photo_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    salt: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM(
            'candidate',
            'facilitator',
            'content-manager',
            'support',
            'reviewer',
            'system-administrator',
            'auditor',
        ),
        defaultValue: 'candidate',
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0, // 0: pending, 1: active and 2: disabled
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
    deletedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        field: 'deleted_by',
    },
    passwordAttemptsCount: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        field: 'password_attempts_count',
    },
    passwordAttemptTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'password_attempt_time',
    },
    password_changed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'password_reset_token',
    },
    passwordResetTokenSentTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'password_reset_token_sent_time',
    },
    facebookId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'facebook_id',
    },
    googleId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'google_id',
    },
    twitterId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'twitter_id',
    },
    microsoftId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'microsoft_id',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'created_by',
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
