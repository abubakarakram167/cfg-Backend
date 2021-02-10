module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('content', 'content_category', 'type');
        queryInterface.changeColumn('content', 'type', {
            field: 'type',
            type: Sequelize.DataTypes.ENUM(
                'reward',
                'tool',
                'session',
                'quiz',
                'event',
                'mini',
            ),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    },
};
