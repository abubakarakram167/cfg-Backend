module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'password_reset_token',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'password_attempt_time',
            },
        );
        await queryInterface.addColumn(
            'users',
            'password_reset_token_sent_time',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
                after: 'password_reset_token',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'password_attempt_time',
        );
        await queryInterface.removeColumn(
            'users',
            'password_reset_token_sent_time',
        );
    },
};
