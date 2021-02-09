const { Op } = require('sequelize');
const { updatedSuccessfully } = require('../helpers/response-messages');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('sessions', [{
        content_name: 'What is mindfullness',
        author: 'John Doe',
        start_date: new Date(),
        end_date: new Date(),
        status: 'published',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'session',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        content_name: 'The great ideas',
        author: 'Wiliamson',
        start_date: new Date(),
        end_date: new Date(),
        status: 'saved',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'session',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        content_name: 'Conquer The Challenge Of Change',
        author: 'Catherin',
        start_date: new Date(),
        end_date: new Date(),
        status: 'draft',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'session',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, 
    ]),

    down: async (queryInterface) => queryInterface.bulkDelete('sessions', {
        content_name: {
            [Op.in]: [
                'What is mindfullness',
                'The great ideas',
                'Conquer The Challenge Of Change',
            ],
        },
    }, {}),
};
