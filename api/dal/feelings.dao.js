/* Data Access Object 1 */

const {feelings} = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,

};
function getOneByID(options) {
    return feelings.findOne(options);
}

function add(group) {
    return feelings.create({ ...group });
}

function findWhere(options) {
    return feelings.findAll(options);
}
function getList() {
    return feelings.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return feelings.destroy({
        where: { id },
    });
}
