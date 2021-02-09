const { Op } = require('sequelize');
const { updatedSuccessfully } = require('../helpers/response-messages');

module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('content', [{
        title: 'Importance of Water',
        sub_title: 'Introduction',
        detail:'Everyone knows that water is the soul of our life. It is the most basic need for our survival, safety, progress, and development. It is a sacred, natural and easily available resource. But, do we care about the proper use of water? Aren’t we are becoming reckless towards its use? Can we imagine our life without sufficient water? In fact, no one can live without water. Though we all acknowledge the fact yet we all misusing it mindlessly without caring.',        
        start_date: new Date(),
        end_date: new Date(),
        status: 'published',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'tool',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        title: 'Ban on Smoking',
        sub_title: 'Introduction',
        detail:'Public smoking bans seem to be tremendously effective in reducing heart attack and, theoretically, might also help to prevent lung cancer and emphysema, diseases that develop much more slowly than heart attacks. ... Direct smoking doubles the risk of heart attack. Second hand smoke increases the risk by 30 percent',
        start_date: new Date(),
        end_date: new Date(),
        status: 'saved',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'tool',
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
    }, {
        title: 'Ban on Animal testing',
        sub_title: 'Introduction',
        detail:'The harm that is committed against animals should not be minimized because they are not considered to be "human." In conclusion, animal testing should be eliminated because it violates animals rights, it causes pain and suffering to the experimental animals, and other means of testing product toxicity are available.',
        start_date: new Date(),
        end_date: new Date(),
        status: 'draft',
        total_points: 900,
        featured_image_url: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
        content_category: 'tool',        
        created_by: 1,
        created_at:new Date(),
        updated_at:new Date(),
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
