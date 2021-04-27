/* Data Access Object 1 */


const model = require('../models')

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    findAnCountWhere,
    update
};
function getOneByID(options) {
    return model.user_posts.findOne(options);
}

function add(group) {
    return model.user_posts.create({ ...group });
}

function findWhere(options) {
    return model.user_posts.findAll(options);
}
function getList() {
    return model.user_posts.findAll();
}
function findAnCountWhere(args) {
    const options = args;
    return model.user_posts.findAndCountAll(options);
}
function update(data, options) {
    return model.user_posts.update(data, options);
}
function deleteOne(options) {
    
    return model.user_posts.destroy({
        where: options,
    });
}
