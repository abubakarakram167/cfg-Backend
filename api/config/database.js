const env = require('../library/env');

env.required(['USER_NAME', 'PASSWORD', 'DATABASE', 'HOST']);

const config = {
  [env.get('NODE_ENV', 'development')]: {
    username: env.get('USER_NAME'),
    password: env.get('PASSWORD'),
    database: env.get('DATABASE'),
    host: env.get('HOST'),
    port: env.get('PORT', 3306, Number),
    dialect: env.get('DIALECT', 'mysql'),
    logging: env.get('LOGGING', false, Boolean),
  },
};

module.exports = config;
