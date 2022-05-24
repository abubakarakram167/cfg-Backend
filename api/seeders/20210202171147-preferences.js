const { Op } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        const preference = await queryInterface.rawSelect('preferences', {
            where: {
                option_name: 'enable_moderation_on_user_timeline_post',
            },
          }, ['id']);
          if(!preference) {
             // do bulkInsert stuff.
             await queryInterface.bulkInsert('preferences', [{
                option_name: 'password_regex',
                option_value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$',
                option_description: 'no option description available',
            }, {
                option_name: 'login_with_username',
                option_value: 'no',
                option_description: 'no option description available',
            },
             {
                option_name: 'give_points_to_timeline_post_from_facilitator',
                option_value: 'no',
                option_description: 'no option description available',
            }, {
                option_name: 'number_of_posts_to_give_points_for',
                option_value: '5|post',
                option_description: 'no option description available',
            }, {
                option_name: 'number_of_points_give_to_timeline_post',
                option_value: '0',
                option_description: 'no option description available',
            }, {
                option_name: 'default_user_group_for_new_user',
                option_value: 'candidate',
                option_description: 'no option description available',
            }, {
                option_name: 'user_link_expiration_duration',
                option_value: '3|Hours',
                option_description: 'no option description available',
            }, {
                option_name: 'login_splash_images_url',
                option_value: 'https://cfg.joanduncanfoundation.org/app/media/image/login_splash_image.png',
                option_description: 'no option description available',
            }, {
                option_name: 'logo_url',
                option_value: 'https://cfg.joanduncanfoundation.org/app/media/image/logo_image.png',
                option_description: 'no option description available',
            }, {
                option_name: 'remember_password_in_the_browser_for',
                option_value: '1|week',
                option_description: 'no option description available',
            }, {
                option_name: 'set_invalid_login_tracker_attempt',
                option_value: '5',
                option_description: 'no option description available',
            }, {
                option_name: 'disable_login_for',
                option_value: '30|Minutes',
                option_description: 'no option description available',
            }, {
                option_name: 'enable_moderation_on_user_timeline_post',
                option_value: 'no',
                option_description: 'no option description available',
            },
            {
                option_name: 'zoom_key',
                option_value: '',
                option_description: 'no option description available',
            },
            {
                option_name: 'zoom_secret',
                option_value: '',
                option_description: 'no option description available',
            },
            ])
          }
        
        
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('preferences', {
            option_name: {
                [Op.in]: [
                    'password_regex',
                    'login_with_username',
                    'give_points_to_timeline_post_from_facilitator',
                    'number_of_posts_to_give_points_for',
                    'number_of_points_give_to_timeline_post',
                    'default_user_group_for_new_user',
                    'user_link_expiration_duration',
                    'login_splash_images_url',
                    'logo_url',
                    'remember_password_in_the_browser_for',
                    'set_invalid_login_tracker_attempt',
                    'disable_login_for',
                    'enable_moderation_on_user_timeline_post',
                ],
            },
        }, {})
    },
};
