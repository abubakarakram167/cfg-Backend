/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.addColumn(
            'user_posts',
            'loved_by',
            {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            }
        );
       
    }
    ,
    down: async (queryInterface) => {
        await queryInterface.removeColumn(
            'user_posts',
            'loved_by',
        );
        
    },
};
