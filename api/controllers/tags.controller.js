/* Controller 1 */

const model = require('../models');
const responseMessages = require('../helpers/response-messages');

const allowedTypes = [
    'keyword',
    'group',
    'category',
];

const createTag = async (req, res) => {
    const { type } = req.params;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    const requestObject = req.body;
    requestObject.createdAt = new Date();
    requestObject.createdBy = req.user.id;
    requestObject.tagType = type;
    await model.tags.create(requestObject);
    res.send({ message: responseMessages.recordAddSuccess });
};
const listTags = async (req, res) => {
    const { type } = req.params;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    const { rows, count } = await model.tags.findAndCountAll({
        where: {
            tagType: type,
        },
        ...req.pagination,
    });
    res.send({ data: rows, count });
};

module.exports = {
    createTag,
    listTags,
};
