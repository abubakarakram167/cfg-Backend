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
    return model.cfg_invites.findOne(options);
}

function add(cfg_invites) {
    return model.cfg_invites.create({ ...cfg_invites, created_at: new Date() });
}

function findWhere(options) {
    return model.cfg_invites.findAll(options);
}

function getList() {
    return model.cfg_invites.findAll();
}
function update(data, options) {
    return model.cfg_invites.update(data, options);
}
function deleteOne(id) {

    return model.cfg_invites.destroy({
        where: { id },
    });
}
