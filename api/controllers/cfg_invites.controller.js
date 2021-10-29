/* Controller 1 */

const inviteService = require("../dal/cfg_invites.dao");
const contentService = require("../dal/content.dao");
const userService = require('../dal/users.dao');
const model = require("../models");
const { sendEmail, sendWelcomeEmail } = require('../helpers/mail.helper');
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
var CryptoJS = require("crypto-js");

const responseMessages = require("../helpers/response-messages");

module.exports = {
  addInvite,
  getInvites,
  updateInvite,
  activateInvites
};
async function insertInvite(invite) {
  const inviteDb = await inviteService.add(invite);
  const inviteRaw = await inviteDb.get({ plain: true });

  return inviteRaw;
}

async function addInvite(req, res) {
  const { user } = req;
  let userId = user.id;
  let reqObj = req.body;
  let allowedKeys = ["user_id", "cfg_id", "detail"];

  for (const property in reqObj) {
    if (!allowedKeys.includes(property)) {
      delete reqObj[property];
    }
  }
  console.log(reqObj.cfg_id);
  let content = await contentService.getOneByID({
    where: { id: reqObj.cfg_id },
    raw: true,
  });

  //validation checks below

  //check if content type is mini cfg
  if (content.type != "mini") {
    res.status(401).send({ message: "Invalid request" });
  }
  //check if content facilitator is the one requesting to send the invite
  if (content.facilitator != userId) {
    res.status(401).send({ message: "Unauthorized to do this action" });
  }
  //check if invite already exists
  let invite = await inviteService.findWhere({
    where: { cfg_id: reqObj.cfg_id, user_id: reqObj.user_id },
    raw: true,
  });
  if (invite.length > 0) {
    return res
      .status(403)
      .send({ message: "An invite already exists for the given user." });
  }

  reqObj.created_by = userId;
  reqObj.status = "pending";
  reqObj.created_at = new Date();
  console.log("into add invite function", reqObj);
  insertInvite(reqObj)
    .then((invite) => {
      res.send({ invite, message: "invite added successfully" });
    })
    .catch((err) => {
      res.send({ err, message: "an error occurred", error: err });
    });
}

async function getInvites(req, res) {
  const { limit, offset } = req.pagination;
  const { cfg_id, user_id } = req.query;
  if (cfg_id === "" || cfg_id === undefined) {
    return res.status(403).send({ message: "Mini CFG id is required." });
  }

  const where = { cfg_id };
  if (user_id !== "" && user_id != undefined) {
    where["user_id"] = user_id;
  }

  const invites = await inviteService.findWhere({ where, offset, limit });

  res.send(invites);
}

async function updateInvite(req, res) {
  let reqObj = req.body;
  const { user } = req;
  let allowedKeys = ["status"];
  let allowedStatus = ["accepted", "rejected"];
  let inviteId = Number(req.params.id);
  console.log("invite id is", inviteId);

  for (const property in reqObj) {
    if (!allowedKeys.includes(property)) {
      delete reqObj[property];
    }
  }
  let invite = await inviteService.getOneByID({
    where: { id: inviteId },
    raw: true,
  });
  let content = await contentService.getOneByID({
    where: { id: invite.cfg_id },
    raw: true,
  });
  if(!allowedStatus.includes(reqObj.status)){
    return res
        .status(403)
        .send({ message: "Invalid Status." });
  }
  if (user.id != invite.user_id) {
    return res
      .status(403)
      .send({ message: "This invites does not belong to you." });
  }

  
  const inviteDb = await inviteService.update(reqObj, {
    where: {
      id: inviteId,
    },
  });
  res.send({ inviteDb, message: responseMessages.recordUpdateSuccess });

  return inviteDb;
}

async function deleteInvite(req, res) {
  const { user } = req;
  let inviteId = Number(req.params.id);
  let invite = await inviteService.getOneByID({
    where: { id: inviteId },
    raw: true,
  });
  let content = await contentService.getOneByID({
    where: { id: invite.cfg_id },
    raw: true,
  });
  if (user.id != content.facilitator) {
    return res
      .status(403)
      .send({ message: "You are not authorized to do that." });
  }
  await inviteService.deleteOne(inviteId);
  res.send({ message: "Record deleted successfully" });
}

async function activateInvites(cfg_id) {
    let invites = await inviteService.findWhere({
        where: { cfg_id: cfg_id , status:"pending"},
        raw: true,
    });
    let content = await contentService.getOneByID({
        where: { id: cfg_id },
        raw: true,
      });
    for(invite of invites)  {
        const inviteDb = await inviteService.update({status:"sent"}, {
            where: {
              id: invite.id,
            },
        });
        let user = await userService.findOne({where:{id:invite.user_id} , raw: true})
        let obj = {cfg_id, user_id:user.id , invite_id:invite.id}
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), `mini@cfg#983&${user.first_name}`).toString();
        sendEmail(
          user.email,
            "Invite for Mini CFG",
            `<h1>Hey ${user.first_name} ${user.last_name}! </h1><br><h2>You have been invited to Join the conversation " <strong>${content.title}</strong> "</h2><br>Click the link to view the invite <a href="https://mycfg.org/admin/mini/${ciphertext}">View Invite</a>`
          );
    }
}