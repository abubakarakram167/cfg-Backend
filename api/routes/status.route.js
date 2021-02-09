/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const StatusCtrl = require('../controllers/status.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', StatusCtrl.createOneStatus);
        router.get('/list', StatusCtrl.getListStatusMultiple);
        router.get('/:id', StatusCtrl.getOneStatusByID);
        router.delete('/:id', StatusCtrl.deleteStatus);
        
      