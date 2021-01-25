const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');

const accessTokenExpireTime = 5 * 60 * 1000; // 5 minutes

module.exports = {
    generateToken,
    generateRandomSalt,
    setTokenCookie,
};

function generateToken(user) {
    const { password, permissions, ...userInfo } = user;
    return jwt.sign(userInfo, config.jwtSecret, { expiresIn: accessTokenExpireTime });
}

function setTokenCookie(res, token) {
    return setCookie(res, 'access', token, { maxAge: accessTokenExpireTime, httpOnly: true });
}

function setCookie(res, cookieId, token, options) {
    res.cookie(cookieId, token, options);
    return true;
}

function generateRandomSalt() {
    return crypto.randomBytes(48).toString('hex');
}
