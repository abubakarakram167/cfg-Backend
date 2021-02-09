/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const GroupCtrl = require('../controllers/groups.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', GroupCtrl.createOneGroup);
        router.get('/list', GroupCtrl.getListGroupMultiple);
        router.get('/:id', GroupCtrl.getOneGroupByID);
        router.delete('/:id', GroupCtrl.deleteGroup);
        
      