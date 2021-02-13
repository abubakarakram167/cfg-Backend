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
    return model.groups.findOne(options);
}

function add(group) {
    return model.groups.create({ ...group, created_at: new Date() });
}

function findWhere(options) {
    return model.groups.findAll(options);
}
function getList() {
    return model.groups.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return model.groups.destroy({
        where: { id },
    });
}
