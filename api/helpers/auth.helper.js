const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');

const accessTokenExpireTime = 50 * 60 * 1000; // 50 minutes

module.exports = {
    generateToken,
    generateRandomSalt,
    setTokenCookie,
    generateResetToken,
    validatePassword,
    getResetPasswordLink,
};

function generateToken(user) {
    const { password, permissions, ...userInfo } = user;
    return jwt.sign(
        userInfo,
        config.jwtSecret,
        // { expiresIn: accessTokenExpireTime }
    );
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
function generateResetToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password);
}
function getResetPasswordLink(token) {
    return `${config.appBaseUrl}/reset?token=${token}`;
}
