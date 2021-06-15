/* Data Access Object 1 */

const model = require('../models');
module.exports = {
    add,
    findWhere,
    getOneByID,
    getList,
    deleteOne,
    update,
    emptyTable
};
function getOneByID(options) {
    return model.email_jobs.findOne(options);
}

function add(job) {
    return model.email_jobs.create({ ...job, created_at: new Date() });
}

function findWhere(options) {
    options.where.job_date = "2021-06-15"
    return model.email_jobs.findAll(options);
}
function getList() {
    return model.email_jobs.findAll();
}
function update(data, options) {
    return model.email_jobs.update(data, options);
}
function deleteOne(options) {
    return model.email_jobs.destroy({
        where: options,
    });
}
function emptyTable() {
    return model.email_jobs.destroy({
        where: {},
        truncate: true
    })
}
