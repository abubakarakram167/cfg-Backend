/* Controller 1 */

const postService = require('../dal/user_posts.dao');
const userService = require('../dal/users.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');
const friendCtrl = require('./friends.controller')
const responseMessages = require('../helpers/response-messages');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const dayJs = require('dayjs')
const helpers = require('./helperFunctions')

module.exports = {
    createOnePost,
    getTimelinePosts,
    deletepost,
    getOnePostById,
    updatePost
};

//Task Processor functions
async function insertPost(postData) {
    const post = { ...postData };
    const postDb = await postService.add(post);
    const postRaw = await postDb.get({ plain: true });

    return postRaw;
}
async function getPostById(postId) {
    const postDb = await postService.getOneByID({ where: { id: postId, deletedAt: null } });
    const postRaw = await postDb.get({ plain: true });

    return postRaw;
}

async function findAllpost(options) {
    const postDb = await postService.findAnCountWhere(options);
    return postDb;
}

function transformArrayToBracket(array) {
    let bracketString = "("
    array.forEach((element, index) => {
        index == 0 ? bracketString += element : bracketString += `,${element}`
    });
    bracketString += ")";
    return bracketString;
}

async function findTimelinePosts(userId) {

    let userFriends = await friendCtrl.getUserFriendsById(userId);
    let today = new Date();
    let tool_day = dayJs(today).format("YYYY-MM-DD")
    let userRole = await userService.findOne({
        where: { id: userId },
        attributes: ['role']
    })
    userRole = userRole.role;
    userFriends.push(userId)
    console.log(userRole);
    let posts = await postService.findWhere({
        where: {
            publish_date: {
                [Op.or]: [null, { [Op.lte]: tool_day }]
            },
            [Op.or]: [
                 {[Op.and]:[{assigned_group: null} , { user_id: {[Op.in]: userFriends} } ]  },
                 {assigned_group: userRole}
            ],
            deletedAt: null,
            status: 'published'

        }
    })
    // let userFriendsSQL = transformArrayToBracket(userFriends);
    // //this part selects timeline posts assigned to specific user role
    // let userRoleQuery = ` AND assigned_group = (SELECT role from users WHERE id=${userId}) `;  

    // //below query gets timeline posts added by admin
    // //let adminSideQuery = "SELECT * FROM (SELECT 'admin_post' as post_type , content.created_by , content.detail as content , 'dumm1' as feeling ,'dumm2' as media, love_count,comment_count,  share_count , created_at , updated_at from content WHERE start_date <= CURDATE() AND end_date  > CURDATE() AND type = 'timeline'"

    // //below query gets timeline posts added by other candidate friends
    // let userSideQuery = "SELECT 'user_post' as post_type , user_id as created_by , content ,feeling ,media, love_count,comment_count, share_count , created_at , updated_at from user_posts WHERE deleted_at IS NULL AND user_id IN " + userFriendsSQL + userRoleQuery + " ORDER BY created_at"

    // //finally preapred query that prepares dataset for timeline
    // let timelineQuery =    userSideQuery;

    //const posts = await model.sequelize.query( timelineQuery, { type: QueryTypes.SELECT });

    return posts;
}

async function deletePostByID(postId, userId) {
    let deletedAt = new Date();
    const postDb = await postService.update({ deletedAt }, { where: { id: postId, user_id: userId } });
    return postDb;
}





//Req Processor functions

async function createOnePost(req, res) {

    const requestObject = req.body;


    requestObject.user_id = req.user.id;


    console.log(requestObject);
    const post = await insertPost(requestObject);
    helpers.emitPostIdToUsers(post.id , "user")
    helpers.sendEmailsToUserFriends(post.id , req.user.first_name)
    res.send({ post });
}

async function getTimelinePosts(req, res) {
    const { user } = req;


    let posts = await findTimelinePosts(user.id);

    res.send(posts)
}


async function updatePost(req, res) {
    let reqObj = req.body;
    const id = Number(req.params.id)
    let allowedKeys = ['group_id', 'title', 'content', 'assigned_group', 'status', 'feeling', 'media', 'love_count', 'comment_count', 'share_count', 'publish_date'];
    let requestKeys = Object.keys(reqObj);
    requestKeys.forEach(key => {
        if (!allowedKeys.includes(key)) {
            Reflect.deleteProperty(reqObj, key);
        }
    })
    let updateResp = await postService.update(reqObj, { where: { id } })
    if(updateResp[0] > 0){
        res.send({message: "Post Updated Successfully"})
    }else{
        res.send({message: "Post Update Error"})
    }
    
}



async function deletepost(req, res) {
    const { user } = req;
    const postId = req.params.postId;
    //  postService.getOneByID({where:{
    //     user_id:user.id,
    //     id:postId
    // }})
    deletePostByID(postId, user.id)
        .then(result => {

            if (result[0] === 0) {
                res.status(401).send({ message: "Post Not Found" })
            } else {
                res.send({ message: "Post Deleted Successfully" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })

}

async function getOnePostById(req, res) {
    let postId = req.params.postId;
    if (!postId) {
        res.status(401).send({ error: "Post id is missing" })
    }
    let post = await getPostById(postId);
    res.send(post);

}

async function checkEmailJobs(){

    

}
