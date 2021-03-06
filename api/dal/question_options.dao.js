/* Data Access Object 1 */

const model = require('../models');
module.exports = {
  add,
  findWhere,
  getOneByID,
  getList,
  deleteOne,   
};

function getOneByID(options) {
  return model.question_options.findOne(options);
}

function add(question_option) {
    return model.question_options.create({ ...question_option, createdAt: new Date() });
}

function findWhere(options) {
  return model.question_options.findAll(options);
}
function getList() {
    return model.question_options.findAll();
}
function deleteOne(options) {
  const { id } = options.params;
  return model.question_options.destroy({
      where: { id: id },
  });
}
  