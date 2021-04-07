/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('quiz', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quiz_name: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        publish_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        total_points: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
        },
        category: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
        },
        apply_to_group: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        success_navigate_page: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        fail_navigate_page: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        created_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'quiz',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('quiz'),
};
