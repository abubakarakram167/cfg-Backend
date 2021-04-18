/* Data Access Object 1 */

const {comments} = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,

};
function getOneByID(options) {
    return comments.findOne(options);
}

function add(group) {
    return comments.create({ ...group });
}

function findWhere(options) {
    return comments.findAll(options);
}
function getList() {
    return comments.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return comments.destroy({
        where: { id },
    });
}
