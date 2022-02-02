/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('logs', {
            id: {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            status_code: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            user_agent: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            ip_address: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            api_route: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            method: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            date_time: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            resp_time: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            
        }, {
            tableName: 'logs',
        })

        await queryInterface.addColumn(
            'users',
            'default_home_page_view',
            {
                type: Sequelize.DataTypes.ENUM(
                    'timeline',
                    'icon',
                    
                ),
                allowNull: true,
            }
        );
    },
    down: (queryInterface) => queryInterface.dropTable('logs'),
};
