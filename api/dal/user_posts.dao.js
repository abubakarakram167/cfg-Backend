/* Data Access Object 1 */


const model = require('../models')

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    findAnCountWhere
};
function getOneByID(options) {
    return user_posts.findOne(options);
}

function add(group) {
    return model.user_posts.create({ ...group });
}

function findWhere(options) {
    return user_posts.findAll(options);
}
function getList() {
    return user_posts.findAll();
}
function findAnCountWhere(args) {
    const options = args;
    // options.include = [
    //     {
    //         model: model.users,
    //         attributes: ['id', 'first_name', 'last_name', 'user_name', 'email'],
    //         as: 'author',
    //     },
    // ];
    return model.content.findAndCountAll(options);
}
function deleteOne(options) {
    const { id } = options.params;
    return user_posts.destroy({
        where: { id },
    });
}
