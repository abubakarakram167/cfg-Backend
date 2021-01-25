/* eslint consistent-return:0 */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const responseMessages = require('../helpers/response-messages');

const userDao = require('../dal/users.dao');
const config = require('../config/config');

const localLogin = new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    let user = await userDao.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password + user.salt, user.password)) {
        return done(null, false, { error: responseMessages.invalidLoginCreds });
    }
    if (user.status !== 1) {
        return done(null, false, { error: responseMessages.userInactive });
    }
    user = await user.get({ plain: true });
    done(null, user);
});

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}, async (payload, done) => {
    const user = payload;
    if (!user) {
        return done(null, false);
    }
    done(null, user);
});

passport.use('jwt', jwtLogin);
passport.use('local', localLogin);

module.exports = passport;
