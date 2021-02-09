/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const UserGroupCtrl = require('../controllers/user_groups.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', UserGroupCtrl.createOneUserGroup);
        router.get('/list', UserGroupCtrl.getListUserGroupMultiple);
        router.get('/:id', UserGroupCtrl.getOneUserGroupByID);
        router.delete('/:id', UserGroupCtrl.deleteUserGroup);
        
      