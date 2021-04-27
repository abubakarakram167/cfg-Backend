const express = require('express');
const asyncHandler = require('express-async-handler');
const friendCtrl = require('../controllers/friends.controller');

const router = express.Router();
module.exports = router;

// router.post('/', asyncHandler((req,res)=>{
//     res.send("hello");
// }));
router.post('/', asyncHandler(friendCtrl.addFriend));
router.get('/', asyncHandler(friendCtrl.getFriends));
router.post('/approve', asyncHandler(friendCtrl.approveFriend));
router.post('/delete', asyncHandler(friendCtrl.deleteFriendRequest));