const socketService = require('../dal/socket-ids.dao')
const userService = require('../dal/users.dao')
const postService = require('../dal/user_posts.dao')
const mailHelper = require('../helpers/mail.helper')
const friendService = require('../dal/friends.dao')
const friendCtrl = require('./friends.controller')
const model = require('../models');
const { sendPostEmails } = require('../helpers/mail.helper');
const { QueryTypes } = require('sequelize');

module.exports = {
    emitPostIdToUsers,
    sendEmailsToUserFriends
}

async function sendEmailsToUserFriends(postId , userName){
    let userDb = await postService.getOneByID({ where: { id: postId }, attributes: ['user_id'], raw: true })
    let user_id = userDb.user_id;
    let userFriends = await friendCtrl.getUserFriendsById(user_id);
    let friendsEmail = await userService.findWhere({
        where: { id: userFriends },
        attributes: ['first_name', 'email'],
        raw: true
    })
    sendPostEmails(friendsEmail,userName)
}

async function getPostSocketIdsByRole(postId) {

    console.log("post id is", postId);
    let assigned_group = await postService.getOneByID({ where: { id: postId }, attributes: ['assigned_group'], raw: true })
    console.log(assigned_group);
    let socketIds = await model.sequelize.query(`SELECT socket_ids.socket_id FROM socket_ids JOIN users ON users.id = socket_ids.user_id WHERE users.role = '${assigned_group.assigned_group}'`, { type: QueryTypes.SELECT, raw: true })
    return socketIds;

}

async function getPostSocketIdsByFriends(postId) {
    let userDb = await postService.getOneByID({ where: { id: postId }, attributes: ['user_id'], raw: true })
    let user_id = userDb.user_id;
    let userFriends = await friendCtrl.getUserFriendsById(user_id);
    let socketIds = await socketService.findWhere({
        where: {
            user_id: userFriends // Same as using `id: { [Op.in]: [1,2,3] }`
        },
        attributes: ['socket_id'],
        raw: true
    })
    return socketIds;
}

async function emitPostIdToUsers(postId, type) {
    let socketIds;

    if (type == "admin") {
        socketIds = await getPostSocketIdsByRole(postId);
    }

    if (type == "user") {
        socketIds = await getPostSocketIdsByFriends(postId);
    }

    const socket = require('../helpers/socket.io').getIO();

    for (sockets of socketIds) {
        socket.to(sockets.socket_id).emit('post', postId);
    }
   
    console.log("logging from helperfunc.emitPostIdToUsers socket-ids:",socketIds);
}