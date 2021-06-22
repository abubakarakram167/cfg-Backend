
const userService = require('../dal/users.dao');
const groupService = require('../dal/groups.dao');
const userGroupService = require('../dal/user_groups.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');
const responseMessages = require('../helpers/response-messages');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const dayJs = require('dayjs')
const helpers = require('./helperFunctions')

module.exports = {
    createGroup,
    getGroupsList,
    updateGroup,
    assignGroupToUser
};

//Task Processor functions
async function insertGroup(postData) {
    const post = { ...postData };
    const postDb = await postService.add(post);
    const postRaw = await postDb.get({ plain: true });

    return postRaw;
}
async function getGroupById(postId) {
    const postDb = await postService.getOneByID({ where: { id: postId, deletedAt: null } });
    const postRaw = await postDb.get({ plain: true });

    return postRaw;
}

async function findAllGroups(options) {
    options.where.type = "private"
    const postDb = await postService.findAnCountWhere(options);
    return postDb;
}


async function createGroup(req,res){
    const reqBody = req.body
    const {user} = req

    if(reqBody.name === undefined){
        return res.status(422).send({message:"Some required fields are missing"})
    }
    reqBody.created_by = user.id;
    let group = await groupService.add(reqBody);
    res.send(group)

}

async function getGroupsList(req, res){
   
    var options = {where:{}}
    req.params.type === undefined ?  null : options.where.type = req.params.type 
    req.params.searchString === undefined ?  null : options.where.name = {[Op.like]: `%${req.params.searchString}%`} 
    let groups = await groupService.findWhere(options)
    
    res.send(groups)
}

 async function updateGroup(req, res){
    let reqBody = await req.body;
    if(reqBody.id === undefined || (reqBody.name === undefined && reqBody.type === undefined) ){
        return res.status(422).send({message:"Some required fields are missing"})
    }
    let {id} = reqBody
    delete reqBody.id
    let group = await groupService.update(reqBody , {where: {id}})
    if(group[0] === 1){
        res.send({message:"group updated successfully"})
    }else{
        res.send({message:"There was a problem updating group"})
    }
    
 }

 async function assignGroupToUser(req,res){
     let reqBody = req.body;
     if(reqBody.user_id === undefined || reqBody.group_id === undefined  ){
        return res.status(422).send({message:"Some required fields are missing"})
    }
    let {user_id, group_id} = reqBody;
    let user_group = await userGroupService.getOneByID({where:{user_id}});
    var resp;
    if(user_group === null){
        resp = await userGroupService.add({user_id , group_id})
        resp = resp.get({plain:true})
    }else{
        resp = await userGroupService.update({group_id} , {where:{user_id}, raw:true})
        if(resp[0] === 1 ){
            resp = {message:"group updated successfully"}
        }else{
            resp = {message:"there was a problem updating group"}
        }
    }
    
    res.send(resp)

 }