/* Controller 1 */

const journalService = require('../dal/journal.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');

const responseMessages = require('../helpers/response-messages');


module.exports = {
    addJournal,
    getJournals,
    updateJournal,
    deleteJournal
};
async function insertJournal(journal) {

    const journalDb = await journalService.add(journal);
    const journalRaw = await journalDb.get({ plain: true });

    return journalRaw;
}

async function updateJournal(req, res) {



    const journalDb = await journalService.update(data, journal);
    res.send({ message: responseMessages.recordUpdateSuccess });

    //const postRaw = await postDb.get({ plain: true });

    return journalDb;
}


async function addJournal(req, res) {
    const { user } = req;
    let userId = user.id;
    let reqObj = req.body;

    reqObj.created_by = userId;
    reqObj.created_at = new Date();
    console.log("into add journal function", reqObj);
    insertJournal(reqObj)
        .then(result => {
            res.send({ result,message: "Journal added successfully" });
        })
        .catch(err => {
            res.send({ err,message: "an error occurred", error: err });
        })


}


async function getJournals(req, res) {
    const { limit, offset } = req.pagination;
    const { id, subject, status, parent, user_id, content_id, type } = req.query;
    const object = {
        subject,
        content_id,
        parent,
        user_id,
        status,
        type, id
    };
    const where = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const field of Object.keys(object)) {
        if (object[field]) where[field] = { [Op.like]: `%${object[field]}%` };
    }
    const journals = await journalService.findWhere({ where, offset, limit });

    res.send(journals)


}

async function updateJournal(req, res) {
    let reqObj = req.body;
    let allowedKeys = ["user_id", "subject","detail", "content_id", "start_date", "end_date", "track_my_goal", "log_date", "points", "status", "type", "parent"];
    let journalId = Number(req.params.id)

    for (const property in reqObj) {
        if (!allowedKeys.includes(property)) {
            delete reqObj[property];
        }
    }

    const journalDb = await journalService.update(reqObj, {
        where: {
            id: journalId,
        },
    });
    res.send({ journalDb,message: responseMessages.recordUpdateSuccess });



    return journalDb;
}


async function deleteJournal(req, res) {
    let journalId = Number(req.params.id)
    await journalService.deleteOne(journalId)
    res.send({ message: "Record deleted successfully"})

}


