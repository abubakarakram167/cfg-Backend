const express = require('express');
const asyncHandler = require('express-async-handler');
const tagsCtrl = require('../controllers/tags.controller');

const router = express.Router();
module.exports = router;

router.post('/:type', asyncHandler(tagsCtrl.createTag));
router.get('/list/:type', asyncHandler(tagsCtrl.listTags));
// router.post('/forgot-password', asyncHandler(userCtrl.forgotPassword));
// router.post('/reset-password', asyncHandler(userCtrl.resetPassword));
// router.post('/register', asyncHandler(userCtrl.register));
