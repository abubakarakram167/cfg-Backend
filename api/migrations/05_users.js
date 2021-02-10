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
            allowNull: true,
        },
        last_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
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
            allowNull: false,
        },
        parish: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        age_range: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
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
