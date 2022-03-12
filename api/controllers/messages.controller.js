/* Controller 1 */

const messageservice = require('../dal/messages.dao');
const userService = require('../dal/users.dao');
const socketService = require('../dal/socket-ids.dao');
const notiService = require('../dal/user_notifications.dao')
const model = require('../models');
const { QueryTypes } = require('sequelize');
const friendCtrl = require('./friends.controller')
const responseMessages = require('../helpers/response-messages');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const dayJs = require('dayjs')
const helpers = require('./helperFunctions')

module.exports = {
    createMessage,
    getUserMessages,
    deleteMessage,
    getUserChats
};

//Task Processor functions
async function insertMessage(msg) {
    const message = { ...msg };
    const msgDb = await messageservice.add(message);
    const msgRaw = await msgDb.get({ plain: true });

    return msgRaw;
}

async function deleteMessageByID(msgId, user) {
    let deleted_at = new Date();
    let commDb = await messageservice.update({ deleted_at }, { where: { id: msgId, sent_by: user.id } });

    return commDb;
}




async function notifyUserofMessage(user, recv_id, msg_id) {
    let userSockets = await socketService.findWhere({ where: { user_id: recv_id } });
    let userNotification = await notiService.add({
        user_id: recv_id,
        text: `You have unread messages from ${user.first_name} ${user.last_name}`,
        message_id: msg_id,
        status: "pending"
    })

    //emitting to clients if user is logged in
    if (userSockets.length > 0) {
        const socket = require('../helpers/socket.io').getIO();
        let { id, first_name, last_name } = user
        let userSend = { id, first_name, last_name }
        for (usSocket of userSockets) {
            socket.to(usSocket.socket_id).emit('message', { msg_id, userSend });
        }

    }



}





//Req Processor functions

async function createMessage(req, res) {

    const reqObject = req.body;
    const { user } = req;
    let RequiredKeys = ["recieved_by", "text", "type"];

    for (e of RequiredKeys) {
        if (!reqObject.hasOwnProperty(e)) {
            return res
                .status(400)
                .send({ ...reqObject, message: "Some Required Fields Are Missing." });
        }
    }



    let allowedKeys = ["recieved_by", "text", "type", "html", "media_id"];

    for (const property in reqObject) {
        if (!allowedKeys.includes(property)) {
            delete reqObject[property];
        }

    }

    reqObject.status = 'sent';
    reqObject.sent_by = user.id


    console.log(reqObject);
    const message = await insertMessage(reqObject);
    notifyUserofMessage(user, reqObject.recieved_by, message.id);
    res.send({ message });
}




async function getUserMessages(req, res) {
    const { user } = req;
    const userId = Number(req.params.userId)
    
    if(isNaN(userId)){
        return res.status(400).send({ message: 'Invalid user'})
    }

    let messages = await model.sequelize.query(`select sent_by,recieved_by,text,created_at,html,media_id,status,type from messages m where (m.sent_by = ${user.id} AND m.recieved_by = ${userId}) OR (m.sent_by = ${userId} AND m.recieved_by = ${user.id}) ORDER BY created_at ASC;`, { type: QueryTypes.SELECT, raw: true })

    res.send(messages)

}


async function getUserChats(req, res) {
    const { user } = req;
    let chats = await model.sequelize.query(`select * from (SELECT sent_by as user_id,u1.first_name,messages.created_at as created_at FROM messages LEFT JOIN users u1 ON u1.id = messages.sent_by  WHERE recieved_by = ${user.id}  group by sent_by
        UNION
        SELECT recieved_by as user_id,u1.first_name,messages.created_at as created_at FROM messages LEFT JOIN users u1 ON u1.id = messages.recieved_by  WHERE sent_by = ${user.id}  group by recieved_by) as msg order by created_at ASC;`, { type: QueryTypes.SELECT, raw: true })

    res.send(chats)

}



async function deleteMessage(req, res) {
    const { user } = req;
    const messageId = req.params.msgId;

    deleteMessageByID(messageId, user)
        .then(result => {

            if (result[0] === 0) {
                res.status(401).send({ message: "Message Not Found" })
            } else {
                res.send({ message: "Message Deleted Successfully" })
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ error: err })
        })

}

async function getOnemessageById(req, res) {
    let messageId = req.params.messageId;
    if (!messageId) {
        res.status(401).send({ error: "message id is missing" })
    }
    let message = await getmessageById(messageId);
    res.send(message);

}

async function checkEmailJobs() {



}

async function givelove(req, res) {
    const id = req.params.id;
    let { user } = req;
    let message = await getmessageById(id);
    let message_loved_by = "";
    var love_count = message.love_count;
    console.log(message);
    if (message.loved_by === null) {
        message_loved_by = [user.id]
        message_loved_by = JSON.stringify(message_loved_by)
        love_count++;
    } else {
        let prev_loves = JSON.parse(message.loved_by);
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
        message_loved_by = JSON.stringify(prev_loves)
    }

    let updateResp = await messageservice.update({ love_count, loved_by: message_loved_by }, { where: { id } })
    if (updateResp[0] == 1) {
        res.send({ love_count })
    } else {
        res.status(400).send({ message: "an error occured", updateResp })
    }

}
