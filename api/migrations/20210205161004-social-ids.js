module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'facebook_id',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'password_reset_token_sent_time',
            },
        );
        await queryInterface.addColumn(
            'users',
            'google_id',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'facebook_id',
            },
        );
        await queryInterface.addColumn(
            'users',
            'twitter_id',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'google_id',
            },
        );
        await queryInterface.addColumn(
            'users',
            'microsoft_id',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true,
                after: 'twitter_id',
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'users',
            'facebook_id',
        );
        await queryInterface.removeColumn(
            'users',
            'google_id',
        );
        await queryInterface.removeColumn(
            'users',
            'twitter_id',
        );
        await queryInterface.removeColumn(
            'users',
            'microsoft_id',
        );
    },
};
