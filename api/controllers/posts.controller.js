/* Controller 1 */

const postService = require('../dal/user_posts.dao');

const model = require('../models');
const responseMessages = require('../helpers/response-messages');


module.exports = {
    createOnePost
    
};
async function insertPost(postData) {
    const post = { ...postData };
    const postDb = await postService.add(post);
    //const postRaw = await postDb.get({ plain: true });

    return postDb;
}
async function getPostById(postData) {
    const post = { ...postData };
    const postDb = await postService.getOneByID(post);
    const postRaw = await postDb.get({ plain: true });

    return postRaw;
}

async function findAllpost(options) {
    const postDb = await postService.findAnCountWhere(options);
    return postDb;
}

async function deletePostByID(postData) {
    const post = { ...postData };
    const postDb = await postService.deleteOne(post);
    return postDb;
}

async function createOnePost(req, res) {
    
    const requestObject = req.body;

    
    requestObject.user_id = req.user.id;
    
    
    console.log(requestObject);
    const post = await insertPost(requestObject);
    
    res.send({ post});
}

// async function editpost(req, res) {
//     const { id, type } = req.body;
//     const requestObject = req.body;
//     if (!allowedTypes.includes(type)) {
//         res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
//         return;
//     }
//     const postDb = await postService.getOneByID({
//         where: {
//             id,
//         },
//     });
//     delete requestObject.id;
//     requestObject.type = type;
//     requestObject.created_by = req.user.id;
//     await postDb.update(requestObject);
//     res.send({ message: responseMessages.recordUpdateSuccess });
// }

// async function getOnepostByID(req, res) {
//     const post = await getByIDpost({where:{id:req.params.id}});
//     res.send(post);
// }
// // this fucntion is for session only will return compelete session details including title and sub-tilte
// async function getSingleSessionCompleteDetails(req, res) {
//     const type = 'session';
//     const {id} =req.params;
//     if (!allowedTypes.includes(type)) {
//         res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
//         return;
//     }
//     var session = await findAllpost({
//         where: { type, id },
//         ...req.pagination,
//     });
//     var titles = await findAllpost({
//         where: { type:'title', post_header_id:id },
//         ...req.pagination,
//     });
//     let OurTitles = JSON.stringify(titles);
//     OurTitles = JSON.parse(OurTitles)

//     console.log(OurTitles.rows);

//     for (let title of OurTitles.rows) {
//         // eslint-disable-next-line no-await-in-loop
//         const subtitles = await findAllpost({
//             where: { type:'sub-title', post_header_id:title.id },
//             ...req.pagination,
//         });
//         title.subtitles=subtitles;
//     }
//     session.titles=OurTitles;
//     res.send({ data: session, count: session.count });
// }
// async function getListpostMultiple(req, res) {
//     const { type } = req.params;
//     if (!allowedTypes.includes(type)) {
//         res.status(422).send({ message: responseMessages.propertiesRequiredAllowed.replace('?', allowedTypes) });
//         return;
//     }
//     const post = await findAllpost({
//         where: { type },
//         ...req.pagination,
//     });
//     res.send({ data: post.rows, count: post.count });
// }

// async function deletepost(req, res) {
//     const post = await deleteByIDpost(req);
//     res.send(post);
// }
