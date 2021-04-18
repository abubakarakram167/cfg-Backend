/* Data Access Object 1 */

const {user_posts} = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,

};
function getOneByID(options) {
    return user_posts.findOne(options);
}

function add(group) {
    return user_posts.create({ ...group });
}

function findWhere(options) {
    return user_posts.findAll(options);
}
function getList() {
    return user_posts.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return user_posts.destroy({
        where: { id },
    });
}
