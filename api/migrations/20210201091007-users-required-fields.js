module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('users', 'region', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        });
        queryInterface.changeColumn('users', 'parish', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        });
        queryInterface.changeColumn('users', 'age_range', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        });
        queryInterface.changeColumn('users', 'affiliation', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        });
        queryInterface.changeColumn('users', 'institution', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('users', 'region', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        });
        queryInterface.changeColumn('users', 'parish', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        });
        queryInterface.changeColumn('users', 'age_range', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        });
        queryInterface.changeColumn('users', 'affiliation', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        });
        queryInterface.changeColumn('users', 'institution', {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        });
    },
};
