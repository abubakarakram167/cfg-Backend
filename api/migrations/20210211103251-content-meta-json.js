module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'content',
            'detail_json_meta',
            {
                type: Sequelize.DataTypes.JSON,
                allowNull: true,
                after: 'detail',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'content',
            'detail_json_meta',
        );
    },
};
