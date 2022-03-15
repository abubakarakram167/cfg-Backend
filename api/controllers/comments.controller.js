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

    // const postComments = await commentService.findWhere({ where: { post_id: postId, parent_id: null, deleted_at: null }, raw: true });

    let commentsQuery = `SELECT c.*,u.first_name , u.last_name , u.photo_url from comments c JOIN users u on u.id = c.created_by  WHERE post_id=${postId} AND isNull(parent_id) AND isNull(c.deleted_at)`;
    
    const postComments = await model.sequelize.query(commentsQuery, { type: QueryTypes.SELECT });

    return postComments;
}

async function getCommentReplies(commentId) {

    // const commentReplies = await commentService.findWhere({ where: { parent_id: commentId, deleted_at: null } });

    let commentsQuery = `SELECT c.*,u.first_name , u.last_name , u.photo_url from comments c JOIN users u on u.id = c.created_by  WHERE parent_id=${commentId} AND isNull(c.deleted_at)`;
    
    const commentReplies = await model.sequelize.query(commentsQuery, { type: QueryTypes.SELECT });

    return commentReplies;
}

async function deleteCommentByID(commId, user) {
    let deleted_at = new Date();
    let commDb;
    if (user.role == 'content-manager' || user.role == 'system-administrator') {
        commDb = await commentService.update({ deleted_at }, { where: { id: commId } });
    } else {
        commDb = await commentService.update({ deleted_at }, { where: { id: commId, created_by: user.id } });
    }

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
        //console.log(commentReplies);
        comment.replies = commentReplies;
        comment.length = commentReplies.length;
    }
    let comLength = comments.length
    res.send({comments , count : comLength});

}


async function deleteComment(req, res) {
    const { user } = req;
    let commId = req.params.commId;


    deleteCommentByID(commId, user)
        .then(result => {

            if (result[0] === 0) {
                res.status(401).send({ message: "Comment Not Found" })
            } else {
                res.send({ message: "Comment Deleted Successfully" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })

}


