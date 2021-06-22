/* Controller 1 */

const friendService = require('../dal/friends.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');
const userService = require('../dal/users.dao')
const { sendEmail } = require('../helpers/mail.helper')
const responseMessages = require('../helpers/response-messages');


module.exports = {
    addFriend,
    getFriends,
    approveFriend,
    getUserFriendsById,
    deleteFriendRequest,
    getFriendRequests,
    getSentRequests
};
async function insertFriend(friendId, userId) {

    const friend = { user1: userId, user2: friendId, status: 'sent' };
    const friendDb = await friendService.add(friend);
    //const postRaw = await postDb.get({ plain: true });

    return friendDb;
}

async function updateFriend(data, options) {

    const friend = { ...options };
    const friendDb = await friendService.update(data, friend);
    //const postRaw = await postDb.get({ plain: true });

    return friendDb;
}


async function getUserFriendsById(userId) {
    //gets friends where request initiated by user
    let userAddedFriends = `SELECT user2 as friend from friends WHERE user1=${userId} AND status='accepted' `;

    //gets friends where request initiated by others
    let userAddedByFriends = `SELECT user1 as friend from friends WHERE user2=${userId} AND status='accepted' `;


    //finally preapred query that prepares dataset for user's friends
    let friendsQuery = userAddedFriends + " UNION " + userAddedByFriends;

    const friends = await model.sequelize.query(friendsQuery, { type: QueryTypes.SELECT });
    let friendsArray = [];
    friends.forEach(friend => {
        friendsArray.push(friend.friend)
    })

    return friendsArray;
}

async function checkFriendStatus(userId, friendId) {
    //gets friends where request initiated by user
    let userAddedFriends = `SELECT * from friends WHERE user1=${userId} AND user2=${friendId} AND status <> 'deleted' `;

    //gets friends where request initiated by others
    let userAddedByFriends = `SELECT * from friends WHERE user2=${userId} AND user1=${friendId} AND status <>'deleted' `;


    //finally preapred query that prepares dataset for user's friends
    let friendsQuery = userAddedFriends + " UNION " + userAddedByFriends;

    const friends = await model.sequelize.query(friendsQuery, { type: QueryTypes.SELECT });


    return friends;
}






async function addFriend(req, res) {
    const { user } = req;
    let userId = user.id;
    const friendId = req.body.userId;
    if (userId === friendId) {
        return res.status(401).send({ message: "Bad Request" });
    }
    let resp = await checkFriendStatus(userId, friendId)

    if (resp.length > 0) {
        if (resp[0].status == 'sent' && resp[0].user1 === userId) {
            return res.status(401).send({ message: "You have already sent request to this user" })
        } else if (resp[0].status == 'sent' && resp[0].user2 === userId) {
            return res.status(401).send({ message: "You have a pending request from this user this user" })
        } else if (resp[0].status == 'accepted') {
            return res.status(401).send({ message: "You are already friends with this user" })
        }
    }

    insertFriend(friendId, userId)
        .then(async result => {
            res.send({ message: "Request sent successfully" });
            let userEmail = await userService.findOne({
                where: { id: friendId },
                attributes: ['email' , 'first_name'], 
                raw: true
            });
            let userName = user.first_name + " " + user.last_name
            console.log("user mail ", userEmail ," the user is " , userName);
            sendEmail(
                userEmail.email,
                "New Friend Request",
                ` <p>Hi , <strong>${userEmail.first_name}</strong> , You have a new Friend Request for your CFG Family from <strong>${userName}</strong>.<br>Open the CFG app now to approve or delete the request.</p>`
            )
        })
        .catch(err => {
            res.send({ message: "an error occurred", error: err });
        })


}


async function approveFriend(req, res) {
    const { user } = req;
    let userId = user.id;
    const friendId = req.body.userId;
    if (userId === friendId) {
        return res.status(401).send({ message: "Bad Request" });
    }
    updateFriend({ status: 'accepted' }, { where: { user1: friendId, user2: userId } })
        .then((result) => {
            if (result[0] == 0) {
                res.send({ message: "No request found" });
            } else {
                res.send({ message: "request approved successfully" });
            }

        })
        .catch((err) => {
            res.send({ message: "an error occurred", error: err });
        })


}

async function deleteFriendRequest(req, res) {
    const { user } = req;
    let userId = user.id;
    const friendId = req.body.userId;
    if (userId === friendId) {
        return res.status(401).send({ message: "Bad Request" });
    }
    // let resp = await friendService.findWhere({where:{user1:friendId , user2:userId}})
    // res.send(resp)
    updateFriend({ status: 'deleted' }, { where: { user1: friendId, user2: userId } })
        .then((result) => {
            if (result[0] == 0) {
                res.send({ message: "No request found" });
            } else {
                res.send({ message: "request deleted successfully" });
            }

        })
        .catch((err) => {
            res.send({ message: "an error occurred", error: err });
        })


}

async function getFriends(req, res) {
    const { user } = req;
    let friends = await getUserFriendsById(user.id);
    res.send(friends)
}

async function getFriendRequests(req, res) {
    const { user } = req;
    let requests = await friendService.findWhere({
        where:
        {
            user2: user.id,
            status: 'sent'
        },
        attributes: [['user1', 'userId']]

    })
    res.send(requests)
}

async function getSentRequests(req, res) {
    const { user } = req;
    let requests = await friendService.findWhere({
        where:
        {
            user1: user.id,
            status: 'sent'
        },
        attributes: [['user2', 'userId']]

    })
    res.send(requests)
}

