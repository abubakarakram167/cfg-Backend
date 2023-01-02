/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {


        await queryInterface.changeColumn(
            'content',
            'event_type',
            {
                type: Sequelize.DataTypes.ENUM('live-video', 'group-chat', 'zoom-video', 'face-to-face'),
                allowNull: true,
            }
        );


    },
    down: (queryInterface) => { },
};
