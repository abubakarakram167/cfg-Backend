/* Controller 1 */

const user_groupService = require('../dal/user_groups.dao');
module.exports = {
          createOneUserGroup,
          getOneUserGroupByID,
          getListUserGroupMultiple,
          deleteUserGroup,
      
      };
      async function insertUserGroup(user_groupData) {
        const user_group = { ...user_groupData };
        const user_groupDb = await user_groupService.add(user_group);
        const user_groupRaw = await user_groupDb.get({ plain: true });
    
        return user_groupRaw;
    }
    async function getByIDUserGroup(user_groupData) {
        const user_group = { ...user_groupData };
        const user_groupDb = await user_groupService.getOneByID(user_group);
        const user_groupRaw = await user_groupDb.get({ plain: true });
    
        return user_groupRaw;
    }
    
    async function findAllUserGroup() {
        const user_groupDb = await user_groupService.getList();
        return user_groupDb;
    }
    
    async function deleteByIDUserGroup(user_groupData) {
        const user_group = { ...user_groupData };
        const user_groupDb = await user_groupService.deleteOne(user_group);
        return user_groupDb;
    }
    async function createOneUserGroup(req, res) {
        const user_group = await insertUserGroup(req.body);
        res.send(user_group);
    }
    
    async function getOneUserGroupByID(req, res) {
        const user_group = await getByIDUserGroup(req.params.id);
        res.send(user_group);
    }
    
    async function getListUserGroupMultiple(_req, res) {
        const user_group = await findAllUserGroup();
        res.send(user_group);
    }
    
    async function deleteUserGroup(req, res) {
        const user_group = await deleteByIDUserGroup(req);
        res.send(user_group);
    }
    
      