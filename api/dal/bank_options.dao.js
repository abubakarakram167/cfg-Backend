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
    return model.bank_options.findOne(options);
}

function add(question) {
    return model.bank_options.create({ ...question });
}

function findWhere(options) {
    return model.bank_options.findAll(options);
}
function getList() {
    return model.bank_options.findAll();
}
function update(data, options) {
    return model.bank_options.update(data, options);
  }
function deleteOne(options) {
    return model.bank_options.destroy({
        where: options,
    });
}
