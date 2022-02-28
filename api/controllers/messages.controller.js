/* Controller 1 */

const messageservice = require('../dal/messages.dao');
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
async function getmessageById(messageId) {
    const messageDb = await messageservice.getOneByID({ where: { id: messageId, deletedAt: null } });
    const messageRaw = await messageDb.get({ plain: true });

    return messageRaw;
}

async function findAllMessages(options) {
    const messageDb = await messageservice.findAnCountWhere(options);
    return messageDb;
}

function transformArrayToBracket(array) {
    let bracketString = "("
    array.forEach((element, index) => {
        index == 0 ? bracketString += element : bracketString += `,${element}`
    });
    bracketString += ")";
    return bracketString;
}

async function findTimelinemessages(userId, req) {

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
    let messages = await messageservice.findWhere({
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
        ...req.pagination

    })
   

    return messages;
}

async function deletemessageByID(messageId, userId) {
    let deletedAt = new Date();
    let messageDb ; 
    if (user.role == 'content-manager' || user.role == 'system-administrator') {
        messageDb = await messageservice.update({ deletedAt }, { where: { id: messageId } });
    }else{
        messageDb = await messageservice.update({ deletedAt }, { where: { id: messageId, user_id: userId } });
    }
    
    return messageDb;
}





//Req Processor functions

async function createMessage(req, res) {

    const reqObject = req.body;

    let RequiredKeys = ["sent_by","recieved_by","text" ,"type"];

    for (e of RequiredKeys) {
        if (!reqObject.hasOwnProperty(e)) {
            return res
                .status(400)
                .send({ ...reqObject, message: "Some Required Fields Are Missing." });
        }
    }

    

    let allowedKeys = ["sent_by","recieved_by","text" ,"type" , "html" , "media_id"];

    for (const property in reqObject) {
        if (!allowedKeys.includes(property)) {
            delete reqObject[property];
        }
        
    }

    reqObject.status = 'sent';


    console.log(reqObject);
    const message = await insertmessage(reqObject);
    res.send({ message });
}

async function getTimelinemessages(req, res) {
    const { user } = req;


    let messages = await findTimelinemessages(user.id, req);

    res.send(messages)
}


async function updatemessage(req, res) {
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



async function deletemessage(req, res) {
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
