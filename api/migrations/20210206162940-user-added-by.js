module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'created_by',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                after: 'created_at',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'created_by',
        );
    },
};
