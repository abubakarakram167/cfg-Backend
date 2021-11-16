/* Controller 1 */

const statusService = require('../dal/status.dao');
module.exports = {
    createOneStatus,
    getOneStatusByID,
    getListStatusMultiple,
    deleteStatus,

};
async function insertStatus(statusData) {
    const status = { ...statusData };
    const statusDb = await statusService.add(status);
    const statusRaw = await statusDb.get({ plain: true });

    return statusRaw;
}
async function getByIDStatus(statusData) {
    const status = { ...statusData };
    const statusDb = await statusService.getOneByID(status);
    const statusRaw = await statusDb.get({ plain: true });

    return statusRaw;
}

async function findAllStatus() {
    const statusDb = await statusService.getList();
    return statusDb;
}

async function deleteByIDStatus(statusData) {
    const status = { ...statusData };
    const statusDb = await statusService.deleteOne(status);
    return statusDb;
}
async function createOneStatus(req, res) {
    const status = await insertStatus(req.body);
    res.send(status);
}

async function getOneStatusByID(req, res) {
    const status = await getByIDStatus(req.params.id);
    res.send(status);
}

async function getListStatusMultiple(_req, res) {
    const status = await findAllStatus();
    res.send(status);
}

async function deleteStatus(req, res) {
    const status = await deleteByIDStatus(req);
    res.send(status);
}

