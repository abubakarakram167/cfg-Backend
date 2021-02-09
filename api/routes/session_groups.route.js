/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const SessionGroupCtrl = require('../controllers/session_groups.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', SessionGroupCtrl.createOneSessionGroup);
        router.get('/list', SessionGroupCtrl.getListSessionGroupMultiple);
        router.get('/:id', SessionGroupCtrl.getOneSessionGroupByID);
        router.delete('/:id', SessionGroupCtrl.deleteSessionGroup);
        
      