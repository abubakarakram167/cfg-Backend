const { Op } = require('sequelize');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('content', [{
        title: 'Importance of Water',
        sub_title: 'Introduction',
        detail: 'Everyone knows that water is the soul of our life.'
            + ' It is the most basic need for our survival, safety, '
            + 'progress, and development. It is a sacred, natural and easily available resource. But, do we care about '
            + 'the proper use of water? Aren’t we are becoming reckless towards its use? Can we imagine our life '
            + 'without sufficient water? In fact, no one can live without water. Though we all acknowledge the fact '
            + 'yet we all misusing it mindlessly without caring.',
        start_date: new Date(),
        end_date: new Date(),
        status: 'published',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        type: 'tool',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    }, {
        title: 'Ban on Smoking',
        sub_title: 'Introduction',
        detail: 'Everyone knows that water is the soul of our life.'
            + ' It is the most basic need for our survival, safety, '
            + 'progress, and development. It is a sacred, natural and easily available resource. But, do we care about '
            + 'the proper use of water? Aren’t we are becoming reckless towards its use? Can we imagine our life '
            + 'without sufficient water? In fact, no one can live without water. Though we all acknowledge the fact '
            + 'yet we all misusing it mindlessly without caring.',
        start_date: new Date(),
        end_date: new Date(),
        status: 'saved',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        type: 'tool',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    }, {
        title: 'Ban on Animal testing',
        sub_title: 'Introduction',
        detail: 'Everyone knows that water is the soul of our life.'
            + ' It is the most basic need for our survival, safety, '
            + 'progress, and development. It is a sacred, natural and easily available resource. But, do we care about '
            + 'the proper use of water? Aren’t we are becoming reckless towards its use? Can we imagine our life '
            + 'without sufficient water? In fact, no one can live without water. Though we all acknowledge the fact '
            + 'yet we all misusing it mindlessly without caring.',
        start_date: new Date(),
        end_date: new Date(),
        status: 'draft',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        type: 'tool',
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    ]),

    down: async (queryInterface) => queryInterface.bulkDelete('content', {
        title: {
            [Op.in]: [
                'Importance of Water',
                'Ban on Smoking',
                'Ban on Animal testing',
            ],
        },
    }, {}),
};
