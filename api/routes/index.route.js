const express = require('express');
const pagination = require('../middleware/pagination');
const authRoutes = require('./auth.route');

// const keywordsRoutes = require('./keywords.route');
const preferencesRoutes = require('./preferences.route');
const questionRoutes = require('./question.route');
const statusRoutes = require('./status.route');
const userRoutes = require('./users.route');
const tagsRoutes = require('./tags.route');
// const content_subscribersRoutes = require('./content_subscribers.route');
const gift_rewardsRoutes = require('./gift_rewards.route');
 const groupsRoutes = require('./groups.route');
const mediaRoutes = require('./media.route');
const question_optionsRoutes = require('./question_options.route');
const sessionsRoutes = require('./sessions.route');
const contentRoutes = require('./content.route');
// const content_categoriesRoutes = require('./content_categories.route');
// const content_keywordsRoutes = require('./content_keywords.route');
const quizRoutes = require('./quiz.route');
const quiz_questionsRoutes = require('./quiz_questions.route');
// const session_categoriesRoutes = require('./session_categories.route');
// const session_groupsRoutes = require('./session_groups.route');
const user_groupsRoutes = require('./user_groups.route');
const postRoutes = require('./posts.route');
const friendsRoutes = require('./friends.route');
const commentsRoutes = require('./comments.route');
const bankQuestionsRoutes = require('./question_bank.route');
const bankOptionsRoutes = require('./bank_options.route');
const journalRoutes = require('./journal.route');
const inviteRoutes = require('./cfg_invites.route');
const messageRoutes = require('./messages.route');
const testRoutes = require('./test.route');
const subscriptionRoutes = require('./content_subsribers.route')
const notificationSubscriptionRoutes = require('./notification_subscriptions.route');


const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use(pagination);
router.use('/auth', authRoutes);

router.use('/notification-subscription', notificationSubscriptionRoutes);

//router.use('/keywords', keywordsRoutes);
router.use('/preferences', preferencesRoutes);

router.use('/users', userRoutes);
router.use('/userPosts', postRoutes)
router.use('/friends', friendsRoutes)
// router.use('/categories', categoriesRoutes);
// router.use('/content_subscribers',content_subscribersRoutes);
// router.use('/gift_rewards', gift_rewardsRoutes);
router.use('/groups', groupsRoutes);
router.use('/media', mediaRoutes);

router.use('/sessions', sessionsRoutes);
router.use('/content', contentRoutes);
router.use('/tags', tagsRoutes);
// router.use('/content_categories',content_categoriesRoutes);
// router.use('/content_keywords',content_keywordsRoutes);
router.use('/quiz', quizRoutes);
router.use('/question', questionRoutes);
router.use('/question_options', question_optionsRoutes);
router.use('/quiz_questions', quiz_questionsRoutes);
router.use('/questions_bank' , bankQuestionsRoutes)
router.use('/bank_options' , bankOptionsRoutes)
router.use('/comments', commentsRoutes)
router.use('/journals', journalRoutes)
router.use('/invites', inviteRoutes)
router.use('/messages', messageRoutes)
router.use('/test', testRoutes)
router.use('/contentSubscribers' , subscriptionRoutes)
// router.use('/session_categories',session_categoriesRoutes);
// router.use('/session_groups',session_groupsRoutes);
// router.use('/user_groups', user_groupsRoutes);

module.exports = router;
