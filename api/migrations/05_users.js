/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        middle_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        bio: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        user_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: Sequelize.DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        region: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        parish: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        age_range: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        affiliation: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        institution: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        photo_url: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        salt: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        role: {
            type: Sequelize.DataTypes.ENUM(
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
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        deleted_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        deleted_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        password_attempts_count: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0,
        },
        password_attempt_time: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        terms_accepted: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
        },
        password_reset_token: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        password_reset_token_sent_time: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        login_retry_count: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        password_changed_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        created_by:
        {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'users',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('users'),
};
