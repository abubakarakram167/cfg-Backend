const express = require('express');
const asyncHandler = require('express-async-handler');
const messageCtrl = require('../controllers/messages.controller');

const router = express.Router();
module.exports = router;


router.post('/', asyncHandler(messageCtrl.createMessage));
// router.get('/:postId', asyncHandler(commentCtrl.getPostComments));
// router.get('/', asyncHandler(commentCtrl.addComment));
// router.delete('/:commId', asyncHandler(commentCtrl.deleteComment));