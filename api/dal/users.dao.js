const model = require('../models');

module.exports = {
    addUser,
    findOne,
    findWhere,
};

function findOne(options) {
    return model.users.findOne(options);
}

function addUser(user) {
    return model.users.create({ ...user, createdAt: new Date() });
}

function findWhere(options) {
    return model.users.findAll(options);
}
