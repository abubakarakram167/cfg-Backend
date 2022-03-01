const express = require('express');
const asyncHandler = require('express-async-handler');
const messageCtrl = require('../controllers/messages.controller');

const router = express.Router();
module.exports = router;


router.post('/', asyncHandler(messageCtrl.createMessage));
router.get('/', asyncHandler(messageCtrl.getUserChats));
router.get('/:userId', asyncHandler(messageCtrl.getUserMessages));
// router.get('/', asyncHandler(commentCtrl.addComment));
router.delete('/:msgId', asyncHandler(messageCtrl.deleteMessage));