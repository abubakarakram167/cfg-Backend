/* eslint consistent-return:0 */
const passport = require('passport');
const dayjs = require('dayjs');
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
    if(user){var timeafter30 = dayjs(user.passwordAttemptTime).add(30, 'minutes');}
    //console.log("after 30 minutes " , timeafter30 , " and now: ", new Date());
    if (user && timeafter30 > new Date() && user.passwordAttemptsCount >= 5) {
        return done(null, false, { message: responseMessages.accountLockedFor30Minutes });
    }
    if (!user || !await bcrypt.compare(password + user.salt, user.password)) {
        if (user) {
            user.update({
                passwordAttemptsCount: user.passwordAttemptsCount + 1,
                passwordAttemptTime: new Date(),
            });
        }
        return done(null, false, { message: responseMessages.invalidLoginCreds });
    }
    user.update({
        passwordAttemptsCount: 0,
        passwordAttemptTime: new Date(),
    });

    // if (user.status !== 1) {
    //     return done(null, false, { message: responseMessages.userInactive });
    // }
    user = await user.get({ plain: true });
    done(null, user);
});

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.access;
    }
    return token;
};

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken,
    ]),
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
