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
    return model.day_tools.findOne(options);
}

function add(dayTool) {
    return model.day_tools.create({ ...dayTool });
}

function findWhere(options) {
    return model.day_tools.findAll(options);
}
function getList() {
    return model.day_tools.findAll();
}
function deleteOne(options) {
    const { id } = options.params;
    return model.day_tools.destroy({
        where: { id },
    });
}
