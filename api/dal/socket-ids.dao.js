/* Data Access Object 1 */

const model = require('../models');
module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    update,
    emptyTable,
    findOrCreate
};
function getOneByID(options) {
    return model.socket_ids.findOne(options);
}

function add(socket) {
    return model.socket_ids.create({ ...socket, created_at: new Date() });
}

function findWhere(options) {
    return model.socket_ids.findAll(options);
}
function getList() {
    return model.socket_ids.findAll();
}
function update(data, options) {
    return model.socket_ids.update(data, options);
}
function deleteOne(options) {
    return model.socket_ids.destroy({
        where: options,
    });
}
function findOrCreate(options) {
    return model.socket_ids.findOrCreate(options)
}
function emptyTable() {
    return model.socket_ids.destroy({
        where: {},
        truncate: true
    })
}
