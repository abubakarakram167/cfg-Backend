/* Data Access Object 1 */

const model = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,

};
function getOneByID(options) {
    return model.messages.findOne(options);
}

function add(message) {
    return model.messages.create({ ...message, created_at: new Date() });
}

function findWhere(options) {
    return model.messages.findAll(options);
}
function getList() {
    return model.messages.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return model.messages.destroy({
        where: { id },
    });
}
