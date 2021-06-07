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
    return model.quiz.findOne(options);
}

function add(quiz) {
  return model.quiz.create({ ...quiz, created_at: new Date() , updated_at: new Date()});
}

function findWhere(options) {
    return model.quiz.findAll(options);
}
function getList() {
    return model.quiz.findAll();
}
function update(data, options) {
    return model.quiz.update(data, options);
}
function deleteOne(options) {
    const { id } = options.params;
    return model.quiz.destroy({
        where: { id },
    });
}
