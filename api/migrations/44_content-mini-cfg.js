/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.addColumn(
            'content',
            'meeting_start_time',
            {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            }
        );
        await queryInterface.addColumn(
            'content',
            'start_link',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            }
        );
        await queryInterface.addColumn(
            'content',
            'join_link',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            }
        );
    }
    ,
    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'content',
            'meeting_start_time',
        );
        await queryInterface.removeColumn(
            'content',
            'start_link',
        );
        await queryInterface.removeColumn(
            'content',
            'join_link',
        );
    },
};
