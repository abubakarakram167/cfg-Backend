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
    return model.friends.findOne(options);
}

function add(group) {
    return model.friends.create({ ...group });
}

function findWhere(options) {
    return model.friends.findAll(options);
}
function getList() {
    return model.friends.findAll();
}

function update(data, options) {
    return model.friends.update(data, options);
}

function deleteOne(options) {
    const { id } = options.params;
    return model.friends.destroy({
        where: { id },
    });
}
