module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('content', 'type', {
            field: 'type',
            type: Sequelize.DataTypes.ENUM(
                'reward',
                'tool',
                'session',
                'quiz',
                'event',
                'mini',
                'timeline',
                'title',
                'sub-title',
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
