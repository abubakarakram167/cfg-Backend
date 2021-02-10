/* Data Access Object 1 */

const model = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    findAnCountWhere,
};
function getOneByID(options) {
    return model.content.findOne(options);
}

function add(content) {
    return model.content.create({ ...content, created_at: new Date() });
}

function findWhere(options) {
    return model.content.findAll(options);
}
function findAnCountWhere(args) {
    const options = args;
    options.include = [
        {
            model: model.users,
            attributes: ['id', 'first_name', 'last_name', 'user_name', 'email'],
            as: 'author',
        },
    ];
    return model.content.findAndCountAll(options);
}
function getList() {
    return model.content.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return model.content.destroy({
        where: { id },
    });
}
