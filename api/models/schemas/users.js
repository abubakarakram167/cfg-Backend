/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('users', {
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
    },
    firstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'last_name',
    },
    middleName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'middle_name',
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'about',
    },
    userName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'user_name',
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        field: 'email',
    },
    phone: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'phone',
    },
    photoUrl: {
        type: DataTypes.STRING(350),
        allowNull: true,
        field: 'photo_url',
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password',
    },
    salt: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'salt',
    },
    role: {
        type: DataTypes.ENUM,
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
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1,
        field: 'status',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
