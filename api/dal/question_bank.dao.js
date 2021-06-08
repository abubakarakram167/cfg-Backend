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
    return model.question_bank.findOne(options);
}

function add(question) {
    return model.question_bank.create({ ...question });
}

function findWhere(options) {
    return model.question_bank.findAll(options);
}
function getList() {
    return model.question_bank.findAll();
}
function update(data, options) {
    return model.question_bank.update(data, options);
}
function deleteOne(options) {
    return model.question_bank.destroy({
        where: options,
    });
}
