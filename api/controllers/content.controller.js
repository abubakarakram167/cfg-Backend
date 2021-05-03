/* Controller 1 */

const contentService = require('../dal/content.dao');
const dayToolService = require('../dal/dayTools.dao')
const postService = require('../dal/user_posts.dao')
const userService = require('../dal/users.dao')
const friendCtrl = require('./friends.controller')
const model = require('../models');
const responseMessages = require('../helpers/response-messages');
const dayJs = require('dayjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


const allowedTypes = [
    'reward',
    'tool',
    'session',
    'quiz',
    'event',
    'mini',
    'timeline',
    'title',
    'sub-title',
];
module.exports = {
    createOneContent,
    getOneContentByID,
    getListContentMultiple,
    getSingleSessionCompleteDetails,
    deleteContent,
    editContent,
    getDayTools,
    search
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

async function searchUsers(searchString) {
    let users = await userService.findWhere({
        where: {
            [Op.or]: [{
                first_name: {
                    [Op.like]: `%${searchString}%`
                }
            }, {
                last_name: {
                    [Op.like]: `%${searchString}%`
                }
            }]

        },
        attributes: ['id', 'first_name', 'last_name']
    })
    return users;
}
async function searchPosts(searchString, userId) {
    let userFriends = await friendCtrl.getUserFriendsById(userId);
    let userRole = await userService.findOne({
        where: { id: userId },
        attributes: ['role']
    })
    userRole = userRole.role;
    let today = new Date();
    let tool_day = dayJs(today).format("YYYY-MM-DD")
    let posts = await postService.findWhere({
        where: {
            [Op.or]: [
                {
                    content: {
                        [Op.like]: `%${searchString}%`
                    }
                },
                {
                    title: {
                        [Op.like]: `%${searchString}%`
                    }
                }
            ],
            publish_date: {
                [Op.or]: [null, { [Op.lte]: tool_day }]
            },
            assigned_group: {
                [Op.or]: [null, userRole]
            },
            user_id: {
                [Op.in]: userFriends
            },
            deletedAt: null,
            status: 'published'

        },
        attributes: ['id', 'title', 'content']
    })

    return posts;
}

async function searchContent(searchString, userId) {

    let userRole = await userService.findOne({
        where: { id: userId },
        attributes: ['role']
    })
    userRole = userRole.role;
    let today = new Date();
    let tool_day = dayJs(today).format("YYYY-MM-DD")
    let tools = await contentService.findWhere({
        where: {
            title: {
                [Op.like]: `%${searchString}%`
            },
            start_date: {
                [Op.lte]: tool_day 
            },
            end_date: {
                [Op.gt]: tool_day 
            },
            assigned_group: {
                [Op.or]: [null, userRole]
            },
            status: 'published',
            type:'tool'
        },
        attributes: ['id', 'title', 'detail']
    })

    let events = await contentService.findWhere({
        where: {
            title: {
                [Op.like]: `%${searchString}%`
            },
            start_date: {
                [Op.lte]: tool_day 
            },
            end_date: {
                [Op.gt]: tool_day 
            },
            assigned_group: {
                [Op.or]: [null, userRole]
            },
            status: 'published',
            type:'event'
        },
        attributes: ['id', 'title', 'detail']
    })

    

    return {tools , events};
}



//Exported functions start here
async function createOneContent(req, res) {
    const { type } = req.params;
    const { user } = req;
    const requestObject = req.body;
    const id = requestObject;
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    delete requestObject.id;
    requestObject.type = type;
    requestObject.created_by = req.user.id;
    console.log(requestObject.tags);
    if (!requestObject.tags) {
        requestObject.tags = []
        console.log("No tags")
    }
    let tempTags = requestObject.tags
    requestObject.tags = JSON.stringify(requestObject.tags);
    console.log(requestObject);
    const content = await insertContent(requestObject);
    requestObject.tags = tempTags
    // content = await content.get({ plain: true });
    const tagsData = requestObject.tags.map((t) => {
        const r = t;
        if (!r.createdBy) {
            r.createdBy = req.user.id;
        }
        r.updatedAt = new Date();
        return r;
    });
    const tags = await model.tags.bulkCreate(tagsData,
        {
            fields: ['id', 'text', 'tagType', 'createdBy'],
            updateOnDuplicate: ['updatedAt'],
        });
    const contentTags = [];
    // eslint-disable-next-line no-restricted-syntax
    for (let tag of tags) {
        // eslint-disable-next-line no-await-in-loop
        tag = await tag.get({ plain: true });
        contentTags.push({
            tagId: tag.id,
            contentId: content.id,
        });
    }
    // add tags for content
    await model.contentTags.bulkCreate(contentTags);
    content.tags = tags;
    if (requestObject.type === 'timeline') {
        let postAddObject = {};

        requestObject.title != undefined ? postAddObject.title = requestObject.title : null
        requestObject.detail != undefined ? postAddObject.content = requestObject.detail : null
        requestObject.start_date != undefined ? postAddObject.publish_date = requestObject.start_date : null
        requestObject.status != undefined ? postAddObject.status = requestObject.status : null
        requestObject.assigned_group != undefined ? postAddObject.assigned_group = requestObject.assigned_group : null
        postAddObject.user_id = user.id;
        console.log("post object", postAddObject);
        let newPost = await postService.add({ ...postAddObject, timeline_id: content.id });

    }
    const socket = require('../helpers/socket.io').getIO();
    socket.emit('post', content.id);
    res.send({ content });
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
    if (requestObject.type === 'timeline') {
        let postUpdateObject = {};

        requestObject.title != undefined ? postUpdateObject.title = requestObject.title : null
        requestObject.detail != undefined ? postUpdateObject.content = requestObject.detail : null
        requestObject.start_date != undefined ? postUpdateObject.publish_date = requestObject.start_date : null
        requestObject.status != undefined ? postUpdateObject.status = requestObject.status : null
        requestObject.assigned_group != undefined ? postUpdateObject.assigned_group = requestObject.assigned_group : null

        let updatedPost = await postService.update(postUpdateObject, { where: { timeline_id: id } });

    }
    res.send({ message: responseMessages.recordUpdateSuccess });
}

async function getOneContentByID(req, res) {
    const content = await getByIDContent({ where: { id: req.params.id } });
    res.send(content);
}
// this fucntion is for session only will return compelete session details including title and sub-tilte
async function getSingleSessionCompleteDetails(req, res) {
    const {type} = req.params;
    const { id } = req.params;
    let allowedTypes = [
        'tool',
        'session'
    ]
    if (!allowedTypes.includes(type)) {
        res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
        return;
    }
    var session = await findAllContent({
        where: { type, id },
        ...req.pagination,
    });
    var titles = await findAllContent({
        where: { type: 'title', content_header_id: id },
        ...req.pagination,
    });
    let OurTitles = JSON.stringify(titles);
    OurTitles = JSON.parse(OurTitles)

    console.log(OurTitles.rows);

    for (let title of OurTitles.rows) {
        // eslint-disable-next-line no-await-in-loop
        const subtitles = await findAllContent({
            where: { type: 'sub-title', content_header_id: title.id },
            ...req.pagination,
        });
        title.subtitles = subtitles;
    }
    session.titles = OurTitles;
    res.send({ data: session, count: session.count });
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
    const post = await postService.deleteOne({ timeline_id: Number(req.params.id) })
    // const post = await postService.deleteOne({id:8})
    const content = await deleteByIDContent(req);
    res.send({ ...content, ...post });
}


async function getDayTools(req, res) {
    let tools = [];
    let today = new Date();
    let tool_day = dayJs(today).format("YYYY-MM-DD")
    let existingTool = await dayToolService.findWhere({ where: { tool_day } })
    if (existingTool.length > 0) {
        //tool exists
        let dayTool = existingTool[0];
        let returnTools = await contentService.findWhere({
            where: {
                [Op.or]: [{ id: dayTool.tool_id1 }, { id: dayTool.tool_id2 }]
            },
            attributes: ['id', 'title', 'featured_image_url'],
            raw: true
        })
        tools = returnTools;
    } else {
        //tool has to be created and returned
        let toolsInDb = await contentService.findWhere({
            where: {
                start_date: { [Op.lte]: tool_day },
                end_date: { [Op.gt]: tool_day },
                type: "tool",
                status: "published"
            },
            attributes: ['id', 'title', 'featured_image_url'],
            raw: true
        })
        if (toolsInDb.length < 2) {
            return res.status(401).send({ message: "Not Enough tools found in database" })
        }
        var firstToolIndex = Math.floor(Math.random() * toolsInDb.length);
        var secondToolIndex = Math.floor(Math.random() * toolsInDb.length);
        while (firstToolIndex === secondToolIndex) {
            secondToolIndex = Math.floor(Math.random() * toolsInDb.length);
        }
        let dayTools = await dayToolService.add({
            tool_id1: toolsInDb[firstToolIndex].id,
            tool_id2: toolsInDb[secondToolIndex].id,
            tool_day
        })

        tools.push(toolsInDb[firstToolIndex])
        tools.push(toolsInDb[secondToolIndex])
    }

    res.send(tools);
}


async function search(req, res) {
    const { user } = req;
    let searchResult = {};
    let searchString = req.params.string;
    console.log(searchString);
    let users = await searchUsers(searchString);
    let posts = await searchPosts(searchString, user.id);
    let content = await searchContent(searchString, user.id);
    const {tools , events} = content;

    searchResult = { users: users, posts: posts , tools:tools , events:events };
    res.send(searchResult)
}