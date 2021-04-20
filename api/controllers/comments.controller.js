/* Controller 1 */

const commentService = require('../dal/comments.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');

const responseMessages = require('../helpers/response-messages');


module.exports = {
    addComment,
    getPostComments,
    deleteComment
};
async function insertComment(comment) {

    const commentDb = await commentService.add(comment);
    const commentRaw = await commentDb.get({ plain: true });

    return commentRaw;
}

async function updateFriend(data, options) {

    const friend = { ...options };
    const friendDb = await commentService.update(data, friend);
    //const postRaw = await postDb.get({ plain: true });

    return friendDb;
}


async function getPostCommentsById(postId) {

    const postComments = await commentService.findWhere({ where: { post_id: postId, parent_id: null , deleted_at:null }, raw: true });

    return postComments;
}

async function getCommentReplies(commentId) {

    const commentReplies = await commentService.findWhere({ where: { parent_id: commentId, deleted_at:null } });

    return commentReplies;
}

async function deleteCommentByID(commId , userId) {
    let deleted_at =  new Date();
     const commDb = await commentService.update({deleted_at} , {where:{id:commId , created_by:userId}} );
    //const commDb =  await commentService.findWhere({where:{id:commId , created_by:userId}})
    console.log("logger" ,commDb);
    return commDb;
}






async function addComment(req, res) {
    const { user } = req;
    let userId = user.id;
    let reqObj = req.body;
    if (!reqObj.post_id || !reqObj.content) {
        return res.status(401).send({ message: "Some required fields are missing" })
    }
    reqObj.created_by = userId;

    insertComment(reqObj)
        .then(result => {
            res.send({ message: "Comment added successfully" });
        })
        .catch(err => {
            res.send({ message: "an error occurred", error: err });
        })


}


async function getPostComments(req, res) {
    const { user } = req;
    let userId = user.id;
    let postId = req.params.postId;


    let comments = await getPostCommentsById(postId)



    for (let comment of comments) {
        // eslint-disable-next-line no-await-in-loop
        let commentReplies = await getCommentReplies(comment.id);
        console.log(commentReplies);
        comment.replies = commentReplies;
    }

    res.send(comments);



}


async function deleteComment(req, res) {
    const { user } = req;
    let commId = req.params.commId;
    let userId = user.id;

    deleteCommentByID(commId,userId)
    .then(result => {
        
        if(result[0] === 0){
            res.status(401).send({message:"Comment Not Found"})
        }else{
            res.send({message:"Comment Deleted Successfully"})
        }
    })
    .catch(err => {
        res.send({error:err})
    })

}


