/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.changeColumn(
            'content_subscribers',
            'content_id',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: 'content',
                    key: 'id',
                },
            }
        );

        await queryInterface.changeColumn(
            'content_subscribers',
            'status',
            {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            }
        );
    },
    down: (queryInterface) => {},
};
