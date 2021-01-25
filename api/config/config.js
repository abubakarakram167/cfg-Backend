const env = require('../library/env');

env.required([
    'SERVER_PORT',
    'JWT_SECRET',
    'JWT_COOKIE_SECRET',
    'SUPPORT_EMAIL',
    'SERVICE_LOG_TAG',
]);
const config = {
    env: env.get('NODE_ENV', 'development'),
    port: env.get('SERVER_PORT', 6000, Number),
    jwtSecret: env.get('JWT_SECRET'),
    jwtCookieSecret: env.get('JWT_COOKIE_SECRET'),
    apiUrl: env.get('API_URL'),
    supportEmail: env.get('SUPPORT_EMAIL'),
    serviceLogTag: env.get('SERVICE_LOG_TAG'),
};

module.exports = config;
