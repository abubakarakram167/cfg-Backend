const { Op } = require('sequelize');
const { updatedSuccessfully } = require('../helpers/response-messages');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('groups', [{
        description: 'Mathematics Group',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        description: 'Science Group',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        description: 'General Group',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, 
    ]),

    down: async (queryInterface) => queryInterface.bulkDelete('groups', {
        description: {
            [Op.in]: [
                'Mathematics Group',
                'Science Group',
                'General Group',
            ],
        },
    }, {}),
};
