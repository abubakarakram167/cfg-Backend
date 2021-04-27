module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'socket_id',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'password_reset_token_sent_time',
            },
        );
        await queryInterface.addColumn(
            'users',
            'online_status',
            {
                type: Sequelize.DataTypes.ENUM(
                    'online',
                    'away',
                    'offline',

                ),
                allowNull: true,
                after: 'socket_id',
            },
        );
        await queryInterface.addColumn(
            'comments',
            'deleted_at',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
        );

    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'socket_id',
        );
        await queryInterface.removeColumn(
            'users',
            'online_status',
        );
        await queryInterface.removeColumn(
            'comments',
            'deleted_at',
        );
        
    },
};
