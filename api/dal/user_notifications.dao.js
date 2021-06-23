/* Data Access Object 1 */

const model = require('../models');
module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    update
};
function getOneByID(options) {
    return model.user_notifications.findOne(options);
}

function add(question) {
    return model.user_notifications.create({ ...question, created_at: new Date() });
}

function findWhere(options) {
    return model.user_notifications.findAll(options);
}
function getList() {
    return model.user_notifications.findAll();
}
function update(data, options) {
    return model.user_notifications.update(data, options);
}

