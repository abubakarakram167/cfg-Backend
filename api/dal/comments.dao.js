/* Data Access Object 1 */

const model = require('../models');

module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    update,
    findAndCount
};
function getOneByID(options) {
    return model.comments.findOne(options);
}

function add(comment) {
    return model.comments.create({ ...comment });
}

function findWhere(options) {
    return model.comments.findAll(options);
}

function findAndCount(options) {

    return model.comments.findAndCountAll(options);

}


function getList() {
    return model.comments.findAll();
}
function update(data, options) {
    return model.comments.update(data, options);
}
function deleteOne(id,created_by) {
    //const { id } = options.params;
    return model.comments.destroy({
        where: { id , created_by },
    });
}
