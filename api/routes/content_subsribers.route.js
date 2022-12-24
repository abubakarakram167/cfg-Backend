/* Authorization 1 */
const asyncHandler = require('express-async-handler');

const express = require('express');
const subscriptionCtrl = require('../controllers/content_subscribers.controller');

const router = express.Router();
module.exports = router;

router.post('/', asyncHandler(subscriptionCtrl.createOneContentSubscriber));
// router.get('/:id', asyncHandler(ContentCtrl.deleteContent));
