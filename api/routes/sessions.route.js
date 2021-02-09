/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const SessionCtrl = require('../controllers/sessions.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', SessionCtrl.createOneSession);
        router.get('/list', SessionCtrl.getListSessionMultiple);
        router.get('/:id', SessionCtrl.getOneSessionByID);
        router.delete('/:id', SessionCtrl.deleteSession);
        
      