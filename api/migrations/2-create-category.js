module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('categories', {
        categoryId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'category_id',
        },
        name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            field: 'name',
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'description',
        },
        createdBy: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            field: 'created_by',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        },
    }, {
        tableName: 'categories',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('categories'),
};
