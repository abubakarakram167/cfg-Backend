/* Data Access Object 1 */

const {friends} = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,

};
function getOneByID(options) {
    return friends.findOne(options);
}

function add(group) {
    return friends.create({ ...group });
}

function findWhere(options) {
    return friends.findAll(options);
}
function getList() {
    return friends.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return friends.destroy({
        where: { id },
    });
}
