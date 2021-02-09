const env = require('../library/env');

env.required([
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
]);
const config = {
    host: env.get('SMTP_HOST'),
    port: env.get('SMTP_PORT', 587, Number),
    user: env.get('SMTP_USER'),
    pass: env.get('SMTP_PASS'),
};

module.exports = config;
