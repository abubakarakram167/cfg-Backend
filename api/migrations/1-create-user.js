module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
        userId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'user_id',
        },
        firstName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'last_name',
        },
        middleName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'middle_name',
        },
        about: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'about',
        },
        userName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'user_name',
        },
        email: {
            type: Sequelize.DataTypes.STRING(254),
            allowNull: false,
            unique: true,
            field: 'email',
        },
        phone: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'phone',
        },
        photoUrl: {
            type: Sequelize.DataTypes.STRING(350),
            allowNull: true,
            field: 'photo_url',
        },
        password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'password',
        },
        salt: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'salt',
        },
        role: {
            type: Sequelize.DataTypes.ENUM,
            values: [
                'candidate',
                'facilitator',
                'content-manager',
                'support', 'reviewer',
                'system-admin',
                'auditor',
            ],
            field: 'role',
        },
        status: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            field: 'status',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        },
    }, {
        tableName: 'users',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('Users'),
};
