/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.addColumn(
            'content_subscribers',
            'time_in_minutes',
            {
                type: Sequelize.DataTypes.STRING(25),
                allowNull: true,
            }
        );


    },
    down: (queryInterface) => {
         queryInterface.removeColumn(
            'content_subscribers',
            'time_in_minutes',
            {
                type: Sequelize.DataTypes.STRING(25),
                allowNull: true,
            }
        );
     },
};
