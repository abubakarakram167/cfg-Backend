/* eslint global-require: "off" */
const model = {};
const fs = require('fs');

const schemaPath = `${__dirname}/schemas/`;

let initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to clash with a model named 'init'.
    initialized = true;
    model.sequelize = sequelize;
    // All Models
    model.keywords = sequelize.import('./schemas/keywords.js'); // todo delete
    model.preferences = sequelize.import('./schemas/preferences.js');
    model.question = sequelize.import('./schemas/question.js');
    model.status = sequelize.import('./schemas/status.js');
    model.users = sequelize.import('./schemas/users.js');
    //model.categories = sequelize.import('./schemas/categories.js'); // todo delete
    model.content_subscribers = sequelize.import('./schemas/content_subscribers.js');
    model.gift_rewards = sequelize.import('./schemas/gift_rewards.js');
    model.groups = sequelize.import('./schemas/groups.js'); // todo delete
    model.media = sequelize.import('./schemas/media.js');
    model.question_options = sequelize.import('./schemas/question_options.js');
    model.sessions = sequelize.import('./schemas/sessions.js');
    model.content = sequelize.import('./schemas/content.js');
    model.content_categories = sequelize.import('./schemas/content_categories.js');
    model.content_keywords = sequelize.import('./schemas/content_keywords.js');
    model.quiz = sequelize.import('./schemas/quiz.js');
    model.quiz_questions = sequelize.import('./schemas/quiz_questions.js');
    model.session_categories = sequelize.import('./schemas/session_categories.js');
    model.session_groups = sequelize.import('./schemas/session_groups.js');
    model.user_groups = sequelize.import('./schemas/user_groups.js');
    model.question_bank = sequelize.import('./schemas/question_bank.js');
    model.bank_options = sequelize.import('./schemas/bank_options.js');

    model.tags = sequelize.import('./schemas/tags.js');
    model.contentTags = sequelize.import('./schemas/content_tags.js');
    model.user_posts = sequelize.import('./schemas/user_posts.js');
    model.friends = sequelize.import('./schemas/friends.js')
    model.feelings = sequelize.import('./schemas/feelings.js')
    model.comments = sequelize.import('./schemas/comments.js')
    model.day_tools = sequelize.import('./schemas/day_tools.js')

    model.quiz.belongsToMany(model.question, {
      through: "quiz_questions",
      as: "questions",
      foreignKey: "quiz_id",
    });
    
    model.question.belongsToMany(model.quiz, {
      through: "quiz_questions",
      as: "quizes",
      foreignKey: "question_id",
    });

    fs.readdirSync(schemaPath).forEach((file) => {
        if (file.match(/(.+)\.js(on)?$/)) {
            if (Object.hasOwnProperty.call(
                // eslint-disable-next-line import/no-dynamic-require
                require(schemaPath + file),
                'initRelations',
            )) {
                // eslint-disable-next-line import/no-dynamic-require
                require(schemaPath + file).initRelations(model);
            }
        }
    });
    model.sequelize = sequelize;
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.

module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
