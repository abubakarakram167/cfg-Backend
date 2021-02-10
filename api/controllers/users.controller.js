const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const userService = require('../dal/users.dao');
const authHelper = require('../helpers/auth.helper');
const responseMessages = require('../helpers/response-messages');
const { sendEmail, sendWelcomeEmail } = require('../helpers/mail.helper');

module.exports = {
    addUser,
    register,
    login,
    loginSocial,
    listUsers,
    forgotPassword,
    resetPassword,
    updateStatus,
    deleteUsers,
    editUser,
};

async function insert(userData) {
    const user = { ...userData };
    user.passwordResetToken = authHelper.generateResetToken(64);
    user.passwordResetTokenSentTime = new Date();
    user.salt = authHelper.generateRandomSalt();
    user.password = bcrypt.hashSync(user.password + user.salt, 10);
    const userDb = await userService.addUser(user);
    const userRaw = await userDb.get({ plain: true });
    delete userRaw.password;
    delete userRaw.salt;
    const resetLink = authHelper.getResetPasswordLink(user.passwordResetToken);
    sendWelcomeEmail(user.email, resetLink);
    return userRaw;
}

async function addUser(req, res) {
    const requestObject = req.body;
    requestObject.createdBy = req.user.id;
    requestObject.password = 'addedByUser';
    await insert(requestObject);
    res.send({ message: responseMessages.recordAddSuccess });
}
async function editUser(req, res) {
    const { password, salt, ...user } = req.body;
    if (password && !authHelper.validatePassword(password)) {
        res.status(422).json({ message: responseMessages.invalidPasswordFormat });
        return;
    }
    if (password) {
        user.salt = authHelper.generateRandomSalt();
        user.password = bcrypt.hashSync(password + user.salt, 10);
    }
    const userRef = await userService.findOne({ where: { id: user.id } });
    if (!userRef) {
        res.status(404).send({ message: responseMessages.notFound.replace('?', 'User not registered or') });
        return;
    }
    await userRef.update(user);
    res.send({ message: responseMessages.recordUpdateSuccess });
}

async function register(req, res) {
    const { password } = req.body;
    const requestObject = req.body;
    if (!authHelper.validatePassword(password)) {
        res.status(422).json({ message: responseMessages.invalidPasswordFormat });
        return;
    }
    requestObject.passwordResetToken = authHelper.generateToken(64);
    requestObject.passwordResetTokenSentTime = new Date();
    await insert(requestObject);
    res.send({ message: responseMessages.recordAddSuccess });
}

async function login(req, res) {
    const { user } = req;
    delete user.password;
    delete user.salt;
    const token = authHelper.generateToken(user);
    authHelper.setTokenCookie(res, authHelper.generateToken(user));
    res.json({ user, token });
}

async function loginSocial(req, res) {
    const {
        email, source, socialId, firstName,
    } = req.body;

    if (!['facebook', 'google', 'twitter', 'microsoft'].includes(source) || !socialId) {
        res.status(422).send({ message: responseMessages.invalidSocial });
        return;
    }

    let user = await userService.findOne({
        where: {
            [Op.or]: [
                {
                    email,
                },
                {
                    [`${source}Id`]: socialId,
                },
            ],
        },
    });

    if (!user) {
        // add user and send email
        const requestObject = {
            firstName: firstName || '',
            email,
            password: Math.random().toString(36).substring(8),
        };
        user = await insert(requestObject);
    }
    await user.update({ [`${source}Id`]: socialId });
    user = await user.get({ plain: true });
    delete user.password;
    delete user.salt;
    const token = authHelper.generateToken(user);
    authHelper.setTokenCookie(res, authHelper.generateToken(user));
    res.json({ user, token });
}

async function listUsers(req, res) {
    const { limit, offset } = req.pagination;
    const {
        first_name, last_name, email, role,
    } = req.query;
    const object = {
        first_name, last_name, email, role,
    };
    const where = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const field of Object.keys(object)) {
        if (object[field]) where[field] = { [Op.like]: `%${object[field]}%` };
    }
    const users = await userService.findWhere({ where, offset, limit });
    res.json({ users });
}

async function forgotPassword(req, res) {
    const { email } = req.body;
    const user = await userService.findOne({ where: { email } });
    if (user) {
        const token = authHelper.generateToken(64);
        user.update({
            passwordResetToken: token,
            passwordResetTokenSentTime: new Date(),
        }).then(() => {
            sendEmail(
                email,
                responseMessages.passwordResetRequested,
                `click the link to reset password <a href="${authHelper.getResetPasswordLink(token)}</a>`,
            );
        });
    }
    res.send({ message: responseMessages.passwordResetRequestSent });
}

async function resetPassword(req, res) {
    const { token, password } = req.body;
    const hash = token.split[1];

    const user = await userService.findOne({ where: { passwordResetToken: token } });
    if (!user || dayjs(user.passwordResetTokenSentTime).add(30, 'minutes') < new Date()) {
        res.status(422).send({ message: responseMessages.passwordResetTokenInvalid });
        return;
    }
    if (!authHelper.validatePassword(password)) {
        res.status(422).json({ message: responseMessages.invalidPasswordFormat });
        return;
    }
    const salt = authHelper.generateRandomSalt();
    const updateData = {
        salt,
        passwordResetToken: null,
        password: bcrypt.hashSync(password + salt, 10),
    };
    let newUser = false;
    if (hash && hash === '9CD599A3523898E6A12E13EC787DA50A') {
        newUser = true;
        updateData.status = 1;
    }

    await user.update(updateData);
    res.send({ message: responseMessages.passwordChangeSuccess, newUser });
}

async function updateStatus(req, res) {
    const allowedStatuses = {
        pending: 0,
        approved: 1,
        disabled: 2,
    };
    const { status } = req.params;
    const { users } = req.body;

    await userService.update({ status: allowedStatuses[status] }, {
        where: {
            id: users,
        },
    });
    res.send({ message: responseMessages.recordUpdateSuccess });
}
async function deleteUsers(req, res) {
    const actor = req.user;
    const { users } = req.body;

    await userService.update({
        deletedAt: new Date(),
        deletedBy: actor.id,
    }, {
        where: {
            id: users,
        },
    });
    res.send({ message: responseMessages.recordDeleteSuccess });
}
