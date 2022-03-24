/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        

        await queryInterface.changeColumn(
            'socket_ids',
            'created_at',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        );
    },
    down: (queryInterface) => {}
};
