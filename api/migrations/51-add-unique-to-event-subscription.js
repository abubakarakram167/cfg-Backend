/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addConstraint('content_subscribers', {
            fields: ['content_id', 'user_id'],
            type: 'unique',
            name: 'unique_content_subscription_constraint'
        });

    },
    down: (queryInterface) => {},
};
