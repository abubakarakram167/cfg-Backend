module.exports = {
    up: async (queryInterface, Sequelize) => {
        // eslint-disable-next-line global-require
        queryInterface.update(require('../models/index'), 'users', { role: 'candidate' }, {
            role: null,
        });
        queryInterface.changeColumn('users', 'role', {
            type: Sequelize.DataTypes.ENUM(
                'candidate',
                'facilitator',
                'content-manager',
                'support',
                'reviewer',
                'system-administrator',
                'auditor',
            ),
            defaultValue: 'candidate',
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('users', 'role', {
            type: Sequelize.DataTypes.ENUM(''),
            allowNull: true,
        });
    },
};
