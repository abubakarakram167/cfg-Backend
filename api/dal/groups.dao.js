/* Data Access Object 1 */

const model = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    update
};
function getOneByID(options) {
    return model.groups.findOne(options);
}

function add(group) {
    return model.groups.create({ ...group });
}

function findWhere(options) {
    return model.groups.findAll(options);
}
function getList() {
    return model.groups.findAll();
}
function update(data, options) {
    return model.groups.update(data, options);
}

function deleteOne(options) {
    const { id } = options.params;
    return model.groups.destroy({
        where: { id },
    });
}
