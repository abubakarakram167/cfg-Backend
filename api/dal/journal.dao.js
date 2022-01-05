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
    return model.journal.findOne(options);
}

function add(journal) {
    return model.journal.create({ ...journal, created_at: new Date() });
}

function findWhere(options) {
    return model.journal.findAll(options);
}

function getList() {
    return model.journal.findAll();
}
function update(data, options) {
    return model.journal.update(data, options);
}
function deleteOne(id) {

    return model.journal.destroy({
        where: { id },
    });
}
