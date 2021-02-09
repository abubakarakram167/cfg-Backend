const { Op } = require('sequelize');
const { updatedSuccessfully } = require('../helpers/response-messages');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('categories', [{
        name: 'Primary',
        description: 'This category is defined for primary students.',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        name: 'Secondry',
        description: 'This category is defined for secondry students.',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        name: 'General',
        description: 'This category is defined for general students.',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, 
    ]),

    down: async (queryInterface) => queryInterface.bulkDelete('categories', {
        name: {
            [Op.in]: [
                'Primary',
                'Secondry',
                'General',
            ],
        },
    }, {}),
};
