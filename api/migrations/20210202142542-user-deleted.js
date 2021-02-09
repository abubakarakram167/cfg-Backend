module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'deleted_at',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
                after: 'status',
            },
        );
        await queryInterface.addColumn(
            'users',
            'deleted_by',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                after: 'deleted_at',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'deleted_at',
        );
        await queryInterface.removeColumn(
            'users',
            'deleted_by',
        );
    },
};
