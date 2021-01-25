const passport = require('passport');
const { guestURLs, localAuthURLs } = require('../library/constants');
const responseMessages = require('../helpers/response-messages');

function jwtAuthHandler(req, res, next) {
    passport.authenticate('jwt', { session: false }, (info, user, error) => {
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        if (!user) {
            res.status(401).json({ error: info.message });
            return;
        }
        req.user = user;
        if (
            !req.ignorePermissionsCheck
            && (
                !req.user
                || !req.user.permissions
                || !req.user.permissions.includes(req.originalUrl)
            )
        ) {
            res.status(401).json({ code: 401, message: responseMessages.permissionDenied });
            return;
        }
        next();
    })(req, res, next);
}

function localAuthHandler(req, res, next) {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (!user) {
            res.status(401).json(info);
            return;
        }
        req.user = user;
        next(error, user, info);
    })(req, res, next);
}

function authFactory(req, res, next) {
    const regex = /\w*\/[a-zA-Z0-9]{21}\b/;
    let endpoint = req.originalUrl.split('?')[0];
    if (regex.test(req.originalUrl)) {
        const endpointPrefix = endpoint.split('/');
        endpointPrefix.pop();
        endpoint = `${endpointPrefix.join('/')}:/`;
    }

    const finalEndpoint = `${req.method}::${endpoint}`;
    if (guestURLs.includes(finalEndpoint)) {
        req.ignorePermissionsCheck = true;
        next();
    } else if (localAuthURLs.includes(finalEndpoint)) {
        req.ignorePermissionsCheck = true;
        localAuthHandler(req, res, next);
    } else {
        req.ignorePermissionsCheck = true; // todo add permissions and remove
        jwtAuthHandler(req, res, next);
    }
}

module.exports = { authFactory };
