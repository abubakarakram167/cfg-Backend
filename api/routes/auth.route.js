const express = require('express');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/users.controller');

const router = express.Router();
module.exports = router;

router.post('/login', userCtrl.login);
router.post('/connect/social', userCtrl.loginSocial);
router.post('/forgot-password', userCtrl.forgotPassword);
router.post('/reset-password', userCtrl.resetPassword);
router.post('/register', asyncHandler(userCtrl.register), userCtrl.login);
