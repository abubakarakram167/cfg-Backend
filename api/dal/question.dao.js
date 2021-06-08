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
    return model.question.findOne(options);
}

function add(question) {
    return model.question.create({ ...question, createdAt: new Date() });
}

function findWhere(options) {
    options.is_deleted = false;
    return model.question.findAll(options);
}
function getList() {
    return model.question.findAll();
}
function update(data, options) {
    return model.question.update(data, options);
}
function deleteOne(options) {
    const { id } = options.params;
    return model.question.update({is_deleted:true},{
        where: { id: id },
    });
}
