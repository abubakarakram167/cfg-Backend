/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.changeColumn(
            'users',
            'created_by',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            }
        );
    },
    down: (queryInterface) => {},
};
