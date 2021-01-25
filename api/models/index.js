/* eslint global-require: "off" */
const model = {};
const fs = require('fs');

const schemaPath = `${__dirname}/schemas/`;

let initialized = false;

function init(sequelize) {
    delete module.exports.init; // Destroy itself to clash with a model named 'init'.
    initialized = true;
    model.sequelize = sequelize;
    // users related models
    model.users = sequelize.import('./schemas/users.js');
    model.categories = sequelize.import('./schemas/categories.js');

    fs.readdirSync(schemaPath).forEach((file) => {
        if (file.match(/(.+)\.js(on)?$/)) {
            if (Object.hasOwnProperty.call(
                // eslint-disable-next-line import/no-dynamic-require
                require(schemaPath + file),
                'initRelations',
            )) {
                // eslint-disable-next-line import/no-dynamic-require
                require(schemaPath + file).initRelations(model);
            }
        }
    });
    model.sequelize = sequelize;
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
