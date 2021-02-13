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
// const groupsRoutes = require('./groups.route');
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

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use(pagination);
router.use('/auth', authRoutes);

// router.use('/keywords', keywordsRoutes);
router.use('/preferences', preferencesRoutes);
router.use('/question', questionRoutes);
router.use('/users', userRoutes);
// router.use('/categories', categoriesRoutes);
// router.use('/content_subscribers',content_subscribersRoutes);
// router.use('/gift_rewards', gift_rewardsRoutes);
// router.use('/groups', groupsRoutes);
// router.use('/media', mediaRoutes);
// router.use('/question_options', question_optionsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/content', contentRoutes);
router.use('/tags', tagsRoutes);
// router.use('/content_categories',content_categoriesRoutes);
// router.use('/content_keywords',content_keywordsRoutes);
router.use('/quiz', quizRoutes);
router.use('/quiz_questions', quiz_questionsRoutes);
// router.use('/session_categories',session_categoriesRoutes);
// router.use('/session_groups',session_groupsRoutes);
// router.use('/user_groups', user_groupsRoutes);

module.exports = router;
