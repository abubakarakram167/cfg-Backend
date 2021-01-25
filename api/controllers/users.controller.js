const bcrypt = require('bcryptjs');
const userService = require('../dal/users.dao');
const authHelper = require('../helpers/auth.helper');

module.exports = {
    register,
    login,
};

async function insert(userData) {
    const user = { ...userData };
    user.salt = authHelper.generateRandomSalt();
    user.password = bcrypt.hashSync(user.password + user.salt, 10);

    const userDb = await userService.addUser(user);
    const userRaw = await userDb.get({ plain: true });
    delete userRaw.password;
    delete userRaw.salt;
    return userRaw;
}

async function register(req, res, next) {
    const user = await insert(req.body);
    req.user = user;
    next();
}

async function login(req, res) {
    const { user } = req;

    const token = authHelper.generateToken(user);
    authHelper.setTokenCookie(res, authHelper.generateToken(user));
    res.json({ user, token });
}
