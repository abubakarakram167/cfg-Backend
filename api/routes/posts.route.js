const express = require('express');
const asyncHandler = require('express-async-handler');
const postCtrl = require('../controllers/posts.controller');

const router = express.Router();
module.exports = router;

// router.post('/', asyncHandler((req,res)=>{
//     res.send("hello");
// }));
router.post('/', asyncHandler(postCtrl.createOnePost));
router.put('/:id', asyncHandler(postCtrl.updatePost));
router.get('/', asyncHandler(postCtrl.getTimelinePosts));
router.get('/:postId', asyncHandler(postCtrl.getOnePostById));
router.delete('/:postId', asyncHandler(postCtrl.deletepost));
