/* Controller 1 */

const contentService = require('../dal/content.dao');
const responseMessages = require('../helpers/response-messages');

const allowedTypes = [
    'reward',
    'tool',
    'session',
    'quiz',
    'event',
    'mini',
    'timeline',
];
module.exports = {
    createOneContent,
    getOneContentByID,
    getListContentMultiple,
    deleteContent,
    editContent,
};
async function insertContent(contentData) {
    const content = { ...contentData };
    const contentDb = await contentService.add(content);
    const contentRaw = await contentDb.get({ plain: true });

    return contentRaw;
}
async function getByIDContent(contentData) {
    const content = { ...contentData };
    const contentDb = await contentService.getOneByID(content);
    const contentRaw = await contentDb.get({ plain: true });

    return contentRaw;
}

async function findAllContent(options) {
    const contentDb = await contentService.findAnCountWhere(options);
    return contentDb;
}

async function deleteByIDContent(contentData) {
    const content = { ...contentData };
    const contentDb = await contentService.deleteOne(content);
    return contentDb;
}
async function createOneContent(req, res) {
    const { type } = req.params;
    const requestObject = req.body;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    delete requestObject.id;
    requestObject.type = type;
    requestObject.created_by = req.user.id;
    const content = await insertContent(requestObject);
    res.send(content);
}

async function editContent(req, res) {
    const { id, type } = req.body;
    const requestObject = req.body;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    const contentDb = await contentService.getOneByID({
        where: {
            id,
        },
    });
    delete requestObject.id;
    requestObject.type = type;
    requestObject.created_by = req.user.id;
    await contentDb.update(requestObject);
    res.send({ message: responseMessages.recordUpdateSuccess });
}

async function getOneContentByID(req, res) {
    const content = await getByIDContent(req.params.id);
    res.send(content);
}

async function getListContentMultiple(req, res) {
    const { type } = req.params;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    const content = await findAllContent({
        where: { type },
        ...req.pagination,
    });
    res.send({ data: content.rows, count: content.count });
}

async function deleteContent(req, res) {
    const content = await deleteByIDContent(req);
    res.send(content);
}
