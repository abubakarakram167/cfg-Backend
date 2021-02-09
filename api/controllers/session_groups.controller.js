/* Controller 1 */

const session_groupService = require('../dal/session_groups.dao');
module.exports = {
          createOneSessionGroup,
          getOneSessionGroupByID,
          getListSessionGroupMultiple,
          deleteSessionGroup,
      
      };
      async function insertSessionGroup(session_groupData) {
        const session_group = { ...session_groupData };
        const session_groupDb = await session_groupService.add(session_group);
        const session_groupRaw = await session_groupDb.get({ plain: true });
    
        return session_groupRaw;
    }
    async function getByIDSessionGroup(session_groupData) {
        const session_group = { ...session_groupData };
        const session_groupDb = await session_groupService.getOneByID(session_group);
        const session_groupRaw = await session_groupDb.get({ plain: true });
    
        return session_groupRaw;
    }
    
    async function findAllSessionGroup() {
        const session_groupDb = await session_groupService.getList();
        return session_groupDb;
    }
    
    async function deleteByIDSessionGroup(session_groupData) {
        const session_group = { ...session_groupData };
        const session_groupDb = await session_groupService.deleteOne(session_group);
        return session_groupDb;
    }
    async function createOneSessionGroup(req, res) {
        const session_group = await insertSessionGroup(req.body);
        res.send(session_group);
    }
    
    async function getOneSessionGroupByID(req, res) {
        const session_group = await getByIDSessionGroup(req.params.id);
        res.send(session_group);
    }
    
    async function getListSessionGroupMultiple(_req, res) {
        const session_group = await findAllSessionGroup();
        res.send(session_group);
    }
    
    async function deleteSessionGroup(req, res) {
        const session_group = await deleteByIDSessionGroup(req);
        res.send(session_group);
    }
    
      