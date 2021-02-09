module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'terms_accepted',
            {
                type: Sequelize.DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 0,
                after: 'password_attempt_time',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'terms_accepted',
        );
    },
};
