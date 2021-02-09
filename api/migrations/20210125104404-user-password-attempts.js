module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'password_attempts_count',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false,
                defaultValue: 0,
                after: 'status',
            },
        );
        await queryInterface.addColumn(
            'users',
            'password_attempt_time',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
                after: 'password_attempts_count',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'password_attempts_count',
        );
        await queryInterface.removeColumn(
            'users',
            'password_attempt_time',
        );
    },
};
