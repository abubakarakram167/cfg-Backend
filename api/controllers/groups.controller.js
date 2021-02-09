/* Controller 1 */

const groupService = require('../dal/groups.dao');
module.exports = {
          createOneGroup,
          getOneGroupByID,
          getListGroupMultiple,
          deleteGroup,
      
      };
      async function insertGroup(groupData) {
        const group = { ...groupData };
        const groupDb = await groupService.add(group);
        const groupRaw = await groupDb.get({ plain: true });
    
        return groupRaw;
    }
    async function getByIDGroup(groupData) {
        const group = { ...groupData };
        const groupDb = await groupService.getOneByID(group);
        const groupRaw = await groupDb.get({ plain: true });
    
        return groupRaw;
    }
    
    async function findAllGroup() {
        const groupDb = await groupService.getList();
        return groupDb;
    }
    
    async function deleteByIDGroup(groupData) {
        const group = { ...groupData };
        const groupDb = await groupService.deleteOne(group);
        return groupDb;
    }
    async function createOneGroup(req, res) {
        const group = await insertGroup(req.body);
        res.send(group);
    }
    
    async function getOneGroupByID(req, res) {
        const group = await getByIDGroup(req.params.id);
        res.send(group);
    }
    
    async function getListGroupMultiple(_req, res) {
        const group = await findAllGroup();
        res.send(group);
    }
    
    async function deleteGroup(req, res) {
        const group = await deleteByIDGroup(req);
        res.send(group);
    }
    
      