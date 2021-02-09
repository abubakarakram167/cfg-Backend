const { Op } = require('sequelize');
const { updatedSuccessfully } = require('../helpers/response-messages');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('users', [{
        first_name: 'Michael',
        user_name:'admin',
        email: 'admin@cpxzgroup.com',
        password:'$2a$10$jb94boShIVmhw47qjf9qgOUNy9wajGm400Xe8WTx4I9ocnLx0jisC',
        salt:'79dd741d2a26d2bcc1febf5e3996adf4f1d08df79465c5bde65c9442e6ca1e08fc75117718d08dfdc673112f3cab833f',
        role:'candidate',
        status: 1,
        login_retry_count: 10,
        created_at:new Date(),
        updated_at:new Date(),
    },

    ]),

    down: async (queryInterface) => queryInterface.bulkDelete('users', {
        user_name: {
            [Op.in]: [
                'admin',               
            ],
        },
    }, {}),
};
