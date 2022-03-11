/* Controller 1 */

const postService = require('../dal/user_posts.dao');
const userService = require('../dal/users.dao');
const commentService = require('../dal/comments.dao');
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
    updatePost,
    givelove
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

async function getPostCommentsById(postId) {

    const postComments = await commentService.findWhere({ where: { post_id: postId, parent_id: null, deleted_at: null }, raw: true });

    return postComments;
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

async function findTimelinePosts(userId, req) {

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
                { [Op.and]: [{ assigned_group: null }, { user_id: { [Op.in]: userFriends } }] },
                {
                    assigned_group: ['candidate',
                        'facilitator',
                        'content-manager',
                        'support',
                        'reviewer',
                        'system-administrator',
                        'auditor']
                }
            ],
            deletedAt: null,
            status: 'published',


        },
        order: [
            ['id', 'DESC'],
            ['publish_date', 'DESC']
        ],
        raw:true,
        ...req.pagination

    })

    for (post of posts){
        let comments = await commentService.findAndCount({ where: { post_id: post.id, parent_id: null, deleted_at: null }, raw: true })
        post.comment_count = comments.count;
    }
   

    return posts;
}

async function deletePostByID(postId, userId) {
    let deletedAt = new Date();
    let postDb ; 
    if (user.role == 'content-manager' || user.role == 'system-administrator') {
        postDb = await postService.update({ deletedAt }, { where: { id: postId } });
    }else{
        postDb = await postService.update({ deletedAt }, { where: { id: postId, user_id: userId } });
    }
    
    return postDb;
}





//Req Processor functions

async function createOnePost(req, res) {

    const requestObject = req.body;


    requestObject.user_id = req.user.id;


    console.log(requestObject);
    const post = await insertPost(requestObject);
    helpers.emitPostIdToUsers(post.id, "user")
    helpers.sendEmailsToUserFriends(post.id, req.user.first_name)
    res.send({ post });
}

async function getTimelinePosts(req, res) {
    const { user } = req;


    let posts = await findTimelinePosts(user.id, req);

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
    if (updateResp[0] > 0) {
        res.send({ message: "Post Updated Successfully" })
    } else {
        res.send({ message: "Post Update Error" })
    }

}



async function deletepost(req, res) {
    const { user } = req;
    const postId = req.params.postId;
    //  postService.getOneByID({where:{
    //     user_id:user.id,
    //     id:postId
    // }})
    deletePostByID(postId, user)
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

async function checkEmailJobs() {



}

async function givelove(req, res) {
    const id = req.params.id;
    let { user } = req;
    let post = await getPostById(id);
    let post_loved_by = "";
    var love_count = post.love_count;
    console.log(post);
    if (post.loved_by === null) {
        post_loved_by = [user.id]
        post_loved_by = JSON.stringify(post_loved_by)
        love_count++;
    } else {
        let prev_loves = JSON.parse(post.loved_by);
        if (prev_loves.includes(user.id)) {
            var index = prev_loves.indexOf(user.id);
            if (index !== -1) {
                prev_loves.splice(index, 1);
            }
            love_count--;
        } else {
            prev_loves.push(user.id);
            love_count++;
        }
        post_loved_by = JSON.stringify(prev_loves)
    }

    let updateResp = await postService.update({love_count , loved_by:post_loved_by}, { where: { id } })
    if(updateResp[0] == 1){
        res.send({love_count})
    }else{
        res.status(400).send({message:"an error occured" , updateResp})
    }
    
}
