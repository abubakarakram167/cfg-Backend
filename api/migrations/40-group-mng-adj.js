module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addColumn(
            'groups',
            'type',
            {
                type: Sequelize.DataTypes.ENUM(
                    'private',
                    'public',
                    'family-only',
                ),
                defaultValue: 'private',
                allowNull: false,
            },
        );
        await queryInterface.addColumn(
            'users',
            'cfg_session_id',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: 'content',
                    key: 'id',
                }
            },
        );
        await queryInterface.addColumn(
            'content',
            'group_id',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: 'groups',
                    key: 'id',
                }
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'groups',
            'type',
        );
        await queryInterface.removeColumn(
            'users',
            'session_id',
        );
        await queryInterface.removeColumn(
            'content',
            'group_id',
        );
       
    },
};
