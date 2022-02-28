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


async function notifyUserofMessage(user , recv_id){
    let userSockets = await socketService.findWhere({where:{user_id:recv_id}});
    if(userSockets.length < 1){
        let userNotification = notiService.add({user:id})
    }else{

    }
}





//Req Processor functions

async function createMessage(req, res) {

    const reqObject = req.body;
    const { user} = req;
    let RequiredKeys = ["recieved_by","text" ,"type"];

    for (e of RequiredKeys) {
        if (!reqObject.hasOwnProperty(e)) {
            return res
                .status(400)
                .send({ ...reqObject, message: "Some Required Fields Are Missing." });
        }
    }

    

    let allowedKeys = ["recieved_by","text" ,"type" , "html" , "media_id"];

    for (const property in reqObject) {
        if (!allowedKeys.includes(property)) {
            delete reqObject[property];
        }
        
    }

    reqObject.status = 'sent';
    reqObject.sent_by = user.id


    console.log(reqObject);
    const message = await insertMessage(reqObject);
    res.send({ message });
}

async function getUserMessages(req, res) {
    const { user } = req;


    let messages = await findTimelinemessages(user.id, req);

    res.send(messages)
}


async function deleteMessage(req, res) {
    let reqObj = req.body;
    const id = Number(req.params.id)
    let allowedKeys = ['group_id', 'title', 'content', 'assigned_group', 'status', 'feeling', 'media', 'love_count', 'comment_count', 'share_count', 'publish_date'];
    let requestKeys = Object.keys(reqObj);
    requestKeys.forEach(key => {
        if (!allowedKeys.includes(key)) {
            Reflect.deleteProperty(reqObj, key);
        }
    })
    let updateResp = await messageservice.update(reqObj, { where: { id } })
    if (updateResp[0] > 0) {
        res.send({ message: "message Updated Successfully" })
    } else {
        res.send({ message: "message Update Error" })
    }

}



async function getUserChats(req, res) {
    const { user } = req;
    const messageId = req.params.messageId;
    //  messageservice.getOneByID({where:{
    //     user_id:user.id,
    //     id:messageId
    // }})
    deletemessageByID(messageId, user)
        .then(result => {

            if (result[0] === 0) {
                res.status(401).send({ message: "message Not Found" })
            } else {
                res.send({ message: "message Deleted Successfully" })
            }
        })
        .catch(err => {
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

    let updateResp = await messageservice.update({love_count , loved_by:message_loved_by}, { where: { id } })
    if(updateResp[0] == 1){
        res.send({love_count})
    }else{
        res.status(400).send({message:"an error occured" , updateResp})
    }
    
}
