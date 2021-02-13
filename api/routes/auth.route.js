const express = require('express');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/users.controller');

const router = express.Router();
module.exports = router;

router.post('/login', asyncHandler(userCtrl.login));
router.post('/connect/social', asyncHandler(userCtrl.loginSocial));
router.post('/forgot-password', asyncHandler(userCtrl.forgotPassword));
router.post('/reset-password', asyncHandler(userCtrl.resetPassword));
router.post('/register', asyncHandler(userCtrl.register));
