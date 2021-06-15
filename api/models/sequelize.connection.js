/* eslint no-console: 0 , no-param-reassign:0 */
const Sequelize = require('sequelize');

function sequelizeConnect(config) {
    if (config.logging) {
        delete config.logging;
    }
    //config.logging = false;
    //config.logging = true;
    const sequelize = new Sequelize(config);
    sequelize.authenticate()
        .then(() => {
            config.password = new Array(config.password.length + 1).join('*');
            console.info('Mysql connection has been established successfully');
            console.info(config);
            console.info('***************************************************');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
    return sequelize;
}

module.exports = sequelizeConnect;
