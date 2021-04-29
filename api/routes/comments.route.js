const express = require('express');
const asyncHandler = require('express-async-handler');
const commentCtrl = require('../controllers/comments.controller');

const router = express.Router();
module.exports = router;

// router.post('/', asyncHandler((req,res)=>{
//     res.send("hello");
// }));
router.post('/', asyncHandler(commentCtrl.addComment));
router.get('/:postId', asyncHandler(commentCtrl.getPostComments));
// router.get('/', asyncHandler(commentCtrl.addComment));
router.delete('/:commId', asyncHandler(commentCtrl.deleteComment));