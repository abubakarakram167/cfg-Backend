const model = require('../models');

module.exports = {
    addUser,
    findOne,
    findWhere,
    update,
};

function findOne(paramsObject) {
    const options = paramsObject;
    options.where.deletedAt = null;
    return model.users.findOne(options);
}

function addUser(user) {
    return model.users.create({ ...user, createdAt: new Date() });
}

function findWhere(paramsObject) {
    const options = paramsObject;
    options.where.deletedAt = null;
    return model.users.findAll(options);
}
function update(data, options) {
    return model.users.update(data, options);
}
